"use client"

import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

export default function Home() {
  const [colorScheme, setColorScheme] = useState("light")

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setColorScheme(colorSchemeQuery.matches ? "dark" : "light")
  }, [])

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer position="bottom-right" theme={colorScheme} />
    </>
  )
}
