import Img from './Img'
import Reveal from './Reveal'
import { IMG } from '../lib/data'
const facts = [['Established','2013'],['Category','Real Estate Agency'],['Location',' Mumbai'],['Focus','Buy · Sell · Rent']]
export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6"><div className="aspect-[4/5] overflow-hidden md:aspect-[16/10] lg:aspect-[4/5]"><Img src={IMG.about} alt="Contemporary architecture" /></div></Reveal>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <h2 className="h2">Building Trust. Creating Possibilities.</h2>
          <p className="mt-8 leading-[1.8] text-ink/85">Established in 2013,  Real Estate Agency is a Mumbai-based property consultancy. Located in Lower Parel, Mumbai, the agency provides residential and commercial property consulting, buying, selling, rental, leasing, and investment assistance.</p>
          <p className="mt-5 leading-[1.8] text-ink/85">With a focus on personalized property guidance and professional service,  Real Estate Agency helps clients navigate real estate opportunities with confidence.</p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-beige pt-8">
            {facts.map(([k, v]) => <div key={k}><dt className="text-sm text-ink/55">{k}</dt><dd className="mt-1 font-display text-xl sm:text-2xl">{v}</dd></div>)}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
