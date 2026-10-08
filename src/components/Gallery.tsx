import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import { GALLERY } from '../lib/data'
const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2']
export default function Gallery() {
  const [i, setI] = useState<number | null>(null)
  const n = GALLERY.length
  const go = useCallback((d: number) => setI(v => v === null ? v : (v + d + n) % n), [n])
  useEffect(() => {
    if (i === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [i, go])
  return (
    <section id="gallery" className="py-24 lg:py-36 bg-[#ebe5d8]">
      <div className="wrap">
        <Reveal><h2 className="h2 max-w-3xl">A Glimpse Into Exceptional Living</h2></Reveal>
        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((g, k) => <button key={g.src} onClick={() => setI(k)} aria-label={`Open: ${g.alt}`} className={`group overflow-hidden ${spans[k]}`}>
            <Img src={g.src} alt={g.alt} className="transition-transform duration-1000 group-hover:scale-110" /></button>)}
        </div>
      </div>
      <AnimatePresence>{i !== null && (
        <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setI(null)}>
          <button className="absolute right-4 top-4 p-3 text-ivory" aria-label="Close" onClick={() => setI(null)}><X /></button>
          <button className="absolute left-2 p-3 text-ivory sm:left-6" aria-label="Previous" onClick={e => { e.stopPropagation(); go(-1) }}><ChevronLeft size={36} /></button>
          <button className="absolute right-2 p-3 text-ivory sm:right-6" aria-label="Next" onClick={e => { e.stopPropagation(); go(1) }}><ChevronRight size={36} /></button>
          <AnimatePresence mode="wait"><motion.figure key={i} className="max-h-[85vh] max-w-5xl" onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <img src={GALLERY[i].src.replace('w=1400', 'w=2000')} alt={GALLERY[i].alt} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-3 text-center text-sm text-ivory/70">{GALLERY[i].alt}</figcaption></motion.figure></AnimatePresence>
        </motion.div>)}</AnimatePresence>
    </section>
  )
}
