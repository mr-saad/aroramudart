import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link
      className="cursor-pointer overflow-hidden text-center capitalize rounded-md"
      href={`/products/${slug}`}
    >
      <Image
        loading="lazy"
        sizes="(max-width: 540px) 40vw,
                (max-width: 768px) 60vw,
                (max-width: 1200px) 80vw"
        quality={30}
        className="w-full aspect-square object-contain select-none"
        placeholder="blur"
        blurDataURL={lqip}
        width={200}
        height={200}
        src={url}
        alt={slug}
      />
      <div className="p-3 md:p-5 text-xs">
        <h2 className="text-sm text-black dark:text-white font-semibold">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default Product
