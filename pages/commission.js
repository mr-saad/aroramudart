import Image from "next/image"

export default function Commission() {
  return (
    <div>
      {/* <h1>Commission</h1> */}
      <div className="grid md:grid-cols-2 md:gap-15 gap-5 max-w-4xl mx-auto md:mt-10">
        <Image
          src="/commission.jpg"
          width={500}
          height={500}
          className="w-full md:aspect-square object-cover object-bottom"
        />
        <div>
          <h2 className="text-black text-xl uppercase">
            Tell Us Your Needs & We're On It
          </h2>
          <p className="my-4">
            Would you like to commission a custom painting based on your own
            image? I am always open to commissions and ready to create something
            special for you.
          </p>
          <p>
            Looking for a personalized piece of art that reflects your story,
            culture, or space? We offer custom mud art and painting made with
            love, precision, and a deep respect for tradition.
          </p>
        </div>
      </div>
    </div>
  )
}
