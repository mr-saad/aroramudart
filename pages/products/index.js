import { useState, useEffect } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useMudContext } from "../../lib/Context"
import Grid2 from "../../lib/assets/grid2.svg"
import Grid3 from "../../lib/assets/grid3.svg"
import List from "../../lib/assets/list.svg"

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
  console.log(Grid2)
  const { setProducts, setCategories } = useMudContext()
  useEffect(() => {
    setProducts(products)
    setCategories(categories)
  }, [])

  const [finalProducts, setFinalProducts] = useState(products)
  const [layout, setLayout] = useState("3x3")

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
      <div className="min-h-screen ">
        <div className="border-b border-gray-200">
          <div className="Container py-0! flex gap-3">
            <div className="flex gap-2">
              <img
                width={20}
                height={20}
                title={"Two Columns"}
                alt={"Two Columns"}
                src={Grid2.src}
                onClick={() => setLayout("2x2")}
                className={`cursor-pointer transition-colors ${layout === "2x2"
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100 focus-visible:opacity-100"
                  }`}
              />
              <img
                width={20}
                height={20}
                title={"Three Columns"}
                alt={"Three Columns"}
                src={Grid3.src}
                onClick={() => setLayout("3x3")}
                className={`cursor-pointer transition-colors ${layout === "3x3"
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100 focus-visible:opacity-100"
                  }`}
              />
              <img
                width={20}
                height={20}
                title={"List View"}
                alt={"List View"}
                src={List.src}
                onClick={() => setLayout("rows")}
                className={`cursor-pointer transition-colors ${layout === "rows"
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100 focus-visible:opacity-100"
                  }`}
              />
            </div>
            <p className="grow py-2 text-center border-x border-gray-300">{finalProducts.length} Product{finalProducts.length > 0 && "s"}</p>
            <select name="sort" id="sort" className="uppercase">
              <option>Sort By</option>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        {/*  {selectedCat ? (
          <h2 className="text-3xl text-black mb-5">Category - {selectedCat}</h2>
        ) : null}*/}
        <div
          className={`Container grid gap-4 md:gap-6 ${layout === "2x2"
            ? "grid-cols-2"
            : layout === "rows"
              ? "grid-cols-1"
              : "grid-cols-2 lg:grid-cols-3"
            }`}
        >
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
