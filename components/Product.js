import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link className="uppercase relative " href={`/products/${slug}`}>
      <div className="overflow-hidden">
        <Image
          sizes="(max-width: 768px) 40vw, 33vw"
          className="w-full aspect-square  will-change-transform object-cover select-none hover:scale-105 transition-transform duration-500 ease-out"
          placeholder="blur"
          blurDataURL={lqip}
          width={400}
          height={500}
          src={url}
          alt={slug}
        />
      </div>

      <div className="p-3 text-center text-[14px]">
        <h2 className="font-semibold">{title}</h2>
      </div>
    </Link>
  )
}

export default Product
