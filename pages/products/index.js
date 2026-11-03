import { useState, useEffect } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useMudContext } from "../../lib/Context"
// import Grid2 from "../../lib/assets/grid2.svg"
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
          <div className="Container py-0! flex gap-3 text-[0.815rem] tracking-widest">
            <div className="flex gap-4 items-center">
              <svg
                title={"Two Columns"}
                alt={"Two Columns"}
                onClick={() => setLayout("2x2")}
                className={`cursor-pointer transition-colors ${layout === "2x2"
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100 focus-visible:opacity-100"
                  }`}
                role="presentation" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill="#000" d="M0 0h8v8H0zM0 10h8v8H0zM10 0h8v8h-8zM10 10h8v8h-8z"></path>
              </svg>


              <svg
                title={"Three Columns"}
                alt={"Three Columns"}
                onClick={() => setLayout("3x3")}
                className={`hidden md:inline cursor-pointer transition-colors ${layout === "3x3"
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100 focus-visible:opacity-100"
                  }`}
                role="presentation" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill="#000" d="M0 0h4v4H0zM0 7h4v4H0zM0 14h4v4H0zM7 0h4v4H7zM7 7h4v4H7zM7 14h4v4H7zM14 0h4v4h-4zM14 7h4v4h-4zM14 14h4v4h-4z"></path>
              </svg>




              <svg
                title={"List View"}
                alt={"List View"}
                onClick={() => setLayout("rows")}
                className={`cursor-pointer transition-colors ${layout === "rows"
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100 focus-visible:opacity-100"
                  }`}
                role="presentation" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill="#000" d="M0 0h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0zm0 4h18v2H0z"></path>
              </svg>

            </div>
            <p className="grow uppercase p-5 text-center border-x border-gray-300">{finalProducts.length} Product{finalProducts.length > 1 && "s"}</p>
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
            null
          )}
        </div>
      </div>
    </>
  )
}

export default Products
