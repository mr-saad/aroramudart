import { useContext, useEffect } from "react"
import { Context } from "../_app"
import Link from "next/link"

export const getStaticProps = async () => {
  const { default: sanity } = await import("../../components/sanityClient")

  const [prods, offers, { categories }] = await Promise.all([
    sanity.fetch(`*[_type=="product"]`),
    sanity.fetch(`*[_type=="offer"]{title,desc,"slug":slug.current}`),
    sanity.fetch(`*[_type=="category"][0]{categories}`),
  ])
  return {
    props: {
      prods,
      offers,
      categories,
    },
    revalidate: 6,
  }
}

export default function Offers({ prods, offers, categories }) {
  const { setProducts, setCategories } = useContext(Context)
  useEffect(() => {
    setProducts(prods)
    setCategories(categories)
  }, [])
  return (
    <div>
      <h1 className="heading text-center mb-5">Offers</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers ? (
          offers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/offers/${offer.slug}`}
              className="bg-[#f4f4f4] p-5"
            >
              <strong className="block text-black uppercase mb-2">
                {offer.title}
              </strong>
              <p>{offer.desc}</p>
            </Link>
          ))
        ) : (
          <p className="text-center  text-black text-xl">No Offers Available</p>
        )}
      </div>
    </div>
  )
}
