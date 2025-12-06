import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Fardan Nozami Ajitama - Backend Developer",
    template: "%s | Fardan Nozami Ajitama",
  },
  description:
    "Backend Developer with 3+ years experience specializing in Laravel, Golang, Node.js, PostgreSQL, and MySQL",
  generator: "v0.app",
  icons: {
    icon: "/ajitama.png",
    shortcut: "/ajitama.png",
    apple: "/ajitama.png",
  },
  openGraph: {
    title: "Fardan Nozami Ajitama - Backend Developer",
    description:
      "Backend Developer with 3+ years experience specializing in Laravel, Golang, Node.js, PostgreSQL, and MySQL",
    url: "/",
    siteName: "Fardan Nozami Ajitama",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/ajitama.png",
        width: 512,
        height: 512,
        alt: "Fardan Nozami Ajitama portrait",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
