import { useContext, useEffect, useState } from "react"
import PortableText from "react-portable-text"
import { BarLoader } from "react-spinners"
import Head from "next/head"
import Image from "next/image"
import Product from "../../../components/Product"
import { useRouter } from "next/router"
import { Pagination, Keyboard } from "swiper/modules"
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

  const [product, prods] = await Promise.all([
    sanity.fetch(
      `*[slug.current==$slug][0]{
      title,
      "slug":slug.current,
      price,
      discount,
      instock,
      body,
      category,
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
      prods,
    },
    revalidate: 6,
  }
}

export default function DynamicProduct({
  product: {
    title,
    price,
    discount,
    instock,
    image: { url, lqip },
    images,
    body,
  },
  mayLikes,
  prods,
}) {
  const [showForm, setShowForm] = useState(false)
  const { setProducts } = useContext(Context)
  useEffect(() => {
    setProducts(prods)
  }, [])
  const discountedPrice = price - discount

  const title1 = `${title} | Arora Mud Art`

  return (
    <div className="mx-auto min-h-[80vh]">
      <Head>
        <title>{title1}</title>
      </Head>
      <div className="flex relative gap-5 md:gap-10 flex-col md:flex-row capitalize justify-center">
        <Swiper
          modules={[Pagination, Keyboard]}
          keyboard
          pagination
          style={{ zIndex: "auto" }}
          className="max-w-lg w-full  !mx-0"
          spaceBetween={16}
          breakpoints={{
            768: {
              enabled: false,
            },
          }}
          wrapperClass="md:!grid md:gap-5 !z-auto"
        >
          <SwiperSlide>
            <Image
              priority
              loading="eager"
              className="object-contain w-full"
              sizes="(max-width: 640px) 90vw, 40vw"
              width={400}
              height={400}
              src={url}
              alt={title}
              placeholder="blur"
              blurDataURL={lqip}
            />
          </SwiperSlide>

          {images?.length &&
            images?.map(({ url, lqip }) => (
              <SwiperSlide key={url}>
                <Image
                  className="object-contain w-full h-auto"
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

        <div className="md:self-start sticky top-[5.5rem] ">
          <h1 className="text-xl text-black uppercase">{title}</h1>
          {/* <div className="mt-4">
            <span className="bg-green-600 text-xs mr-4 inline-block text-white px-3 py-1">
              SAVE ₹{discount}
            </span>
          </div> */}
          <div className="my-4">
            <s className="text-sm mr-1">₹{price}</s>
            <span className="text-lg text-black">₹{discountedPrice}</span>
          </div>
          <p
            className={`border-b inline border-current ${
              instock ? "text-green-600" : "text-red-600"
            }`}
          >
            {instock ? "In Stock" : "Out of Stock"}
          </p>
          {!showForm && instock && (
            <button
              type="button"
              className="btn w-full block mt-4"
              onClick={() => setShowForm(true)}
            >
              Book Now
            </button>
          )}

          {!showForm ? (
            body && (
              <>
                <PortableText
                  content={body}
                  dataset="production"
                  projectId="5onybuvh"
                  className="mt-4"
                />
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
          <h1 className="heading text-center mb-15">Related Products</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              540: {
                slidesPerView: 3,
              },
            }}
            pagination
            modules={[Pagination]}
            style={{ zIndex: "auto" }}
            wrapperClass="!z-auto"
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
      {loading && <HangOn />}
      {showSuccess && <Success setShowSuccess={setShowSuccess} push={push} />}

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
        <button
          className="neutral-btn cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </form>
    </>
  )
}

const HangOn = () => (
  <div className="fixed z-50 select-none inset-0 flex flex-col items-center justify-center backdrop-blur-[2px]  bg-[#ddd]">
    <BarLoader color="white" />
    <h1 className="text-4xl mt-5  text-black">Please Wait</h1>
  </div>
)

import SuccessJson from "./success.json"
import { Context } from "../../_app"
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const Success = ({ setShowSuccess, push }) => {
  return (
    <div className="bg-black/70 fixed select-none left-0 top-0 z-50 w-full h-full">
      <div className=" bg-white border border-white/10 fixed w-[calc(100%-2rem)] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5 flex flex-col justify-center items-center z-[5]">
        <Lottie animationData={SuccessJson} loop={true} />
        <p className=" text-black  text-lg my-5">Order Placed!</p>
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
