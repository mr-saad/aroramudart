import { ValidationError, useForm } from "@formspree/react"
import { useRouter } from "next/router"
import Image from "next/image"

const Contact = () => {
  const [state, Submit] = useForm("meqnlkpn")

  const { push } = useRouter()

  return (
    <div className="flex flex-col text-xs md:text-sm leading-6">
      {state.submitting && (
        <div className="p-5 z-[5] fixed dark:bg-[#222222] bg-[#f28c28] text-4xl font-semibold dark:text-white text-black inset-0 flex justify-center items-center">
          Please Wait
        </div>
      )}
      {state.succeeded && (
        <div className="fixed inset-0 dark:bg-[#222222] bg-[#f28c28] z-[5] flex flex-col justify-center items-center text-center gap-4 px-5">
          <p className="dark:text-white text-black text-4xl">
            Your Message is Sent!
          </p>
          <p>We'll Try Respond As Soon As Possible</p>
          <button onClick={() => push("/")} className="btn !self-center">
            Got It
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        We would love to hear from you! Feel free to reach out to us using any
        of the following methods: <br />
        <div className="leading-6">
          Email :{" "}
          <a
            className="border-b dark:border-white/50"
            href="mailto:aroramudartbhuj@gmail.com"
          >
            aroramudartbhuj@gmail.com
          </a>
          <br />
          Instagram:{" "}
          <a
            className="border-b dark:border-white/50"
            href="https://instagram.com/arora_mud_art"
          >
            @arora_mud_art
          </a>
          <br />
          Facebook :{" "}
          <a
            href="https://facebook.com"
            className="border-b dark:border-white/50"
          >
            aroramudart
          </a>
          <br />
          Whatsapp :{" "}
          <a
            className="border-b dark:border-white/50"
            href="https://wa.me/919979692226"
          >
            +91 99796 62226
          </a>
          <br />
          Phone :{" "}
          <a className="border-b dark:border-white/50" href="tel:919979662226">
            +91 99796 62226
          </a>
        </div>
        <br />
        <p>
          For any inquiries, questions, or feedback regarding our mud art
          creations, customization requests, or order information, please don't
          hesitate to get in touch. Our dedicated team is here to assist you and
          provide the information you need.
        </p>
        <div className="flex flex-col gap-5 md:flex-row my-10 md:my-28">
          <Image
            width={500}
            height={500}
            src="/contactSvg.svg"
            className="md:w-1/2 lg:w-1/3 flex-1"
            alt="Contact at Arora Mud Art"
          />
          <div className="flex-1 mt-5 md:mt-0 md:w-1/2">
            <div className="text-red-700 my-5 capitalize">
              <ValidationError
                field="email"
                prefix="Invalid E-Mail:"
                errors={state.errors}
              />
              <ValidationError
                field="mobile"
                prefix="Mobile"
                errors={state.errors}
              />
            </div>
            <form onSubmit={Submit} autoComplete="off">
              <label className="block">Username</label>
              <input
                name="username"
                type="text"
                className="input_text"
                required
              />
              <label className="block">E-Mail</label>
              <input
                name="email"
                type="email"
                className="input_text"
                required
              />
              <label className="block ">Mobile</label>
              <input
                name="mobile"
                type="tel"
                maxLength={10}
                minLength={10}
                className="input_text"
                required
              />
              <label className="block">Message</label>
              <textarea
                name="message"
                required
                className="input_text resize-none overflow-y-auto"
              ></textarea>
              <button
                disabled={state.submitting}
                type="submit"
                className="btn disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <p>
          We value your input and look forward to hearing from you. Whether
          you're an art enthusiast, a potential customer, or someone with a
          general interest in our work, we appreciate your interest in Arora Mud
          Art. Your support means a lot to us, and we're excited to assist you
          in any way we can.
        </p>
        <br />
        <p>
          Thank you for choosing Arora Mud Art. We are dedicated to providing
          you with exceptional mud artworks that bring nature's beauty into your
          surroundings.
        </p>
      </div>
    </div>
  )
}

export default Contact
