import { useState } from "react"
import PortableText from "react-portable-text"
import { BiArrowBack } from "react-icons/bi"
import { BarLoader } from "react-spinners"
import Head from "next/head"
import Image from "next/image"
import Product from "../../../components/Product"
import { useRouter } from "next/router"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"

export const getStaticPaths = async () => {
  const { default: sanity } = await import("../../../components/sanityClient")
  const data = await sanity.fetch(`*[_type == "product"]{"slug":slug.current}`)
  const paths = data.map(all => ({
    params: {
      slug: all.slug
    }
  }))
  return {
    paths,
    fallback: "blocking"
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
      body,
      category,
      "image":mainImage.asset->{url,"lqip":metadata.lqip},
      "images":images[].asset->{url,"lqip":metadata.lqip}
    }`,
    { slug }
  )

  const mayLikes = await sanity.fetch(
    `*[category==$category&&slug.current!=$slug][0..2]{
      title,
      "slug":slug.current,
      "image":mainImage.asset->{url,"lqip":metadata.lqip},
    }`,
    { category: product.category, slug }
  )

  return {
    props: {
      product,
      mayLikes
    },
    revalidate: 6
  }
}

export default function DynamicProduct({
  product: {
    title,
    price,
    discount,
    image: { url, lqip },
    images,
    body
  },
  mayLikes
}) {
  const [showForm, setShowForm] = useState(false)

  const discountedPrice = price - discount

  const { asPath, back } = useRouter()
  const title1 = `${title} | Arora Mud Art`

  return (
    <div className="mb-20 mx-auto text-sm md:text-base px-1">
      <div className="flex items-center mb-2 md:my-5">
        <button onClick={() => back()}>
          <BiArrowBack size={18} className="inline" />
          <p className="capitalize inline text-sm ml-1">
            {asPath.replace("/", "").replace(/\//g, " > ")}
          </p>
        </button>
      </div>
      <Head>
        <title>{title1}</title>
      </Head>
      <div className="flex gap-10 flex-col md:flex-row capitalize">
        <Swiper
          modules={[Pagination]}
          pagination={{ type: "progressbar" }}
          className="md:flex-1 w-full max-w-[400px] self-start rounded-md"
        >
          <SwiperSlide>
            <Image
              loading="eager"
              className="object-contain h-fit rounded-l-md cursor-move"
              sizes="(max-width: 640px) 80vw, 40vw"
              width={400}
              height={400}
              src={url}
              alt={title}
              placeholder="blur"
              blurDataURL={lqip}
            />
          </SwiperSlide>
          {images?.length !== 0 &&
            images?.map(({ url, lqip }) => (
              <SwiperSlide key={url}>
                <Image
                  className="cursor-move object-contain h-fit last:rounded-r-md"
                  sizes="(max-width: 640px) 80vw, 40vw"
                  width={400}
                  height={400}
                  src={url}
                  alt={title}
                  placeholder="blur"
                  blurDataURL={lqip}
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="flex-1">
          <h1 className="text-lg font-semibold dark:text-white text-black">
            {title}
          </h1>
          <div className="my-1">
            <span>₹{discountedPrice} </span>
            <s>₹{price}</s>
          </div>
          <span className="bg-green-600 text-sm text-white py-1 px-2 rounded-md">
            SAVE ₹{discount}
          </span>
          {!showForm ? (
            body && (
              <>
                <PortableText
                  className="leading-6 text-sm mt-5"
                  content={body}
                  dataset="production"
                  projectId="5onybuvh"
                />
                <button
                  className="btn mt-2 inline-block"
                  onClick={() => setShowForm(true)}
                >
                  Book Now
                </button>
              </>
            )
          ) : (
            <BookForm
              setShowForm={setShowForm}
              title={title}
              discountedPrice={discountedPrice}
            />
          )}
        </div>
      </div>

      {mayLikes.length !== 0 && (
        <div className="mt-28">
          <h1 className="heading mb-5">You May Also Like</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              540: {
                slidesPerView: 3
              }
            }}
            pagination={{
              type: "progressbar"
            }}
            modules={[Pagination]}
          >
            {mayLikes.map(props => (
              <SwiperSlide key={props.slug}>
                <Product {...props} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

function BookForm({ setShowForm, title, discountedPrice }) {
  const { push } = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    title,
    discountedPrice
  })
  const Change = ({ target: { value, name } }) => {
    setBook({ ...book, [name]: value })
  }

  const BookProduct = async e => {
    setLoading(true)
    e.preventDefault()
    const values = Object.entries(book).map(([key, value]) => value)
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      setShowSuccess(true)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
        <div className="flex">
          <button type="submit" className="btn mr-3">
            Confirm
          </button>
          <button className="neutral-btn" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      </form>
      {loading && <HangOn />}
      {showSuccess && <Success setShowSuccess={setShowSuccess} push={push} />}
    </>
  )
}

const HangOn = () => (
  <div className="fixed z-[30] inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] dark:bg-[#111] bg-[#ddd]">
    <BarLoader color="white" />
    <h1 className="text-4xl mt-5 dark:text-white text-black">Please Wait</h1>
  </div>
)

import SuccessJson from "./success.json"
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>
})
const Success = ({ setShowSuccess, push }) => {
  return (
    <div className="dark:bg-[#222222] bg-white border fixed w-full max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5 flex flex-col justify-center items-center z-[5]">
      <Lottie animationData={SuccessJson} loop={true} />
      <h1 className="dark:text-white text-black font-semibold text-lg">
        Your Order Has Been Booked!
      </h1>
      <button
        className="btn !self-center mt-2"
        onClick={() => {
          push("/products")
          setShowSuccess(false)
        }}
      >
        Got It
      </button>
    </div>
  )
}
