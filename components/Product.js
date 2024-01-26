import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link
      className="cursor-pointer overflow-hidden text-center capitalize"
      href={`/products/${slug}`}
    >
      <Image
        sizes="(max-width: 768px) 40vw, 33vw"
        className="w-full object-cover select-none rounded-md"
        placeholder="blur"
        blurDataURL={lqip}
        width={400}
        height={400}
        src={url}
        alt={slug}
      />

      <h2 className="px-3 pt-2 md:px-5 text-sm text-[#0c0908] dark:text-white font-semibold">
        {title}
      </h2>
    </Link>
  )
}

export default Product
