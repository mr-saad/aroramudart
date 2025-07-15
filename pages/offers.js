import { useContext } from "react"
import { Context } from "./_app"

export const getStaticProps = async () => {
  const { default: sanity } = await import("../components/sanityClient")

  const [prods, offers] = await Promise.all([
    sanity.fetch(`*[_type=="product"]`),
    sanity.fetch(`*[_type=="offer"]{title,desc}`),
  ])
  return {
    props: {
      prods,
      offers,
    },
    revalidate: 6,
  }
}

export default function Offers({ prods, offers }) {
  const { setProducts } = useContext(Context)
  setProducts(prods)
  return (
    <div>
      <h1 className="heading text-center mb-5">Offers</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers ? (
          offers.map((offer) => (
            <div className="bg-[#f4f4f4] p-5">
              <strong className="block text-black uppercase mb-2">
                {offer.title}
              </strong>
              <p>{offer.desc}</p>
            </div>
          ))
        ) : (
          <p className="text-center  text-black text-xl">No Offers Available</p>
        )}
      </div>
    </div>
  )
}
