import AboutUs from '@/components/layout/AboutUs'
import Contact from '@/components/layout/Contact'
import Hero from '@/components/layout/Hero'
import HomeMenu from '@/components/layout/HomeMenu'
import SectionHeaders from '@/components/layout/SectionHeaders'


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <AboutUs/>
      <Contact/>
    </>
  )
}
