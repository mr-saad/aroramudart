import { useEffect, useState } from "react"
import PortableText from "react-portable-text"
import { BarLoader } from "react-spinners"
import Head from "next/head"
import Image from "next/image"
import { Toaster, toast } from "sonner"
import Product from "../../../components/Product"
import Model from "../../../components/Model"
import { useRouter } from "next/router"
import { Pagination, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import dynamic from "next/dynamic"
import SuccessJson from "./success.json"
import { useMudContext } from "../../../lib/Context"
import { Instagram, Share2 } from "lucide-react"

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
      "model":model.asset->{url},
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
    productCode,
    availability,
    title,
    price,
    discount,
    size,
    instock,
    image: { url, lqip },
    model,
    images,
    body,
  },
  mayLikes,
  prods,
  categories,
}) {
  const [showForm, setShowForm] = useState(false)
  const [show3d, setShow3d] = useState(false)
  const { setProducts, setCategories } = useMudContext()
  useEffect(() => {
    setProducts(prods)
    setCategories(categories)
  }, [])
  const discountedPrice = price - discount

  const title1 = `${title} | Arora Mud Art`
  return (
    <div className="Container min-h-[80vh]">
      <Head>
        <title>{title1}</title>
      </Head>
      <Toaster />
      {/*{show3d && <Model url={model.url} setShow3d={setShow3d} />}*/}
      <div className="flex md:gap-10 flex-col md:flex-row">
        <div className="max-w-lg w-full">
          <Swiper
            modules={[Pagination, Keyboard]}
            keyboard
            pagination
            style={{ zIndex: "auto" }}
            className="mx-0!"
            wrapperClass="items-center"
          >
            <div className="flex justify-between items-end z-2 absolute w-full bottom-6">
              {/*  {model ? (
                <button
                  onClick={() => setShow3d(true)}
                  className="btn py-1! px-2!"
                >
                  View 3D
                </button>
              ) : (
                <button></button>
              )}*/}

            </div>
            <SwiperSlide>
              <Image
                priority
                loading="eager"
                className="object-contain w-full bg-[#f4f4f4] cursor-grab active:cursor-grabbing"
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
              images?.map(({ url: slideUrldeUrl, lqip: slideLqip }) => (
                <SwiperSlide key={slideUrldeUrl}>
                  <Image
                    className="object-contain w-full bg-[#f4f4f4] cursor-grab active:cursor-grabbing"
                    sizes="(max-width: 640px) 80vw, 40vw"
                    width={400}
                    height={400}
                    src={slideUrldeUrl}
                    alt={title}
                    placeholder="blur"
                    blurDataURL={slideLqip}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="md:self-start">
          <h1 className="text-black text-2xl">{title}</h1>
          <p className="text-xl my-2">{size}</p>
          <p className="mb-2">${discountedPrice}</p>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(location.href)
              toast.info("Product link copied to clipboard.")
            }}
            className="btn py-1! px-2! mb-4"
          >
            <Share2 fill="white" strokeWidth={1} />
          </button>
          {!showForm ? (
            body && (
              <>
                <PortableText
                  content={body}
                  dataset="production"
                  projectId="5onybuvh"
                  className="mb-4"
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
          {instock && (
            <>
              <p className="text-xl mb-5">Order now on any followings</p>
              <div className="flex flex-wrap gap-5 md:gap-8">
                <a
                  target="_blank"
                  className="btn"
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
                  </svg>
                  WhatsApp
                </a>
                <a
                  target="_blank"
                  className="btn"
                  href="https://www.instagram.com/direct/t/17842822046736295/"
                >
                  <Instagram />
                  Instagram
                </a>
              </div>
            </>
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

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const Success = ({ setShowSuccess, push }) => {
  return (
    <div className="bg-black/70 fixed select-none left-0 top-0 z-50 w-full h-full">
      <div className=" bg-white border border-white/10 fixed w-[calc(100%-2rem)] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5 flex flex-col justify-center items-center z-5">
        <Lottie animationData={SuccessJson} loop={true} />
        <p className=" text-black  text-lg my-5">Order Placed!</p>
        <button
          className="btn self-center!"
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
