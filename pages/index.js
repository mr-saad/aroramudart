import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"
import { useContext } from "react"
import { Context } from "./_app"
const Product = dynamic(() => import("../components/Product"))

export const getStaticProps = async () => {
  const { default: sanity } = await import("../components/sanityClient")

  const [prods, featured, newArrivals, headerMedia, spotOffer] =
    await Promise.all([
      sanity.fetch(`
  *[_type == "product"]{
      "slug":slug.current,title,category,"image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
      sanity.fetch(`
  *[_type == "featured"][0]{
      "products": *[_type=="product" && _id in ^.products[]._ref]{"slug":slug.current,title,"image":mainImage.asset->{url,"lqip":metadata.lqip}}
  }`),
      sanity.fetch(`
  *[_type == "newArrival"][0]{
      "products": *[_type=="product" && _id in ^.products[]._ref]{"slug":slug.current,title,"image":mainImage.asset->{url,"lqip":metadata.lqip}}
  }`),
      sanity.fetch(`
  *[_type == "headerMedia"][0]{
      "url":file.asset->url
  }`),
      sanity.fetch(`
  *[_type == "spotOffer"][0]{
    "offer":*[_type=="offer" && id==^._ref][0]{title,desc}
  }`),
    ])

  return {
    props: {
      prods,
      featured,
      newArrivals,
      headerMedia,
      spotOffer,
    },
    revalidate: 6,
  }
}

const Home = ({ prods, featured, newArrivals, headerMedia, spotOffer }) => {
  const { setProducts, setSpotOffer } = useContext(Context)
  setSpotOffer(spotOffer)
  setProducts(prods)

  return (
    <section>
      <div className="h-[calc(94vh-72px)] md:h-[calc(94vh-132px)]"></div>
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
          className="absolute z-[2] text-center cursor-pointer tracking-[.15rem] bottom-24 uppercase left-1/2 -translate-x-1/2 border border-white  text-xs py-2 text-white px-4 hover:bg-white hover:text-black transition-colors"
        >
          Shop Latest
        </Link>
      </header>

      <div className="mx-auto uppercase">
        <h1 className="heading text-center mb-15">New Arrivals</h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
          {newArrivals &&
            newArrivals.products.map((all) => (
              <Product key={all.slug} {...all} />
            ))}
        </div>
      </div>
      <div className="mx-auto grid justify-items-center uppercase mt-15">
        <h1 className="heading text-center mb-15">Featured Collection</h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
          {featured &&
            featured.products.map((all) => <Product key={all.slug} {...all} />)}
        </div>

        <Link className="btn inline-block  mt-5" href={"/products"}>
          View More
        </Link>
      </div>
    </section>
  )
}

export default Home
