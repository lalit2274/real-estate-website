import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProperties from './components/FeaturedProperties'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 bg-ivory">
          <FeaturedProperties /><Services /><About /><Gallery /><WhyChooseUs /><Contact />
        </div>
      </main>
      <div className="relative z-10"><Footer /></div>
    </>
  )
}
