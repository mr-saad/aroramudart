import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link
      className="cursor-pointer overflow-hidden capitalize relative rounded-md"
      href={`/products/${slug}`}
    >
      <Image
        sizes="(max-width: 768px) 40vw, 33vw"
        className="w-full h-full aspect-square object-cover select-none"
        placeholder="blur"
        blurDataURL={lqip}
        width={400}
        height={400}
        src={url}
        alt={slug}
      />

      <div className="px-3 absolute inset-0 bg-gradient-to-b from-transparent to-black flex items-end">
        <h2 className="text-white font-semibold">{title}</h2>
      </div>
    </Link>
  )
}

export default Product
