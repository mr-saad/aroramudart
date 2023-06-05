import Head from "next/head"
import Router from "next/router"
import { createContext, useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"
import Navbar from "../components/Navbar"
import "../globals.css"
import dynamic from "next/dynamic"

export const Context = createContext()

const Footer = dynamic(() => import("../components/Footer"))

const App = ({ Component, pageProps, router }) => {
  const [minHeight, setMinHeight] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("dark")
    if (isDark === "true") {
      setDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    setMinHeight(innerHeight - document.querySelector("nav").offsetHeight)
  }, [])

  const [loading, setLoading] = useState(false)

  Router.events.on("routeChangeStart", () => {
    setLoading(true)
    setShowSearch(false)
    document.documentElement.classList.remove("over-hide")
  })
  Router.events.on("routeChangeComplete", () => setLoading(false))
  Router.events.on("routeChangeError", () => setLoading(false))

  return (
    <>
      <Head>
        <title>
          Arora Mud Art | Unleashing the Timeless Beauty of Elegance
        </title>
        <link rel="canonical" href="https://aroramudart.vercel.app/" />
        <link
          rel="preload"
          href="/rubik-light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/rubik-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/rubik-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* icons===========================>> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* seo ======================>> */}
        <meta
          name="title"
          content="Arora Mud Art | Unleashing the Timeless Beauty of Elegance"
        />
        <meta
          name="description"
          content="Reflecting the rich cultural heritage of the Kutch region. Explore Arora Mud Art and embrace the harmonious blend of tradition and artistic expression."
        />
        <meta
          name="keywords"
          content="Arora,Mud,Art,Arora Mud Art,arora mud art,Mud Work,Lippan Work,Kutchi Work,Traditional Work,aroramudart,mudart,aroramudart.vercel.app,ovesarora,oves,arora,khatri,handicraft,handmade,handwork"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aroramudart.vercel.app" />
        <meta property="og:title" content="Arora Mud Art" />
        <meta
          property="og:description"
          content="Arora Mud Art Provides Their Customers a Large Number Of Varieties in Mud Work, Lippan Work & Mirror Work"
        />
        <meta
          property="og:image"
          content="/aroramudart-vercel-app-1024x768desktop-2e6ba6.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aroramudart.vercel.app" />
        <meta property="twitter:title" content="Arora Mud Art" />
        <meta
          property="twitter:description"
          content="Arora Mud Art Provides Their Customers a Large Number Of Varieties in Mud Work, Lippan Work & Mirror Work"
        />
        <meta
          property="twitter:image"
          content="/aroramudart-vercel-app-1024x768desktop-2e6ba6.png"
        />
        <meta
          name="google-site-verification"
          content="lBrFwP_GaamILlVDGRzoEvN5aWFGrX0sKu5zttr_T7c"
        />
      </Head>
      <Context.Provider value={{ showSearch, setShowSearch, dark, setDark }}>
        <Navbar />
        <div
          style={{ minHeight }}
          className="main-container md:px-20 px-4 py-3 overflow-hidden"
        >
          {loading ? (
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[calc(100vh-100px)] mx-auto justify-center items-center"
            >
              <PropagateLoader
                size={20}
                color={dark ? "#fff" : "#000"}
                style={{ transform: "translate(-.5rem)" }}
              />
            </div>
          ) : (
            <Component {...pageProps} key={router.route} />
          )}
        </div>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
