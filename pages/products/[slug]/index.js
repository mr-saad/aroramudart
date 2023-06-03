import PortableText from "react-portable-text"
import { BiArrowBack } from "react-icons/bi"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

const Product = ({
  product: {
    title,
    price,
    image: { url, lqip },
    body,
    desc,
    slug,
  },
}) => {
  const { back } = useRouter()
  const title1 = `${title} | Arora Mud Art`
  return (
    <div className="max-w-4xl md:mt-10 mb-20 mx-auto text-xs px-1">
      <Head>
        <title>{title1}</title>
      </Head>
      <button onClick={() => back()} className="inline-block mb-2 btn">
        <BiArrowBack className="text-[#f00]" size={18} />
      </button>
      <div className="flex gap-10 flex-col md:items-center md:flex-row capitalize">
        <div className="md:flex-1">
          <Image
            className="rounded-md object-contain"
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
        </div>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-white/80">{title}</h1>
          <p className="text-white/50 break-all">{desc}</p>
          <p className="font-semibold text-white/80">Price: ₹{price}</p>
          <p className="text-base font-semibold text-white/80 mt-5">
            Details :
          </p>
          {body && (
            <PortableText
              className="text-white/50 leading-6 text-xs"
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
    </div>
  )
}

export default Product

import sanity from "../../../components/sanityClient"
import { useRouter } from "next/router"

export const getStaticPaths = async () => {
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
  const product = await sanity.fetch(
    `*[slug.current==$slug][0]{
      title,
      "slug":slug.current,
      desc,
      price,
      body,
      "image":mainImage.asset->{url,"lqip":metadata.lqip}
    }`,
    { slug }
  )

  return {
    props: { product },
    revalidate: 1,
  }
}
