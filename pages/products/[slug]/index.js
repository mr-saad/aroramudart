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

  const [product, prods, categories] = await Promise.all([
    sanity.fetch(
      `*[_type=="product" && slug.current==$slug][0]{
      title,
      "slug":slug.current,
      price,
      size,
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
      "slug":slug.current,title,category,instock,"image":mainImage.asset->{url,"lqip":metadata.lqip}
  }`),
    sanity.fetch(`*[_type == "category"]{category}`),
  ])

  const mayLikes = await sanity.fetch(
    `*[category==$category && slug.current!=$slug][0..2]{
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
      categories,
    },
    revalidate: 6,
  }
}

export default function DynamicProduct({
  product: {
    title,
    price,
    discount,
    size,
    instock,
    image: { url, lqip },
    images,
    body,
  },
  mayLikes,
  prods,
  categories,
}) {
  const [showForm, setShowForm] = useState(false)
  const { setProducts, setCategories } = useContext(Context)
  useEffect(() => {
    setProducts(prods)
    setCategories(categories)
  }, [])
  const discountedPrice = price - discount

  const title1 = `${title} | Arora Mud Art`

  return (
    <div className="mx-auto min-h-[80vh]">
      <Head>
        <title>{title1}</title>
      </Head>
      <div className="flex relative gap-5 md:gap-10 flex-col md:flex-row">
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

        <div className="md:self-start sticky top-[5.5rem]">
          <h1 className="text-black text-2xl">{title}</h1>
          <p className="text-xl mb-3 mt-2">{size}</p>
          {/* <div className="mt-4">
            <span className="bg-green-600 text-xs mr-4 inline-block text-white px-3 py-1">
              SAVE ₹{discount}
            </span>
          </div> */}
          <div className="mb-4">
            <s className="text-sm mr-1">₹{price}</s>
            <span className="text-xl text-black">₹{discountedPrice}</span>
          </div>
          {/* <p
            className={`border-b inline border-current ${
              instock ? "text-green-600" : "text-red-600"
            }`}
          >
            {instock ? "In Stock" : "Out of Stock"}
          </p> */}
          {
            /* !showForm && */ instock && (
              // <button
              //   type="button"
              //   className="btn mb-4"
              //   onClick={() => setShowForm(true)}
              // >
              //   Book Now
              // </button>
              <div>
                <p>Order now on any followings</p>
                <div className="flex flex-wrap *:grow gap-4 my-4">
                  <a
                    target="_blank"
                    className="flex items-center gap-2 btn !border-none !bg-[#25d366]"
                    href="https://wa.me/919979672226"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                      ></path>
                    </svg>{" "}
                    +91 9979672226
                  </a>
                  <a
                    className="flex items-center gap-2  btn !border-none !bg-[#0866ff]"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>{" "}
                    Arora Mud Art
                  </a>
                  <a
                    target="_blank"
                    className="flex items-center gap-2  btn !border-none !bg-orange-600"
                    href="https://www.instagram.com/direct/t/17842822046736295/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>{" "}
                    @aroramudart
                  </a>
                </div>
              </div>
            )
          }

          {!showForm ? (
            body && (
              <>
                <p className="text-base text-black">Product Details: </p>
                <PortableText
                  content={body}
                  dataset="production"
                  projectId="5onybuvh"
                  className="mt-2"
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
    e.preventDefault()
    setLoading(true)
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
