import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect, useContext } from "react"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { VscClose } from "react-icons/vsc"
import { BsSearch } from "react-icons/bs"
import { FaAngleDown } from "react-icons/fa"
import dynamic from "next/dynamic"
import { Context } from "../_app"
import { useTheme } from "next-themes"
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
      products: data
    },
    revalidate: 6
  }
}

const Products = ({ products }) => {
  const { showSearch, setShowSearch } = useContext(Context)
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [finalProducts, setFinalProducts] = useState(products)
  const [selectedCat, setSelectedCat] = useState("All Designs")

  useEffect(() => {
    const filter = products.filter(product => {
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
          products.filter(all => all.category === "Traditional Designs")
        )
        break
      case "Classic Designs":
        setFinalProducts(
          products.filter(all => all.category === "Classic Designs")
        )
        break
      case "Mirror Designs":
        setFinalProducts(
          products.filter(all => all.category === "Mirror Designs")
        )
        break
      case "Islamic Designs":
        setFinalProducts(
          products.filter(all => all.category === "Islamic Designs")
        )
        break
      case "Kutchi Work Designs":
        setFinalProducts(
          products.filter(all => all.category === "Kutchi Work Designs")
        )
        break
      case "Printed Clocks":
        setFinalProducts(
          products.filter(all => all.category === "Printed Clocks")
        )
        break
      case "Mudwork Clocks":
        setFinalProducts(
          products.filter(all => all.category === "Mudwork Clocks")
        )
        break
    }
  }, [selectedCat])

  return (
    <>
      <Head>
        <title>Products | Arora Mud Art</title>
      </Head>
      <div className="mb-20 mt-2 min-h-screen">
        {showSearch && (
          <Filter
            input={input}
            setInput={setInput}
            filtered={filtered}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            setShowSearch={setShowSearch}
          />
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-3 md:gap-10 capitalize">
          {finalProducts.length !== 0 ? (
            finalProducts.map(all => {
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

const categories = [
  "All Designs",
  "Traditional Designs",
  "Classic Designs",
  "Mirror Designs",
  "Islamic Designs",
  "Kutchi Work Designs",
  "Printed Clocks",
  "Mudwork Clocks"
]
export const Filter = ({
  filtered,
  selectedCat,
  input,
  setInput,
  setSelectedCat,
  setShowSearch
}) => {
  const [open, setOpen] = useState(false)

  const { theme } = useTheme()

  return (
    <div
      className="z-20 flex flex-col md:items-start fixed dark:bg-black bg-white h-full inset-0 pt-10
     md:flex-row gap-5 mb-5 p-5"
    >
      <div className="relative md:w-96 max-w-md">
        <p className="mb-2 dark:text-white text-black">Search</p>

        <div className="relative">
          <BsSearch
            size={16}
            className="absolute top-1/2 -translate-y-1/2 left-3 fill-black dark:fill-white"
          />
          <input
            maxLength={25}
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="What are you Searching For?"
            className="px-10 text-sm w-full py-2 bg-transparent rounded-md dark:text-white text-black outline-none border dark:border-white/20 dark:focus:border-white/40 dark:placeholder:text-white/50 placeholder:text-black/50 border-black/50 focus:border-black"
          />
          {(filtered.length !== 0 || input) && (
            <VscClose
              onClick={() => setInput("")}
              size={25}
              color={theme === "dark" ? "#fff" : "#000"}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <AnimatePresence>
          {filtered.length !== 0 ? (
            <motion.div
              key="key2"
              initial={{ opacity: 0, borderRadius: 6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute text-sm top-full flex flex-col mt-1 w-full dark:bg-[#111] bg-[#ddd] capitalize z-[2] max-h-40 overflow-y-auto dark:text-white text-black rounded-md gap-3 p-3 will-change-contents overflow-hidden"
            >
              {filtered.map((all, i) => (
                <AnimatePresence key={all.slug}>
                  <Link href={`/products/${all.slug}`}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {all.title}
                    </motion.span>
                  </Link>
                </AnimatePresence>
              ))}
            </motion.div>
          ) : (
            input && (
              <motion.div
                key="key1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute text-sm z-[2] w-full p-3 mt-1 dark:text-white text-black rounded-md dark:bg-[#111] bg-[#ddd] break-all"
              >
                No Results for "{input}"
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <div>
        <p className="mb-2 dark:text-white text-black">Sort By Category</p>
        <div className="rounded-md md:w-96 max-w-md relative border dark:border-white/20 border-black/50 text-sm select-none">
          <div
            onClick={() => {
              setOpen(!open)
            }}
            className="flex justify-between items-center px-4 py-2 cursor-pointer"
          >
            <h3 className="w-full text-black dark:text-white">{selectedCat}</h3>
            <FaAngleDown
              onClick={() => {
                setOpen(!open)
              }}
              size={20}
              className="transition"
              style={{ transform: open && "rotate(180deg)" }}
            />
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ ease: "linear", duration: 0.1 }}
                className="absolute mt-1 max-w-md w-full top-full z-[2] left-0 rounded-md gap-1 p-4 flex flex-col overflow-hidden dark:bg-[#111] bg-[#ddd]"
              >
                {categories.map(all => {
                  return (
                    <p
                      key={all}
                      onClick={() => {
                        setSelectedCat(all)
                        document.documentElement.classList.remove("over-hide")
                        setShowSearch(false)
                      }}
                      className={
                        "dark:text-white py-1 text-black cursor-pointer"
                      }
                    >
                      {all}
                    </p>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
