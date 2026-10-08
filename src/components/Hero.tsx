import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const FRAME_COUNT = 240
const SCROLL_VH = 600      // scroll distance (in viewport heights) over which the sequence plays
const INITIAL = 30         // frames loaded before the loader hides
const FOCAL_X = 0.76      // portrait phones: horizontal focus on the villa (0 = left edge, 1 = right edge)
// The film shows its titles in the frames themselves (left side), which a portrait crop cuts off.
// On phones the same titles are real text, timed to the same frames: [fade-in start, full, full-end, fade-out end] (1-based frame numbers).
const BRAND_AT = [121, 130, 180, 187], FIND_AT = [[16, 22, 40, 47], [190, 196, 241, 242]]
const ramp = (n: number, [a, b, c, d]: number[]) => n <= a || n >= d ? 0 : n < b ? (n - a) / (b - a) : n <= c ? 1 : (d - n) / (d - c)
const KEEP = 40            // decoded bitmaps kept around the current frame
const src = (i: number) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

export default function Hero() {
  const wrap = useRef<HTMLElement>(null), canvas = useRef<HTMLCanvasElement>(null), brand = useRef<HTMLDivElement>(null), find = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false), [pct, setPct] = useState(0)

  useEffect(() => {
    const cv = canvas.current!, ctx = cv.getContext('2d', { alpha: false })!
    const imgs: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)
    const bmps = new Map<number, ImageBitmap>()
    const pending = new Set<number>()
    let cur = 0, target = 0, drawn = -1, raf = 0, w = 0, h = 0, dead = false

    const nearest = (i: number) => {          // closest available frame, so playback never blanks
      for (let d = 0; d < FRAME_COUNT; d++) {
        for (const j of [i - d, i + d]) if (j >= 0 && j < FRAME_COUNT && (bmps.has(j) || imgs[j])) return j
      }
      return -1
    }
    const draw = (i: number) => {
      const j = nearest(i); if (j < 0) return
      const src = bmps.get(j) ?? imgs[j]!
      const iw = 'naturalWidth' in src ? src.naturalWidth : src.width
      const ih = 'naturalHeight' in src ? src.naturalHeight : src.height
      ctx.fillStyle = '#151515'; ctx.fillRect(0, 0, cv.width, cv.height)
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
      if (cv.clientWidth <= 768 && cv.clientHeight > cv.clientWidth) {
        // Portrait phones: fill the whole screen (cover) and keep the villa in view. The crop is never stretched.
        const s = Math.max(cv.width / iw, cv.height / ih)
        const sw = cv.width / s, sh = cv.height / s
        const sx = Math.min(iw - sw, Math.max(0, iw * FOCAL_X - sw / 2)), sy = (ih - sh) / 2
        ctx.drawImage(src, sx, sy, sw, sh, 0, 0, cv.width, cv.height)
      } else {
        const s = Math.min(cv.width / iw, cv.height / ih)           // contain: never crop
        const dw = iw * s, dh = ih * s
        ctx.drawImage(src, (cv.width - dw) / 2, (cv.height - dh) / 2, dw, dh)
      }
      drawn = i
    }
    const manageBitmaps = (c: number) => {      // sliding window keeps memory flat
      for (let i = Math.max(0, c - 12); i <= Math.min(FRAME_COUNT - 1, c + KEEP); i++) {
        const im = imgs[i]
        if (!im || bmps.has(i) || pending.has(i)) continue
        pending.add(i)
        createImageBitmap(im).then(b => { pending.delete(i); if (dead || Math.abs(i - c) > KEEP + 20) b.close(); else bmps.set(i, b) }).catch(() => pending.delete(i))
      }
      bmps.forEach((b, i) => { if (i < c - KEEP || i > c + KEEP + 20) { b.close(); bmps.delete(i) } })
    }
    const readTarget = () => {
      const r = wrap.current!.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      target = p * (FRAME_COUNT - 1)
    }
    const overlays = () => {
      const n = cur + 1
      if (brand.current) brand.current.style.opacity = String(ramp(n, BRAND_AT))
      if (find.current) find.current.style.opacity = String(Math.max(...FIND_AT.map(r => ramp(n, r))))
    }
    const tick = () => {
      raf = 0
      cur = reduce ? target : cur + (target - cur) * 0.2
      if (Math.abs(target - cur) < 0.02) cur = target
      overlays()
      const f = Math.round(cur)
      if (f !== drawn) { draw(f); manageBitmaps(f) }
      if (cur !== target) raf = requestAnimationFrame(tick)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const onScroll = () => { readTarget(); kick() }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const box = cv.getBoundingClientRect()
      w = box.width; h = box.height
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
      drawn = -1; kick()
    }

    // Loading: first INITIAL frames gate the loader, the rest stream in the background.
    let loaded = 0
    const load = (i: number) => new Promise<void>(res => {
      const im = new Image(); im.decoding = 'async'
      im.onload = () => { imgs[i] = im; loaded++; if (loaded <= INITIAL) setPct(Math.round(loaded / INITIAL * 100)); res() }
      im.onerror = () => res()
      im.src = src(i)
    })
    ;(async () => {
      await Promise.all(Array.from({ length: INITIAL }, (_, i) => load(i)))
      if (dead) return
      resize(); readTarget(); cur = target; overlays(); draw(Math.round(cur)); manageBitmaps(Math.round(cur)); setReady(true)
      let next = INITIAL
      const worker = async () => { while (!dead && next < FRAME_COUNT) await load(next++) }
      await Promise.all(Array.from({ length: 6 }, worker))
    })()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      dead = true; cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize)
      bmps.forEach(b => b.close()); bmps.clear()
    }
  }, [reduce])

  return (
    <section id="home" ref={wrap} aria-label=" Real Estate Agency introduction" className="relative bg-charcoal" style={{ height: `${SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden min-[769px]:pt-[72px]">
        <canvas ref={canvas} role="img" aria-label="Scroll-driven film of Mumbai luxury real estate" className="block h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-charcoal/60 to-transparent hidden max-[768px]:portrait:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-transparent hidden max-[768px]:portrait:block" />
        <div ref={brand} style={{ opacity: 0, top: 'max(15%, 5.5rem)' }} className="pointer-events-none absolute inset-x-[6%] hidden max-[768px]:portrait:block text-ivory [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          <p className="font-display text-[clamp(2.75rem,15vw,4.5rem)] font-medium leading-none tracking-[0.02em]"></p>
          <p className="mt-[0.9em] text-[clamp(1.05rem,5.4vw,1.75rem)] font-light leading-[1.15] tracking-[0.05em]">REAL ESTATE AGENCY</p>
          <p className="mt-[0.9em] text-[clamp(0.62rem,2.9vw,0.9rem)] leading-snug tracking-[0.06em]">MUMBAI’S LUXURY PROPERTY DESTINATION</p>
        </div>
        <div ref={find} style={{ opacity: 0 }} className="pointer-events-none absolute inset-x-[6%] bottom-[15%] hidden max-[768px]:portrait:block text-ivory">
          <h1 className="font-display text-[clamp(2.6rem,12.5vw,4rem)] font-medium leading-[1.02]">Find Your<br />Perfect Home</h1>
          <p className="mt-4 max-w-[26ch] text-[clamp(0.95rem,4vw,1.125rem)] leading-relaxed text-ivory/85">Exclusive properties, exceptional living, and a better tomorrow.</p>
        </div>
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal text-ivory" role="status">
            <p className="font-display text-xl tracking-[0.2em]"> Real Estate Agency</p>
            <div className="mt-6 h-px w-40 bg-ivory/20"><div className="h-px bg-gold transition-[width] duration-200" style={{ width: `${pct}%` }} /></div>
          </div>
        )}
      </div>
    </section>
  )
}
