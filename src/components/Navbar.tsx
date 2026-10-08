import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { NAV } from '../lib/data'
import { useScrollProgress } from '../hooks/useScrollProgress'
export default function Navbar() {
  const [solid, setSolid] = useState(false), [open, setOpen] = useState(false), [active, setActive] = useState('home')
  const p = useScrollProgress()
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const ids = [...NAV.map(n => n[1]), 'contact']
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach(i => { const el = document.getElementById(i); el && io.observe(el) }); return () => io.disconnect()
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  const link = (id: string, l: string, cls = '') => (
    <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}
      className={`relative py-2 text-[13px] tracking-[0.16em] uppercase transition-colors hover:text-gold ${active === id ? 'text-gold' : ''} ${cls}`}>{l}</a>)
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? 'bg-charcoal/95 backdrop-blur-sm' : 'bg-transparent'} text-ivory`}>
      <div className="wrap flex h-[72px] items-center justify-between">
        <a href="#home" className="whitespace-nowrap font-display text-lg sm:text-xl font-semibold tracking-[0.14em] uppercase"> <span className="hidden sm:inline lg:hidden xl:inline text-gold">Real Estate Agency</span></a>
        <nav className="hidden lg:flex gap-9" aria-label="Primary">{NAV.map(([l, id]) => link(id, l))}</nav>
        <a href="#contact" className="btn btn-line hidden lg:inline-flex !min-h-[40px] !px-6">Contact Us</a>
        <button className="lg:hidden p-3 -mr-3" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-charcoal flex flex-col gap-2 px-6 pt-8" aria-label="Mobile">
        {[...NAV.map(([l, id]) => [l, id] as const), ['Contact Us', 'contact'] as const].map(([l, id]) => link(id, l, 'font-display !text-3xl !normal-case !tracking-normal py-3 border-b border-ivory/10'))}
      </nav>}
      <motion.div style={{ scaleX: p }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold" />
    </header>
  )
}
