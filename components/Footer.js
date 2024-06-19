import { BsFacebook, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs"
import { AiOutlineInstagram } from "react-icons/ai"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-20 px-4 md:px-20 py-10 border-t bg-[#e6e6e6] dark:bg-transparent dark:border-white/10">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-10">
        <p className="text-[#0c0908] dark:text-white">
          The Ability to draw depends on One's ability to see the way an Artist
          sees.
        </p>
        <div>
          <p className="text-[#0c0908] dark:text-white">
            Mud handicraft insights from clever artists direct to your inbox
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <input
              type="text"
              placeholder="Your E-Mail"
              className="input_text !mb-0 !w-auto"
            />
            <button type="button" className="btn">
              Submit
            </button>
          </div>
        </div>
        <div>
          <span className="dark:text-white text-[#0c0908] font-semibold">
            FOLLOW US
          </span>
          <div className="flex flex-col gap-4 mt-3">
            <a
              className="flex items-center gap-2 dark:hover:text-white hover:text-[#0c0908] transition"
              href="https://facebook.com"
            >
              <BsFacebook size={30} /> Arora Mud Art
            </a>
            <a
              className="flex items-center gap-2 dark:hover:text-white hover:text-[#0c0908] transition"
              href="https://instagram.com/arora_mud_art"
            >
              <AiOutlineInstagram size={30} /> @aroramudart
            </a>
          </div>
        </div>
        <div>
          <span className="dark:text-white text-[#0c0908] font-semibold">
            CONTACT US
          </span>
          <div className="flex flex-col gap-4">
            <a
              className="flex items-center mt-3 dark:hover:text-white hover:text-[#0c0908] transition"
              href="tel:919979672226"
            >
              <BsFillTelephoneFill size={22} className="mr-3" />
              +91 9979672226
            </a>
            <a
              className="flex items-center gap-2 dark:hover:text-white hover:text-[#0c0908] transition"
              href="https://wa.me/919979672226"
            >
              <BsWhatsapp size={30} /> +91 9979672226
            </a>
          </div>
        </div>
      </div>
      <hr className="my-10 border-zinc-400 dark:border-white/10" />
      <div className="flex md:flex-row flex-col gap-2 justify-between text-balance">
        <p>
          &copy;Arora Mud Art {new Date().getFullYear()}, Mud Handicraft Store,
          Bhuj - Kachchh, Gujarat
        </p>
        <p>
          <Link
            className="dark:hover:text-white hover:text-[#0c0908] transition"
            href="/terms-conditions"
          >
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link
            className="dark:hover:text-white hover:text-[#0c0908] transition"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
