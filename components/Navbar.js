import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BsMoonFill, BsSearch } from "react-icons/bs"
import { VscClose } from "react-icons/vsc"
import { Context } from "../pages/_app"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { route } = useRouter()

  useEffect(() => {
    document.documentElement.classList.toggle("over-hide", open)
  }, [open])

  const { showSearch, setShowSearch, dark, setDark } = useContext(Context)

  useEffect(() => {
    ;[...document.querySelectorAll(".nav-link")].forEach((link) => {
      link.onclick = () => {
        document.documentElement.classList.remove("over-hide")
        setOpen(false)
      }
    })
  }, [])

  return (
    <nav className="px-3 font-semibold z-[3] md:px-20 py-4 flex justify-between bg-[#f28c28] text-black/60 dark:text-white/60 md:dark:text-black/60 items-center border-b border-white/20 ">
      <Link href="/">
        <Image
          quality={100}
          priority={true}
          sizes="(max-width: 540px) 40vw,
                 (max-width: 768px) 60vw,
                 (max-width: 1200px) 80vw
                 "
          alt="Arora Mud Art"
          src={"/AroraMudArtBlack200.png"}
          width={200}
          height={32}
        />
      </Link>
      {route === "/products" ? (
        showSearch === true ? (
          <VscClose
            onClick={() => {
              setShowSearch(false)
              document.documentElement.classList.remove("over-hide")
            }}
            size={25}
            color={"#000"}
            className="ml-auto mr-5 cursor-pointer"
          />
        ) : (
          <BsSearch
            size={22}
            color={"#000"}
            onClick={() => {
              setShowSearch(true)
              document.documentElement.classList.add("over-hide")
            }}
            className="ml-auto mr-5 cursor-pointer"
          />
        )
      ) : null}

      <div
        className="md:hidden flex flex-col justify-between gap-2 z-20"
        onClick={() => {
          setOpen((prev) => !prev)
        }}
      >
        <span
          className={`bg-black rounded-md h-[2px] w-8 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] origin-left ${
            open && "!w-[28px] rotate-45 dark:!bg-white"
          }`}
        ></span>
        <span
          className={`bg-black rounded-md h-[2px] w-6 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            open && "opacity-0 dark:!bg-white"
          }`}
        ></span>
        <span
          className={`bg-black rounded-md h-[2px] w-4 transition-all duration-100 ease-[cubic-bezier(0.85,0,0.15,1)] origin-left ${
            open && "!w-[28px] -rotate-45 dark:!bg-white"
          }`}
        ></span>
      </div>

      <ul
        className={`z-[19] flex flex-col gap-10 p-5 pt-20 fixed transition-all duration-100 w-full h-full top-0 right-0 dark:bg-[#222] md:dark:bg-[#f28c28] bg-[#f28c28] overflow-hidden md:items-center md:p-0 md:static md:flex-row md:w-auto md:h-auto md:bg-transparent ${
          open ? "ulOpen" : "ulClose"
        }`}
      >
        <Link
          href="/"
          className={`nav-link transition-all duration-200 ${
            route === "/" &&
            "text-black dark:text-white md:dark:text-black font-bold"
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`nav-link transition-all duration-200 ${
            route.includes("/products") &&
            "text-black dark:text-white md:dark:text-black font-bold"
          }`}
        >
          Products
        </Link>
        <Link
          href="/contact"
          className={`nav-link transition-all duration-200 ${
            route === "/contact" &&
            "text-black dark:text-white md:dark:text-black font-bold"
          }`}
        >
          Contact
        </Link>
        <Link
          href="/about"
          className={`nav-link transition-all duration-200 ${
            route === "/about" &&
            "text-black dark:text-white md:dark:text-black font-bold"
          }`}
        >
          About
        </Link>
        <p>
          {dark ? (
            <LuSun
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setDark(false)
                localStorage.setItem("dark", null)
                document.documentElement.classList.remove("dark")
              }}
            />
          ) : (
            <BsMoonFill
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setDark(true)
                localStorage.setItem("dark", true)
                document.documentElement.classList.add("dark")
              }}
            />
          )}
        </p>
      </ul>
    </nav>
  )
}

export default Navbar
