import { Landmark, Home, Building2, UserCheck, MapPin, KeyRound } from 'lucide-react'
import Reveal from './Reveal'
const items = [
  [Landmark,'Established real estate consultancy since 2013'],[Home,'Residential property assistance'],[Building2,'Commercial property consulting'],
  [UserCheck,'Personalized property guidance'],[MapPin,'Local Mumbai market presence'],[KeyRound,'Buying, selling, rental and leasing assistance'],
] as const
export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5"><h2 className="h2">Your Property Journey, Guided With Confidence.</h2></Reveal>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
          {items.map(([I, t], k) => <Reveal key={t} delay={(k % 2) * 0.08}><div className="flex gap-4 border-t border-beige pt-6">
            <I className="mt-1 shrink-0 text-gold" strokeWidth={1.3} size={26} /><p className="font-display text-2xl leading-snug">{t}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  )
}
