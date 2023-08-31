import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link
      className="cursor-pointer overflow-hidden text-center capitalize"
      href={`/products/${slug}`}
    >
      <Image
        priority={false}
        sizes="(max-width: 540px) 40vw,
                (max-width: 768px) 60vw,
                (max-width: 1200px) 80vw"
        className="w-full object-contain select-none rounded-md"
        placeholder="blur"
        blurDataURL={lqip}
        width={400}
        height={400}
        src={url}
        alt={slug}
      />

      <h2 className="p-3 md:p-5 text-sm text-black dark:text-white font-semibold">
        {title}
      </h2>
    </Link>
  )
}

export default Product
