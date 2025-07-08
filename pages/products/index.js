import { useState, useEffect, useContext } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { Context } from "../_app"
const Product = dynamic(() => import("../../components/Product"))

export const getStaticProps = async () => {
  const { default: sanity } = await import("../../components/sanityClient")

  const data = await sanity.fetch(`
  *[_type == "product"] | order(_createdAt desc){
    _id,
    "slug":slug.current,
    title,
    category,
    price,
    discount,
    "image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`)

  return {
    props: {
      products: data,
    },
    revalidate: 6,
  }
}

const Products = ({ products }) => {
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [finalProducts, setFinalProducts] = useState(products)
  const [selectedCat, setSelectedCat] = useState("All Designs")

  useEffect(() => {
    const filter = products.filter((product) => {
      return product.title.toLowerCase().includes(input.toLowerCase())
    })
    input === "" ? setFiltered([]) : setFiltered(filter)
  }, [input])

  useEffect(() => {
    switch (selectedCat) {
      case "All Designs":
        setFinalProducts(products)
        break
      case "Traditional Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Traditional Designs"),
        )
        break
      case "Classic Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Classic Designs"),
        )
        break
      case "Mirror Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Mirror Designs"),
        )
        break
      case "Islamic Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Islamic Designs"),
        )
        break
      case "Kutchi Work Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Kutchi Work Designs"),
        )
        break
      case "Printed Clocks":
        setFinalProducts(
          products.filter((all) => all.category === "Printed Clocks"),
        )
        break
      case "Mudwork Clocks":
        setFinalProducts(
          products.filter((all) => all.category === "Mudwork Clocks"),
        )
        break
    }
  }, [selectedCat])

  return (
    <>
      <Head>
        <title>Products | Arora Mud Art</title>
      </Head>
      <div className="mt-2 min-h-screen capitalize">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4">
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
