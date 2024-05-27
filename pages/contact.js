import { ValidationError, useForm } from "@formspree/react"
import { useRouter } from "next/router"
import Image from "next/image"

const Contact = () => {
  const [state, Submit] = useForm("meqnlkpn")

  const { push } = useRouter()

  return (
    <div className="leading-relaxed mt-5">
      {state.submitting && (
        <div className="p-5 z-[5] fixed dark:bg-[#111] bg-[#ddd] text-4xl font-semibold dark:text-white text-[#0c0908] inset-0 flex justify-center items-center">
          Please Wait
        </div>
      )}
      {state.succeeded && (
        <div className="fixed inset-0 text-[#0c0908] dark:bg-[#111] bg-[#ddd] z-[5] flex flex-col justify-center items-center text-center gap-4 px-5">
          <p className="dark:text-white text-4xl">Your Message is Sent!</p>
          <p>We'll Try Respond As Soon As Possible</p>
          <button
            onClick={() => push("/")}
            className="btn !self-center !border-white"
          >
            Got It
          </button>
        </div>
      )}
      <p className="mb-">
        We would love to hear from you! Feel free to reach out to us using any
        of the following methods:
      </p>
      <ul className="mb-5">
        <li>
          Email :{" "}
          <a
            className="border-b dark:text-white text-[#0c0908]"
            href="mailto:aroramudartbhuj@gmail.com"
          >
            aroramudartbhuj@gmail.com
          </a>
        </li>
        <li>
          Instagram:{" "}
          <a
            className="border-b dark:text-white text-[#0c0908]"
            href="https://instagram.com/arora_mud_art"
          >
            @arora_mud_art
          </a>
        </li>
        <li>
          Facebook :{" "}
          <a
            href="https://facebook.com"
            className="border-b dark:text-white text-[#0c0908]"
          >
            aroramudart
          </a>
        </li>
        <li>
          Whatsapp :{" "}
          <a
            className="border-b dark:text-white text-[#0c0908]"
            href="https://wa.me/919979692226"
          >
            +91 99796 62226
          </a>
        </li>
        <li>
          Phone :{" "}
          <a
            className="border-b dark:text-white text-[#0c0908]"
            href="tel:919979662226"
          >
            +91 99796 62226
          </a>
        </li>
      </ul>
      <p className="mb-5">
        For any inquiries, questions, or feedback regarding our mud art
        creations, customization requests, or order information, please don't
        hesitate to get in touch. Our dedicated team is here to assist you and
        provide the information you need.
      </p>
      <p className="mb-5">
        We value your input and look forward to hearing from you. Whether you're
        an art enthusiast, a potential customer, or someone with a general
        interest in our work, we appreciate your interest in Arora Mud Art. Your
        support means a lot to us, and we're excited to assist you in any way we
        can.
      </p>
      <p className="mb-5">
        Thank you for choosing Arora Mud Art. We are dedicated to providing you
        with exceptional mud artworks that bring nature's beauty into your
        surroundings.
      </p>
      <div className="flex flex-col gap-10 md:flex-row">
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
          <form onSubmit={Submit}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              className="input_text"
              id="username"
              required
            />
            <label htmlFor="email">E-Mail</label>
            <input
              name="email"
              type="email"
              className="input_text"
              id="email"
            />
            <label htmlFor="mobile">Mobile</label>
            <input
              name="mobile"
              type="tel"
              maxLength={10}
              minLength={10}
              className="input_text"
              id="mobile"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
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
    </div>
  )
}

export default Contact
