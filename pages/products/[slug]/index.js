import PortableText from "react-portable-text"
import { BiArrowBack } from "react-icons/bi"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Product from "../../../components/Product"
import { useRouter } from "next/router"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

const DynamicProduct = ({
  product: {
    title,
    price,
    discount,
    image: { url, lqip },
    images,
    body,
    slug,
  },
  mayLikes,
}) => {
  const discountedPrice = price - discount

  const { back } = useRouter()
  const title1 = `${title} | Arora Mud Art`
  return (
    <div className="max-w-4xl md:mt-10 mb-20 mx-auto text-base px-1">
      <Head>{<title>{title1}</title>}</Head>
      <button onClick={() => back()} className="inline-block mb-2 btn">
        <BiArrowBack size={18} />
      </button>
      <div className="flex gap-10 flex-col md:items-center md:flex-row capitalize">
        <Swiper
          modules={[Pagination]}
          pagination={{ type: "progressbar" }}
          className="md:flex-1 w-full max-w-[400px]"
        >
          <SwiperSlide>
            <Image
              className="rounded-md aspect-square object-contain"
              sizes="(max-width: 540px) 40vw,
            (max-width: 768px) 60vw,
            (max-width: 1200px) 80vw"
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
                  className="rounded-md object-contain aspect-square"
                  sizes="(max-width: 540px) 40vw,
              (max-width: 768px) 60vw,
              (max-width: 1200px) 80vw"
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
          <span>₹{discountedPrice} </span>
          <s>₹{price}</s>
          <br />
          <span className="bg-green-600 text-white py-1 px-2 rounded-md">
            SAVE ₹{discount}
          </span>
          {body && (
            <PortableText
              className="leading-6 text-sm mt-5"
              content={body}
              dataset="production"
              projectId="5onybuvh"
            />
          )}
          <Link
            className="btn mt-2 inline-block"
            href={`/products/${slug}/book`}
          >
            Book Now
          </Link>
        </div>
      </div>

      {mayLikes.length !== 0 && (
        <div className="mt-20">
          <h1 className="heading mb-5">You May Also Like</h1>
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
              <SwiperSlide>
                <Product key={props.slug} {...props} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default DynamicProduct

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
      mayLikes,
    },
    revalidate: 1,
  }
}
