import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title }) => {
  return (
    <Link className="uppercase relative" href={`/products/${slug}`}>
      <div className="overflow-hidden group flex justify-center items-center aspect-square bg-[#f4f4f4]">
        <Image
          sizes="(max-width: 768px) 40vw, 33vw"
          className="w-[70%] drop-shadow-lg shadow-black/20 will-change-transform object-contain select-none group-hover:scale-105 transition-transform duration-1000 ease-out"
          placeholder="blur"
          blurDataURL={lqip}
          width={400}
          height={400}
          src={url}
          alt={slug}
        />
      </div>

      <div className="p-3 text-center text-[14px]">
        <h2 className="">{title}</h2>
      </div>
    </Link>
  )
}

export default Product
