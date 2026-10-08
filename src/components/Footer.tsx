import { HOURS } from '../lib/data'
const links = [['Home','home'],['Properties','properties'],['Services','services'],['About Us','about'],['Gallery','gallery'],['Contact','contact']]
export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] pt-16 pb-8 text-ivory/75">
      <div className="wrap grid gap-12 md:grid-cols-3">
        <div><p className="font-display text-2xl tracking-[0.12em] text-ivory"> REAL ESTATE AGENCY</p>
          <p className="mt-4 max-w-xs">Your Trusted Real Estate Partner in Mumbai .</p></div>
        <nav aria-label="Footer"><ul className="grid grid-cols-2 gap-3">{links.map(([l, id]) => <li key={id}><a className="hover:text-gold" href={`#${id}`}>{l}</a></li>)}</ul></nav>
        <address className="not-italic space-y-2"><p> Mumbai, Maharashtra.</p><p>{HOURS}</p>
          <a className="inline-block text-gold hover:text-ivory" href="#contact">Send a Property Enquiry</a></address>
      </div>
      <div className="wrap mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-sm sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()}  Real Estate Agency. All rights reserved.</p>
        <p className="flex gap-6"><a href="#contact" className="hover:text-gold">Privacy Policy</a><a href="#contact" className="hover:text-gold">Terms and Conditions</a></p>
      </div>
    </footer>
  )
}
