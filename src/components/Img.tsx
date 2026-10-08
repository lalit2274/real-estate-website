import { useState } from 'react'
type P = { src: string; alt: string; className?: string; eager?: boolean }
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'><rect width='16' height='10' fill='#292929'/><path d='M3 9V4l3-2 3 2v5M9 9V5h4v4' stroke='#C5A46D' fill='none' stroke-width='.3'/></svg>")
export default function Img({ src, alt, className = '', eager }: P) {
  const [s, setS] = useState(src)
  return <img src={s} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setS(FALLBACK)} className={`h-full w-full ${s === FALLBACK ? 'object-contain' : 'object-cover'} ${className}`} />
}
