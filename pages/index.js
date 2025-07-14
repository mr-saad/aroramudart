import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"
import { useContext } from "react"
import { Context } from "./_app"
const Product = dynamic(() => import("../components/Product"))

export const getStaticProps = async () => {
  const { default: sanity } = await import("../components/sanityClient")

  const [prods, featured, newArrivals] = await Promise.all([
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
  ])

  return {
    props: {
      prods,
      featured,
      newArrivals,
    },
    revalidate: 6,
  }
}

const Home = ({ prods, featured, newArrivals }) => {
  const { setProducts } = useContext(Context)
  setProducts(prods)
  return (
    <section>
      <div className="h-[94vh]"></div>
      <header className="h-[94vh] w-full absolute top-0 left-0">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black/60"></div>
        <video
          autoPlay
          muted
          loop
          src="/mud_demo.mp4"
          className="absolute inset-0 w-full h-[94vh] object-cover"
        ></video>
        <Link
          href={"/products"}
          className="absolute z-[2] cursor-pointer tracking-widest bottom-24 uppercase left-1/2 -translate-x-1/2 border border-white md:text-xl text-base py-2 text-white px-4 hover:bg-white hover:text-black transition-colors"
        >
          Shop Latest
        </Link>
      </header>

      <div className="mx-auto uppercase">
        <h1 className="heading text-center mb-5">New Arrivals</h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
          {newArrivals &&
            newArrivals.products.map((all) => (
              <Product key={all.slug} {...all} />
            ))}
        </div>
      </div>
      <div className="mx-auto grid justify-items-center uppercase mt-15">
        <h1 className="heading text-center mb-5">Featured Collection</h1>

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
