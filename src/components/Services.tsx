import { Building2, Home, TrendingUp, Check } from 'lucide-react'
import Img from './Img'
import Reveal from './Reveal'
import { SERVICES } from '../lib/data'
const icons = [Home, Building2, TrendingUp]
export default function Services() {
  return (
    <section id="services" className="bg-charcoal py-24 text-ivory lg:py-36">
      <div className="wrap">
        <Reveal className="max-w-3xl"><h2 className="h2">Comprehensive Real Estate Solutions</h2>
          <p className="mt-6 text-lg text-ivory/70">From finding your dream home to identifying strategic commercial opportunities,  Real Estate Agency provides personalized property consulting services.</p></Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {SERVICES.map((s, i) => { const I = icons[i]; return (
            <Reveal key={s.t} delay={i * 0.1}><div className="group h-full border-t border-gold/40 pt-8 transition-colors hover:border-gold">
              <div className="aspect-[4/5] overflow-hidden"><Img src={s.img} alt={s.t} className="opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100" /></div>
              <I className="mt-8 text-gold" strokeWidth={1.2} size={32} />
              <h3 className="mt-4 font-display text-3xl">{s.t}</h3>
              <ul className="mt-5 space-y-3">{s.items.map(t => <li key={t} className="flex gap-3 text-ivory/80"><Check size={16} className="mt-1 shrink-0 text-gold" />{t}</li>)}</ul>
            </div></Reveal>) })}
        </div>
      </div>
    </section>
  )
}
