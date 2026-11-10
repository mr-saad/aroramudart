import Head from "next/head"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../globals.css"
import { ReactLenis } from "lenis/react"
import { Context } from "../lib/Context"

const App = ({ Component, pageProps }) => {
  const [products, setProducts] = useState([])
  const [offers, setOffers] = useState([])
  const [categories, setCategories] = useState([])

  return (
    <>
      <Head>
        <title>
          Arora Mud Art | Unleashing the Timeless Beauty of Elegance
        </title>
        <link rel="canonical" href="https://aroramudart.vercel.app/" />
        <link
          rel="preload"
          href="/fonts/InstrumentSans-Regular.ttf"
          as="font"
          type="font/ttf"
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

      <ReactLenis
        root
        options={{
          lerp: 0.08,
        }}
      />
      <Context.Provider
        value={{
          products,
          setProducts,
          offers,
          setOffers,
          categories,
          setCategories,
        }}
      >
        <Navbar />
        {/*<div className="max-w-7xl p-4 mx-auto">*/}
        <Component {...pageProps} />
        {/*</div>*/}
        <Footer />
      </Context.Provider>


      {/*<div className="h-dvh flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center text-black">Arora Mud Art</h1>
        <p>Site Under Maintenance...</p>
      </div>*/}
    </>
  )
}

export default App
