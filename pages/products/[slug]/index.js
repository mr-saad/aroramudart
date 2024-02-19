import { useState } from "react"
import PortableText from "react-portable-text"
import { BiArrowBack } from "react-icons/bi"
import { BarLoader } from "react-spinners"
import Head from "next/head"
import Image from "next/image"
import Product from "../../../components/Product"
import { useRouter } from "next/router"
import { Pagination, Keyboard, Mousewheel } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"

export const getStaticPaths = async () => {
  const { default: sanity } = await import("../../../components/sanityClient")
  const data = await sanity.fetch(`*[_type == "product"]{"slug":slug.current}`)
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
    { slug },
  )

  const mayLikes = await sanity.fetch(
    `*[category==$category&&slug.current!=$slug][0..2]{
      title,
      "slug":slug.current,
      "image":mainImage.asset->{url,"lqip":metadata.lqip},
    }`,
    { category: product.category, slug },
  )

  return {
    props: {
      product,
      mayLikes,
    },
    revalidate: 6,
  }
}

export default function DynamicProduct({
  product: {
    title,
    price,
    discount,
    image: { url, lqip },
    images,
    body,
  },
  mayLikes,
}) {
  const [showForm, setShowForm] = useState(false)

  const discountedPrice = price - discount

  const { asPath, back } = useRouter()
  const title1 = `${title} | Arora Mud Art`

  return (
    <div className="mx-auto leading-6 min-h-[80vh]">
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
      <div className="flex gap-5 md:gap-10 flex-col md:flex-row capitalize">
        <Swiper
          modules={[Pagination, Keyboard, Mousewheel]}
          mousewheel
          keyboard
          pagination={{ type: "progressbar" }}
          className="md:flex-1 w-full max-w-[400px] self-start rounded-md"
        >
          <SwiperSlide>
            <Image
              priority
              loading="eager"
              className="object-contain h-fit rounded-l-md cursor-move"
              sizes="(max-width: 640px) 90vw, 40vw"
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
          <h1 className="text-lg font-semibold dark:text-white text-[#0c0908]">
            {title}
          </h1>
          <span className="bg-green-600 my-1 text-sm inline-block text-white px-3 py-1 rounded-md">
            SAVE ₹{discount}
          </span>
          <div>
            <span>₹{discountedPrice} </span>
            <s className="text-sm">₹{price}</s>
          </div>
          {!showForm ? (
            body && (
              <>
                <PortableText
                  content={body}
                  dataset="production"
                  projectId="5onybuvh"
                />
                <button
                  type="button"
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
        <div className="mt-24">
          <h1 className="heading">You May Also Like</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              540: {
                slidesPerView: 3,
              },
            }}
            pagination={{
              type: "progressbar",
            }}
            modules={[Pagination]}
          >
            {mayLikes.map((props) => (
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

  const BookProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = []
    for (const value of formData.values()) {
      values.push(value)
    }
    values.push(title)
    values.push(discountedPrice)

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

  return (
    <>
      <form onSubmit={BookProduct} className="mt-5">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="input_text"
          name="username"
          required
          type="text"
        />

        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          className="input_text"
          name="email"
          required
          type="email"
        />

        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          className="input_text"
          name="mobile"
          required
          type="tel"
          minLength={10}
          maxLength={10}
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          className="input_text"
          name="address"
          required
        ></textarea>

        <button type="submit" className="btn mr-3">
          Confirm
        </button>
        <button className="neutral-btn" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>

      {loading && <HangOn />}
      {showSuccess && <Success setShowSuccess={setShowSuccess} push={push} />}
    </>
  )
}

const HangOn = () => (
  <div className="fixed z-[30] inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] dark:bg-[#111] bg-[#ddd]">
    <BarLoader color="white" />
    <h1 className="text-4xl mt-5 dark:text-white text-[#0c0908]">
      Please Wait
    </h1>
  </div>
)

import SuccessJson from "./success.json"
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const Success = ({ setShowSuccess, push }) => {
  return (
    <div className="bg-[#0c0908]/70 fixed left-0 top-0 z-[2] w-full h-full">
      <div className="dark:bg-[#0c0908] bg-white border border-white/10 fixed w-[calc(100%-2rem)] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5 flex flex-col justify-center items-center z-[5]">
        <Lottie animationData={SuccessJson} loop={true} />
        <p className="dark:text-white text-[#0c0908] font-semibold text-lg my-5">
          Your Order Has Been Booked!
        </p>
        <button
          className="btn !self-center"
          onClick={() => {
            push("/products")
            setShowSuccess(false)
          }}
        >
          Got It
        </button>
      </div>
    </div>
  )
}
