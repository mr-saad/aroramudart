import Product from "../../../components/Product"

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

  const [offer, product] = await Promise.all([
    sanity.fetch(
      `*[_type=="offer" && slug.current==$slug][0]{
      title,
      "slug":slug.current,
      discount,
      "products": *[_type=="product" && offer._ref == ^._id ]{
        title,
        "slug":slug.current,
        "image":mainImage.asset->{url,"lqip":metadata.lqip}
      },
      "image":mainImage.asset->{url,"lqip":metadata.lqip},
      "images":images[].asset->{url,"lqip":metadata.lqip}
    }`,
      { slug },
    ),
    sanity.fetch(`
  *[_type == "product"]{
      "slug":slug.current,title,category,"image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
  ])

  return {
    props: {
      product,
      offer,
    },
    revalidate: 6,
  }
}

export default function Offer({ offer }) {
  return (
    <div>
      <h1 className="text-center text-black text-xl uppercase">
        {offer.title}
      </h1>
      {offer.products.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
          {offer.products.map((prod) => (
            <Product {...prod} key={prod._id} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No Products yet in this Offer</p>
      )}
    </div>
  )
}
