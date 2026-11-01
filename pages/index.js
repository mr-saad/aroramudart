import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import { useEffect } from "react"
import Section from "../components/ProductsSections"
import { useMudContext } from "../lib/Context"
import { useLenis } from "lenis/react"

export const getStaticProps = async () => {
  const { default: sanity } = await import("../components/sanityClient")

  const [sections, prods, headerMedia, offers, categories] = await Promise.all([
    sanity.fetch(`
  *[_type == "section"]{
      title,'prods':*[_type=='product' && _id in ^.prods[]._ref]{"slug":slug.current,title,size,price,discount,"image":mainImage.asset->{url,"lqip":metadata.lqip}}
  }`),
    sanity.fetch(`
  *[_type == "product"]{
      "slug":slug.current,title,category,size,price,discount,"image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
    sanity.fetch(`
  *[_type == "headerMedia"][0]{
      "url":file.asset->url
  }`),
    sanity.fetch(`
  *[_type == "offer"]{
    _id,title,desc,"slug":slug.current
  }`),
    sanity.fetch(`
  *[_type == "category"]{
    category
  }`),
  ])

  return {
    props: {
      sections,
      prods,
      headerMedia,
      offers,
      categories,
    },
    revalidate: 6,
  }
}

const Home = ({ sections, prods, headerMedia, offers, categories }) => {
  const { setProducts, setOffers, setCategories } = useMudContext()
  useEffect(() => {
    setOffers(offers)
    setProducts(prods)
    setCategories(categories)
  }, [])

  const lenis = useLenis()

  return (
    <section>
      <div className="h-[calc(95vh-100px)] md:h-[calc(95vh-126px)]"></div>
      <header className="h-[95vh] w-full absolute top-0 left-0">
        <div className="absolute inset-0 z-1 bg-black/45"></div>
        <video
          preload="metadata"
          playsInline
          autoPlay
          muted
          loop
          src={headerMedia.url}
          className="absolute inset-0 w-full h-[95vh] object-cover"
        ></video>
        <button
          onClick={() => lenis.scrollTo("#creations", { offset: -40 })}
          className="absolute z-2 text-center cursor-pointer tracking-[.15rem] bottom-24 uppercase left-1/2 -translate-x-1/2 border border-white  py-2 text-white px-4 hover:bg-white hover:text-black transition-colors"
        >
          Shop Latest
        </button>
      </header>

      {sections.map((section, index) => (
        <Section key={section.title} index={index} {...section} />
      ))}
    </section>
  )
}

export default Home
