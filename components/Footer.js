import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-20 px-4 md:px-20 py-10 border-t border-gray-200">
      <div className="grid gap-5">
        <details className="group">
          <summary className="text-black flex justify-between items-center cursor-pointer">
            NEWSLETTER
            <span className="text-2xl group-open:rotate-45 will-change-transform transition-transform select-none">
              +
            </span>
          </summary>
          <p>
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
        </details>
        <details className="group">
          <summary className="text-black flex justify-between items-center cursor-pointer">
            FOLLOW US
            <span className="text-2xl group-open:rotate-45 will-change-transform transition-transform select-none">
              +
            </span>
          </summary>
          <div className="flex flex-col gap-4 mt-3">
            <a
              className="flex items-center gap-2  hover:text-black transition"
              href="https://facebook.com"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>{" "}
              Arora Mud Art
            </a>
            <a
              className="flex items-center gap-2  hover:text-black transition"
              href="https://instagram.com/arora_mud_art"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>{" "}
              @aroramudart
            </a>
          </div>
        </details>
        <details className="group">
          <summary className="text-black flex justify-between items-center cursor-pointer">
            CONTACT US
            <span className="text-2xl group-open:rotate-45 will-change-transform transition-transform select-none">
              +
            </span>
          </summary>
          <div className="flex flex-col gap-4">
            <a
              className="flex gap-2 items-center mt-3 hover:text-black transition"
              href="tel:919979672226"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              +91 9979672226
            </a>
            <a
              className="flex items-center gap-2  hover:text-black transition"
              href="https://wa.me/919979672226"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                ></path>
              </svg>{" "}
              +91 9979672226
            </a>
          </div>
        </details>
      </div>
      <hr className="my-10 border-gray-200" />
      <div className="flex md:flex-row flex-col gap-2 justify-between text-balance">
        <p>
          &copy;Arora Mud Art {new Date().getFullYear()}, Mud Handicraft Store
        </p>
        <p>
          <Link
            className=" hover:text-black transition"
            href="/terms-conditions"
          >
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link className=" hover:text-black transition" href="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
