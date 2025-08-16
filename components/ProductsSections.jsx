import Link from "next/link"
import Product from "./Product"

export default function Section({ title, prods }) {
  return (
    <div className="mx-auto grid justify-items-center uppercase mt-15">
      <h1 className="heading text-center mb-10">{title}</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
        {prods && prods.map((all) => <Product key={all.slug} {...all} />)}
      </div>

      <Link className="btn inline-block  mt-5" href={"/products"}>
        View More
      </Link>
    </div>
  )
}
