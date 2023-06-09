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
const Product = dynamic(() => import("../../components/Product"))

const Products = ({ products }) => {
  const { showSearch, setShowSearch } = useContext(Context)
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [finalProducts, setFinalProducts] = useState(products)
  const [selectedCat, setSelectedCat] = useState("All")

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
          products.filter((all) => all.category === "Traditional Designs")
        )
        break
      case "Classic Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Classic Designs")
        )
        break
      case "Mirror Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Mirror Designs")
        )
        break
      case "Islamic Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Islamic Designs")
        )
        break
      case "Kutchi Work Designs":
        setFinalProducts(
          products.filter((all) => all.category === "Kutchi Work Designs")
        )
        break
      default:
        setFinalProducts(products)
    }
  }, [selectedCat])

  return (
    <div className="mb-20 mt-2">
      <Head>
        <title>Products | Arora Mud Art</title>
      </Head>

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

      <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-3 md:gap-10 capitalize mx-[-6px] md:mx-0">
        {finalProducts.map((all) => {
          return <Product key={all.slug} {...all} />
        })}
      </div>
    </div>
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
]
export const Filter = ({
  filtered,
  selectedCat,
  input,
  setInput,
  setSelectedCat,
  setShowSearch,
}) => {
  const [open, setOpen] = useState(false)

  const { dark } = useContext(Context)

  return (
    <div className="flex flex-col md:items-start fixed dark:bg-[#222222] bg-[#FFBF00]/[.95] rounded-md inset-y-4 w-full h-full left-0 top-16 md:flex-row gap-5 mb-5 p-5">
      <div className="relative md:w-96 max-w-md">
        <p className="mb-2 dark:text-white text-black">Search</p>

        <div className="relative">
          <BsSearch
            size={16}
            color={dark ? "#fff" : "#000"}
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            maxLength={25}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What are you Searching For?"
            className="px-10 text-sm w-full py-2 bg-transparent rounded-md dark:text-white text-black outline-none border dark:border-white/20 dark:focus:border-white/40 dark:placeholder:text-white/50 placeholder:text-black/50 border-black/50 focus:border-black"
          />
          {(filtered.length !== 0 || input) && (
            <VscClose
              onClick={() => setInput("")}
              size={25}
              color={dark ? "#fff" : "#000"}
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
              className="absolute text-sm top-full flex flex-col mt-1 w-full dark:bg-[#222222] bg-[#FFBF00] capitalize z-[2] max-h-40 overflow-y-auto dark:text-white text-black rounded-md gap-3 p-3 will-change-contents overflow-hidden"
            >
              {filtered.map((all, i) => (
                <AnimatePresence key={all.slug.current} exitBeforeEnter>
                  <Link href={`/products/${all.slug.current}`} key={i}>
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
                className="absolute text-sm z-[2] w-full p-3 mt-1 dark:text-white text-black rounded-md dark:bg-[#222222] bg-[#FFBF00] break-all"
              >
                No Results for "{input}"
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <div>
        <p className="mb-2 dark:text-white text-black">Sort By Category</p>
        <div className="rounded-md md:w-96 max-w-md relative border dark:border-white/20 border-black/50 text-sm">
          <div
            onClick={() => {
              setOpen(!open)
            }}
            className="flex justify-between items-center px-4 py-2"
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
                className="absolute mt-1 max-w-md w-full top-full z-[2] left-0 rounded-md gap-1 px-2 flex flex-col items-start overflow-hidden dark:bg-[#222222] bg-[#FFBF00]"
              >
                {categories.map((all) => {
                  return (
                    <h3
                      key={all}
                      onClick={() => {
                        setSelectedCat(all)
                        document.documentElement.classList.remove("over-hide")
                        setShowSearch(false)
                      }}
                      className={`select-none px-2 py-1 rounded-md ${
                        selectedCat === all &&
                        "bg-white dark:text-white text-black"
                      }`}
                    >
                      {all}
                    </h3>
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

export const getServerSideProps = async () => {
  const { default: sanity } = await import("../../components/sanityClient")

  const data = await sanity.fetch(`
  *[_type == "product"] | order(_createdAt desc){
    "slug":slug.current,
    title,
    price,
    discount,
    "image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`)

  return {
    props: {
      products: data,
    },
  }
}
