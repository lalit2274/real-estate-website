import { useEffect, useState, type FormEvent } from 'react'
import { MapPin, Clock } from 'lucide-react'
import Reveal from './Reveal'
import { ADDRESS, HOURS } from '../lib/data'
const INTERESTS = ['Buying','Selling','Renting','Leasing','Investment'], TYPES = ['Residential','Commercial','Villa','Apartment','Other']
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined
type F = { name: string; phone: string; email: string; interest: string; type: string; message: string }
const empty: F = { name:'', phone:'', email:'', interest:'', type:'', message:'' }
const field = 'w-full border-b border-beige bg-transparent py-3 text-base outline-none transition-colors focus:border-gold placeholder:text-ink/40'
export default function Contact() {
  const [f, setF] = useState<F>(empty), [err, setErr] = useState<Partial<F>>({}), [status, setStatus] = useState<'idle'|'sending'|'sent'|'failed'|'unconfigured'>('idle')
  useEffect(() => { const t = sessionStorage.getItem('fre-interest'); if (t) { setF(v => ({ ...v, message: `I'd like to enquire about: ${t}.` })); sessionStorage.removeItem('fre-interest') } }, [])
  const set = (k: keyof F) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const validate = () => {
    const e: Partial<F> = {}
    if (f.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, '').replace(/^(\+?91)?/, m => m ? m : ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'Enter a valid email address.'
    if (!f.interest) e.interest = 'Choose what you are interested in.'
    if (!f.type) e.type = 'Choose a property type.'
    if (f.message.trim().length < 5) e.message = 'Tell us a little about your property requirements.'
    setErr(e); return Object.keys(e).length === 0
  }
  const submit = async (ev: FormEvent) => {
    ev.preventDefault(); if (!validate()) return
    if (!ENDPOINT) { console.warn('VITE_ENQUIRY_ENDPOINT is not set: enquiry was not delivered.'); setStatus('unconfigured'); return }
    setStatus('sending')
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...f, subject: 'New property enquiry:  Real Estate Agency website' }) })
      if (!r.ok) throw new Error(String(r.status)); setStatus('sent'); setF(empty)
    } catch { setStatus('failed') }
  }
  const E = ({ k }: { k: keyof F }) => err[k] ? <p role="alert" className="mt-1 text-sm text-[#a33]">{err[k]}</p> : null
  const info = [[MapPin, ADDRESS],[Clock, HOURS]] as const
  return (
    <section id="contact" className="bg-charcoal py-24 text-ivory lg:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="h2">Let’s Find Your Next Opportunity.</h2>
          <p className="mt-6 text-ivory/70">Whether you’re looking to buy, sell, rent, lease, or explore property investment opportunities, share your requirements with  Real Estate Agency using the property enquiry form and our team will get back to you.</p>
          <ul className="mt-10 space-y-5">{info.map(([I, t]) => <li key={t} className="flex gap-4"><I size={20} className="mt-1 shrink-0 text-gold" strokeWidth={1.4} />
            <span className="text-ivory/85">{t}</span></li>)}</ul>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <form onSubmit={submit} noValidate aria-label="Property enquiry form" className="grid gap-x-8 gap-y-6 sm:grid-cols-2 bg-ivory p-6 text-charcoal sm:p-10">
            <label className="block">Full name<input className={field} value={f.name} onChange={set('name')} autoComplete="name" required /><E k="name" /></label>
            <label className="block">Phone number<input className={field} value={f.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" required /><E k="phone" /></label>
            <label className="block sm:col-span-2">Email address<input className={field} value={f.email} onChange={set('email')} type="email" autoComplete="email" required /><E k="email" /></label>
            <label className="block">Interested in<select className={field} value={f.interest} onChange={set('interest')}><option value="">Select</option>{INTERESTS.map(o => <option key={o}>{o}</option>)}</select><E k="interest" /></label>
            <label className="block">Property type<select className={field} value={f.type} onChange={set('type')}><option value="">Select</option>{TYPES.map(o => <option key={o}>{o}</option>)}</select><E k="type" /></label>
            <label className="block sm:col-span-2">Your property requirements<textarea className={field} rows={4} value={f.message} onChange={set('message')} required /><E k="message" /></label>
            <div className="sm:col-span-2">
              <button className="btn btn-dark w-full sm:w-auto" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</button>
              <div aria-live="polite" className="mt-4 text-sm">
                {status === 'sent' && <p className="text-[#2d6a3e]">Enquiry sent. We will contact you during office hours.</p>}
                {status === 'unconfigured' && <p className="text-[#a33]">Our online enquiry service is not available right now. Please try again later.</p>}
                {status === 'failed' && <p className="text-[#a33]">Your enquiry could not be sent. Please check your details and try again.</p>}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
