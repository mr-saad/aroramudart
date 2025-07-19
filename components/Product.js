import Image from "next/image"
import Link from "next/link"

const Product = ({ slug, image: { url, lqip }, title, size, price }) => {
  return (
    <Link className="uppercase group relative" href={`/products/${slug}`}>
      <div className="overflow-hidden flex justify-center items-center aspect-square bg-[#f4f4f4]">
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

      <div className="p-3 text-center">
        <h2 className="text-black">{title}</h2>
        <p className="my-3 text-sm">{size}</p>
        <p className="text-sm">₹{price}</p>
      </div>
    </Link>
  )
}

export default Product
