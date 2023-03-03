import "./globals.css"

export const metadata = {
  title: "Chainlink Functions Next Starter",
  description: "A starter template for building Chainlink Functions with Next.js",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
