import Link from "next/link"
import Product from "./Product"

export default function Section({ title, index, prods }) {
  return prods.length > 0 ? (
    <div id={index === 0 ? "creations" : null} className="Container grid justify-items-center uppercase mt-15">
      <h1 className="heading text-center mb-5 md:mb-0">{title}</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
        {prods.map((all) => (
          <Product key={all.slug} {...all} />
        ))}
      </div>

      <Link className="btn inline-block mt-10" href={"/products"}>
        View More
      </Link>
    </div>
  ) : null
}
