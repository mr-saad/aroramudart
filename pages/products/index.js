import { useState, useEffect, useContext } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Context } from "../_app"
const Product = dynamic(() => import("../../components/Product"))

export const getStaticProps = async () => {
  const { default: sanity } = await import("../../components/sanityClient")

  const [products, categories] = await Promise.all([
    sanity.fetch(`
  *[_type == "product"] | order(_createdAt desc){
    "slug":slug.current,
    title,
    "category":*[_type=='category' && _id == ^.category._ref][0].category,
    size,
    price,
    discount,
    "image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
    sanity.fetch(`*[_type=="category"]{category}`),
  ])

  return {
    props: {
      products,
      categories,
    },
    revalidate: 6,
  }
}

const Products = ({ products, categories }) => {
  const { setProducts, setCategories } = useContext(Context)
  useEffect(() => {
    setProducts(products)
    setCategories(categories)
  }, [])

  const [finalProducts, setFinalProducts] = useState(products)

  const selectedCat = useRouter().query.category

  useEffect(() => {
    if (!selectedCat) setFinalProducts(products)
    else
      setFinalProducts(products.filter((prod) => prod.category === selectedCat))
  }, [selectedCat])

  return (
    <>
      <Head>
        <title>Products | Arora Mud Art</title>
      </Head>
      <div className="mt-2 min-h-screen capitalize">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {finalProducts.length !== 0 ? (
            finalProducts.map((all) => {
              return <Product key={all.slug} {...all} />
            })
          ) : (
            <span>No Products</span>
          )}
        </div>
      </div>
    </>
  )
}

export default Products
