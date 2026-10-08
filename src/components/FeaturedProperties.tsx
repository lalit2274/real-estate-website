import Img from './Img'
import Reveal from './Reveal'
import { PROPERTIES } from '../lib/data'
export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 lg:py-36">
      <div className="wrap">
        <Reveal className="max-w-3xl"><h2 className="h2">Exceptional Properties. Extraordinary Possibilities.</h2>
          <p className="mt-6 text-lg text-ink/75">Explore carefully selected residential and commercial opportunities across Mumbai.</p></Reveal>
        <div className="mt-16 space-y-20 lg:space-y-28">
          {PROPERTIES.map((p, i) => (
            <Reveal key={p.name}><article className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14`}>
              <div className={`group overflow-hidden aspect-[4/3] lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Img src={p.img} alt={p.name} className="transition-transform duration-[1200ms] ease-out group-hover:scale-105" /></div>
              <div className="lg:col-span-5">
                <p className="text-sm text-gold-dark text-[#8c6f3d]">{p.type}</p>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-ink/60">{p.loc}</p>
                <p className="mt-5 leading-relaxed text-ink/80">{p.text}</p>
                <p className="mt-3 text-xs text-ink/50">Demonstration property. Not an active  listing.</p>
                <a href="#contact" onClick={() => sessionStorage.setItem('fre-interest', p.type)} className="btn btn-dark mt-8">Enquire Now</a>
              </div></article></Reveal>))}
        </div>
      </div>
    </section>
  )
}
