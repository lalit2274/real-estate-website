const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}`
export const IMG = {
  hero: u('photo-1545324418-cc1a3fa10c00', 2200),
  villa: u('photo-1613490493576-7fde63acd811'),
  apartment: u('photo-1600607687939-ce8a6c25118c'),
  office: u('photo-1486406146926-c627a92ad1ab'),
  invest: u('photo-1512917774080-9991f1c4c750'),
  modern: u('photo-1600585154340-be6161a56a0c'),
  tower: u('photo-1545324418-cc1a3fa10c00'),
  skyline: u('photo-1570168007204-dfb528c6958f'),
  about: u('photo-1600596542815-ffad4c1539a9', 1600),
}
export const HOURS = '10:30 AM – 8:30 PM, all seven days'
export const ADDRESS = ' Mumbai, Maharashtra, India.'
export const NAV = [['Home','home'],['Properties','properties'],['Services','services'],['About','about'],['Gallery','gallery']] as const
export const PROPERTIES = [
  { name:'Sample Residence: Luxury Villa', loc:'Mumbai', type:'Luxury Residential', img:IMG.villa, text:'A demonstration of the private villas and premium homes we help clients find and evaluate.' },
  { name:'Sample Residence: Sky Apartment', loc:'Lower Parel, Mumbai', type:'Premium Apartments', img:IMG.apartment, text:'A demonstration of high-rise apartment living across Mumbai’s central neighbourhoods.' },
  { name:'Sample Workspace: Corporate Office', loc:'Mumbai', type:'Commercial Spaces', img:IMG.office, text:'A demonstration of office and commercial spaces for purchase or lease.' },
  { name:'Sample Project: Under Construction', loc:'Mumbai', type:'Investment Properties', img:IMG.invest, text:'A demonstration of new-launch and under-construction opportunities, assessed with guidance.' },
]
export const SERVICES = [
  { t:'Residential Property', img:IMG.modern, items:['Flats Buying and Selling','Residential Property Rental','New Home Consultation'] },
  { t:'Commercial Property', img:IMG.office, items:['Office Space Buying and Selling','Commercial Leasing','Commercial Property Consultation'] },
  { t:'Investment Properties', img:IMG.invest, items:['Under-Construction Projects','Property Investment Consultation','Property Purchase and Sale Assistance'] },
]
export const GALLERY = [
  { src:IMG.villa, alt:'Luxury villa exterior' },{ src:IMG.apartment, alt:'Premium apartment interior' },
  { src:IMG.tower, alt:'Modern residential tower' },{ src:IMG.skyline, alt:'Mumbai skyline' },
  { src:IMG.office, alt:'Commercial office architecture' },{ src:IMG.modern, alt:'Contemporary architecture' },
]
