import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"
import { useContext, useEffect } from "react"
import { Context } from "./_app"
import Section from "../components/ProductsSections"
const Product = dynamic(() => import("../components/Product"))

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
  const { setProducts, setOffers, setCategories } = useContext(Context)
  useEffect(() => {
    setOffers(offers)
    setProducts(prods)
    setCategories(categories)
  }, [])

  return (
    <section>
      <div className="h-[calc(94vh-72px)] md:h-[calc(94vh-126px)]"></div>
      <header className="h-[94vh] w-full absolute top-0 left-0">
        <div className="absolute inset-0 z-[1] bg-black/45"></div>
        <video
          preload="metadata"
          playsInline
          autoPlay
          muted
          loop
          src={headerMedia.url}
          className="absolute inset-0 w-full h-[94vh] object-cover"
        ></video>
        <Link
          href={"/products"}
          className="absolute z-[2] text-center cursor-pointer tracking-[.15rem] bottom-24 uppercase left-1/2 -translate-x-1/2 border border-white  py-2 text-white px-4 hover:bg-white hover:text-black transition-colors"
        >
          Shop Latest
        </Link>
      </header>

      {sections.map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </section>
  )
}

export default Home
