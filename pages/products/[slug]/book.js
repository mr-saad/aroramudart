import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { BarLoader } from "react-spinners"
import Script from "next/script"

const Book = ({
  product: {
    image: { url, lqip },
    title,
    price,
    discount,
  },
}) => {
  const discountedPrice = price - discount

  const [book, setBook] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    title,
    discountedPrice,
  })
  const Change = ({ target: { value, name } }) => {
    setBook({ ...book, [name]: value })
  }

  const [loading, setLoading] = useState(false)

  const { asPath, back, push } = useRouter()

  const [showSuccess, setShowSuccess] = useState(false)

  const BookProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    const values = Object.entries(book).map(([key, value]) => value)
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      setShowSuccess(true)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const keywords = title.split(" ")

  const title1 = `${title} | Arora Mud Art`

  return (
    <div className="max-w-4xl mx-auto text-sm md:text-base px-1">
      <div className="flex items-center mb-2">
        <button onClick={() => back()}>
          <BiArrowBack size={18} />
        </button>
        <p className="capitalize inline text-xs ml-1">
          {asPath.replace("/", "").replace(/\//g, " > ")}
        </p>
      </div>
      <Head>
        <title>{title1}</title>
        <meta
          name="keywords"
          content={`${keywords} Arora,Mud,Art,aroramudart,mudart,aroramudart.vercel.app`}
        />
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      </Head>

      {loading && <HangOn />}

      <div className="flex flex-col md:flex-row gap-10 capitalize">
        <Image
          sizes="(max-width: 540px) 40vw,
            (max-width: 768px) 60vw,
            (max-width: 1200px) 80vw"
          width={400}
          height={400}
          className="rounded-md object-contain h-fit mx-auto"
          src={url}
          alt={title}
          placeholder="blur"
          blurDataURL={lqip}
        />
        <div className="flex-1">
          <h1 className="text-lg dark:text-white text-black font-semibold">
            {title}
          </h1>
          <span>₹{discountedPrice} </span>
          <s>₹{price}</s> <br />
          <span className="bg-green-600 text-sm text-white py-1 px-2 rounded-md">
            SAVE ₹{discount}
          </span>
          <form
            autoComplete="off"
            onSubmit={BookProduct}
            className="flex flex-col mt-5"
          >
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="input_text"
                name="username"
                onChange={Change}
                value={book.username}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                className="input_text"
                name="email"
                onChange={Change}
                value={book.email}
                required
                type="email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                className="input_text"
                name="mobile"
                onChange={Change}
                value={book.mobile}
                required
                type="tel"
                minLength={10}
                maxLength={10}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                className="input_text"
                name="address"
                onChange={Change}
                value={book.address}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Confirm
            </button>
          </form>
        </div>
      </div>

      {showSuccess && <Success setShowSuccess={setShowSuccess} push={push} />}
    </div>
  )
}

export default Book

export const getStaticPaths = async () => {
  const { default: sanity } = await import("../../../components/sanityClient")
  const data = await sanity.fetch(`*[_type == "product"]{"slug":slug.current}`)
  const paths = data.map((all) => {
    return { params: { slug: all.slug } }
  })

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const { default: sanity } = await import("../../../components/sanityClient")
  const product = await sanity.fetch(
    `*[slug.current==$slug][0]{
      title,
      "slug":slug.current,
      price,
      discount,
      "image":mainImage.asset->{url,"lqip":metadata.lqip}
    }`,
    { slug }
  )

  return {
    props: { product },
    revalidate: 1,
  }
}

const HangOn = () => (
  <div className="fixed z-[30] inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] dark:bg-[#222222] bg-[#f28c28]/90">
    <BarLoader color="white" />
    <h1 className="text-4xl mt-5 dark:text-white text-black">Please Wait</h1>
  </div>
)

const Success = ({ setShowSuccess, push }) => {
  return (
    <div className="dark:bg-[#222222] bg-white border fixed w-full max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5 flex flex-col justify-center items-center z-[5]">
      <h1 className="dark:text-white text-black font-semibold text-lg">
        Your Order Has Been Booked!
      </h1>
      <p
        className="btn !self-center mt-2"
        onClick={() => {
          push("/products")
          setShowSuccess(false)
        }}
      >
        Got It
      </p>
    </div>
  )
}
