import { BsFacebook, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs"
import { AiOutlineInstagram } from "react-icons/ai"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="text-xs mt-20 px-3 md:px-20 py-10 text-white/50 border-t border-white/10 font-[Prompt]">
      <Image
        sizes="(max-width: 540px) 30vw,(max-width: 768px) 100vw,(max-width: 1200px) 50vw"
        alt="Arora Mud Art"
        src={"/AroraMudArtWhite200.png"}
        width={200}
        height={32}
      />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-10 capitalize mt-5">
        <div>
          The Ability to Draw Depends on One's Ability to See the Way An Artist
          Sees
        </div>
        <div>
          mud handicraft Insights from clever artists direct to your inbox
          <br />
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <input
              type="text"
              placeholder="Your E-Mail"
              className="p-2 border w-44 placeholder:text-white/30 border-white/50 bg-transparent outline-none rounded"
            />
            <button type="button" className="btn">
              Submit
            </button>
          </div>
        </div>
        <div>
          <span className="text-white font-semibold">FOLLOW US</span>
          <div className="flex flex-col gap-4 mt-3">
            <a
              className="flex items-center gap-2 hover:text-white transition"
              href="https://facebook.com"
            >
              <BsFacebook size={30} /> Arora Mud Art
            </a>
            <a
              className="flex items-center gap-2 hover:text-white transition"
              href="https://instagram.com/arora_mud_art"
            >
              <AiOutlineInstagram size={30} /> @aroramudart
            </a>
          </div>
        </div>
        <div>
          <span className="text-white font-semibold">CONTACT US</span>
          <div className="flex flex-col gap-4">
            <a
              className="flex items-center mt-3 hover:text-white transition"
              href="tel:919979672226"
            >
              <BsFillTelephoneFill size={22} className="mr-3" />
              +91 9979672226
            </a>
            <a
              className="flex items-center gap-2 hover:text-white transition"
              href="https://wa.me/919979672226"
            >
              <BsWhatsapp size={30} /> +91 9979672226
            </a>
          </div>
        </div>
      </div>
      <hr className="my-10 border-white/10" />
      <div className="flex md:flex-row flex-col gap-5 justify-between">
        <div>
          &copy;Arora Mud Art. Mud Handicraft Store, Bhuj-Kutchh, Gujarat-India.
          {new Date().getFullYear()}
        </div>
        <div>
          <span className="mr-2">Terms & Conditions</span>

          <span>Privacy Policy</span>
        </div>
      </div>
      {/* <div className="flex justify-center gap-7 flex-wrap">
        <a className="flex items-center" href="tel:9979672226">
          <BsFillTelephoneFill size={22} className="mr-3" />
          +91 9979672226
        </a>
        <a
          className="flex items-center"
          href="https://wa.me/919979672226?text=Hello"
        >
          <BsWhatsapp className="mr-3" size={22} />
          +91 9979672226
        </a>
        <a
          target="_blank"
          className="flex items-center"
          href="https://instagram.com/arora_mud_art"
        >
          <BsInstagram className="mr-3" size={22} />
          @arora_mud_art
        </a>
      </div>

      <h1 className="text-4xl font-[Satisfy] my-10">Arora Mud Art</h1>
      <p className="opacity-60">All Rights Reserved &copy;AroraMudArt.2022</p> */}
    </footer>
  )
}

export default Footer
