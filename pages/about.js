import Image from "next/image"

const steps = [
  {
    img: "/step-1.jpeg",
    title: "Making dough",
    text: " The mud is mostly from Bhuj, which is golden brown in color which is perfect for the art, The dough is kneaded for a uniform texture.",
  },
  {
    img: "/step-1.jpeg",
    title: "Shaping dough",
    text: "The artisan then takes tiny portions of the dough to give them a cylindrical shape of varying thickness. He does so by rolling the dough on the floor, or, in between the palms.",
  },
  {
    title: "Drawing Motifs",
    text: "The wooden panel is marked with outlines according to the desired design. The cylindrical shapes made from dough is used to outline the design which define the framework of the craft.",
    img: "/step-1.jpeg",
  },
  {
    title: "Embedding Mirrors",
    text: "The fourth step is to embed the mirrors and sequins in the motifs and patterns drawn. The mirrors used for the decoration are called  aabhla. They come in myriad shapes including round, diamond, and triangular.",
    img: "/step-1.jpeg",
  },
  {
    title: "Clay Painting",
    text: "In the last step, the dried clay is coated with white clay from the salty marshland. It can be left white/mud color or bright colours can be painted , but many artisans keep it in the color of mud to keep it real.",
    img: "/step-1.jpeg",
  },
  {
    title: "Drying Clay",
    text: "The fifth step is to dry the clay. The artwork is left to dry in the sun for about 3 to 5 days. During this period of drying, the clay hardens and becomes a strong surface.",
    img: "/step-1.jpeg",
  },
]

const About = () => {
  return (
    <div className="text-xs leading-6 mt-5">
      <div className="max-w-4xl mx-auto">
        <h2
          className="heading mb-2
        "
        >
          Welcome to Arora Mud Art!
        </h2>
        <p>
          At Arora Mud Art, we are passionate about creating unique and
          exquisite artworks using mud as our primary medium. Our aim is to
          bring the beauty of nature into your living spaces through our
          carefully handcrafted mud art pieces. With a perfect blend of
          creativity, craftsmanship, and a touch of earthiness, we create
          stunning artworks that resonate with both aesthetics and
          sustainability. <br /> <br />
          Through our social media channels, we provide a glimpse into our
          artistic journey and showcase our latest creations. Follow us on
          Instagram (@arora_mud_art) and like our Facebook page (aroramudart) to
          stay updated with our latest artworks, behind-the-scenes insights, and
          upcoming exhibitions.
        </p>
        <div className="flex md:flex-row flex-col gap-10 mt-10 mb-28 items-center">
          <div>
            <h2 className="heading">Tracing the Craft</h2>
            <p className="mt-2">
              Mud work is one of the oldest crafts of the Kutch region. From mud
              work paintings, exclusive potteries to terracotta this place has
              offered all of it. Lippan Kaam is the traditional mural craft of
              Kutch that can be traced back to centuries when this craft was
              used to strengthen mud houses for prevention against natural
              calamities.
            </p>
          </div>
          <Image
            sizes="(max-width: 540px) 40vw,
            (max-width: 768px) 60vw,
            (max-width: 1200px) 80vw"
            className="rounded-full aspect-square object-cover object-left"
            src="/oves.jpg"
            alt="ovesaorora"
            width={300}
            height={300}
          />
        </div>

        <h1 className="heading mb-10">Steps to MudWork</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((all) => {
            return (
              <div
                key={all.title}
                className="rounded-md dark:bg-white/10 bg-gray-100 border"
              >
                <Image
                  sizes="(max-width: 540px) 40vw,
                (max-width: 768px) 60vw,
                (max-width: 1200px) 80vw
                "
                  quality={30}
                  width={500}
                  height={500}
                  src={all.img}
                  alt={all.title}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-5">
                  <h1 className="dark:text-white text-black text-sm mb-2 font-semibold">
                    {all.title}
                  </h1>
                  <p>{all.text}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-10">
          If you have any questions, custom order inquiries, or simply want to
          connect with us, please don't hesitate to reach out. You can contact
          us via email at{" "}
          <a
            className="border-b dark:border-white/50"
            href="mailto:aroramudartbhuj@gmail.com"
          >
            aroramudartbhuj@gmail.com
          </a>
          , through Whatsapp at{" "}
          <a
            className="border-b dark:border-white/50"
            href="https://wa.me/91997962226"
          >
            +91 997962226
          </a>
          , or by calling us directly at{" "}
          <a className="border-b dark:border-white/50" href="tel:919979662226">
            {" "}
            +91 9979662226
          </a>
          . We value your feedback and are always excited to hear from art
          enthusiasts like you. <br />
          <br />
          Thank you for visiting Arora Mud Art. We look forward to sharing the
          beauty and creativity of our mud artworks with you, and we hope our
          pieces bring a touch of natural elegance into your surroundings.
        </p>
      </div>
    </div>
  )
}

export default About
