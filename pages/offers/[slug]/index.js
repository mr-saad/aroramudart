import { useContext, useEffect } from "react"
import Product from "../../../components/Product"
import { Context } from "../../_app"

export const getStaticPaths = async () => {
  const { default: sanity } = await import("../../../components/sanityClient")
  const data = await sanity.fetch(`*[_type == "offer"]{"slug":slug.current}`)
  const paths = data.map((all) => ({
    params: {
      slug: all.slug,
    },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const { default: sanity } = await import("../../../components/sanityClient")

  const [offer, prods, { categories }] = await Promise.all([
    sanity.fetch(
      `*[_type=="offer" && slug.current==$slug][0]{
      title,
      "slug":slug.current,
      "products": *[_type=="product" && offer._ref == ^._id ]{
        title,
        "slug":slug.current,
        size,
        price,
        "image":mainImage.asset->{url,"lqip":metadata.lqip}
      },
    }`,
      { slug },
    ),
    sanity.fetch(`
  *[_type == "product"]{
      "slug":slug.current,title,category,"image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
    sanity.fetch(`*[_type == "category"][0]{categories}`),
  ])

  return {
    props: {
      prods,
      offer,
      categories,
    },
    revalidate: 6,
  }
}

export default function Offer({ offer, categories, prods }) {
  const { setProducts, setCategories } = useContext(Context)
  useEffect(() => {
    setProducts(prods)
    setCategories(categories)
  }, [])
  return (
    <div className="min-h-[50vh]">
      <h1 className="text-center text-black text-xl uppercase mb-10 mt-6">
        {offer.title}
      </h1>
      {offer.products.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {offer.products.map((prod) => (
            <Product {...prod} key={prod.slug} />
          ))}
        </div>
      ) : (
        <p className="text-center">No Products yet in this Offer</p>
      )}
    </div>
  )
}
