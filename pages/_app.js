import Head from "next/head"
import { createContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import "../globals.css"
import dynamic from "next/dynamic"
import { ThemeProvider, useTheme } from "next-themes"

export const Context = createContext()

const Footer = dynamic(() => import("../components/Footer"))

const App = ({ Component, pageProps }) => {
  const { setTheme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("theme")
    if (isDark === "dark") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          Arora Mud Art | Unleashing the Timeless Beauty of Elegance
        </title>
        <link rel="canonical" href="https://aroramudart.vercel.app/" />
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
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        />
        {/* icons===========================>> */}
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
        <meta name="theme-color" content="#0c0908" />
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
      <ThemeProvider defaultTheme="light" attribute="class">
        <Context.Provider value={{ showSearch, setShowSearch, setTheme }}>
          <Navbar />
          <div className="md:px-20 px-4 py-3 overflow-hidden max-w-4xl mx-auto">
            <Component {...pageProps} />
          </div>
          <Footer />
        </Context.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
