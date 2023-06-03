import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { VscClose } from "react-icons/vsc"
import { Context } from "../pages/_app"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { route } = useRouter()

  const { showSearch, setShowSearch } = useContext(Context)

  useEffect(() => {
    ;[...document.querySelectorAll(".nav-link")].forEach((link) => {
      link.onclick = () => {
        document.documentElement.classList.remove("over-hide")
        setOpen(false)
      }
    })
  }, [])

  return (
    <nav className="px-3 font-semibold z-[3] md:px-20 py-4 flex justify-between items-center border-b border-white/20 ">
      <Link href="/">
        <Image
          priority={true}
          sizes="(max-width: 540px) 40vw,
                 (max-width: 768px) 60vw,
                 (max-width: 1200px) 80vw
                 "
          alt="Arora Mud Art"
          src={"/AroraMudArtWhite200.png"}
          width={200}
          height={32}
        />
      </Link>
      {route.includes("/products") ? (
        showSearch === true ? (
          <VscClose
            onClick={() => {
              setShowSearch(false)
              document.documentElement.classList.remove("over-hide")
            }}
            size={25}
            color="#fff"
            className="ml-auto mr-5 cursor-pointer"
          />
        ) : (
          <BsSearch
            size={22}
            color="#fff"
            onClick={() => {
              setShowSearch(true)
              document.documentElement.classList.add("over-hide")
            }}
            className="ml-auto mr-5 cursor-pointer"
          />
        )
      ) : null}

      <div
        className="md:hidden flex flex-col justify-between overflow-hidden gap-2 z-20"
        onClick={() => {
          setOpen((prev) => !prev)
          document.documentElement.classList.toggle("over-hide")
        }}
      >
        <span
          className={`bg-white rounded-md h-[2px] w-8 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] origin-left ${
            open && "!w-[28px] rotate-45"
          }`}
        ></span>
        <span
          className={`bg-white rounded-md h-[2px] w-6 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            open && "translate-x-12 opacity-0"
          }`}
        ></span>
        <span
          className={`bg-white rounded-md h-[2px] w-4 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] origin-left ${
            open && "!w-[28px] -rotate-45"
          }`}
        ></span>
      </div>

      <ul
        className={`z-[19] flex flex-col gap-10 p-5 pt-20 fixed transition-all duration-100 w-full h-full top-0 right-0 bg-[#222222] text-white/60 overflow-hidden md:p-0 md:static md:flex-row md:w-auto md:h-auto md:bg-transparent ${
          open ? "ulOpen" : "ulClose"
        }`}
      >
        <Link
          href="/"
          className={`nav-link transition-all duration-200 ${
            route === "/" && "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`nav-link transition-all duration-200 ${
            route.includes("/products") && "text-white"
          }`}
        >
          Products
        </Link>
        <Link
          href="/contact"
          className={`nav-link transition-all duration-200 ${
            route === "/contact" && "text-white"
          }`}
        >
          Contact
        </Link>
        <Link
          href="/about"
          className={`nav-link transition-all duration-200 ${
            route === "/about" && "text-white"
          }`}
        >
          About
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
