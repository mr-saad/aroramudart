import Image from "next/image"
import Link from "next/link"

const Product = ({
  slug,
  image: { url, lqip },
  title,
  desc,
  price,
  discount,
  discountedPrice,
}) => {
  return (
    <Link
      scroll={true}
      className="cursor-pointer overflow-hidden bg-white/10 capitalize rounded-md"
      href={`/products/${slug}`}
    >
      <Image
        loading="lazy"
        sizes="(max-width: 540px) 40vw,
                (max-width: 768px) 60vw,
                (max-width: 1200px) 80vw"
        quality={30}
        className="w-full aspect-video object-contain select-none"
        placeholder="blur"
        blurDataURL={lqip}
        width={200}
        height={200}
        src={url}
        alt={slug}
      />
      <div className="p-2 md:p-5 text-white/50 text-xs">
        <h2 className="text-sm text-white/80 font-semibold">{title}</h2>
        <p>{desc}</p>
        <s>₹{price}</s> -{" "}
        <span className="bg-red-700 px-2 py-[2px] text-white rounded-md inline-block my-1">
          {discount}% OFF
        </span>
        <p className="text-sm">₹{discountedPrice}</p>
      </div>
    </Link>
  )
}

export default Product
