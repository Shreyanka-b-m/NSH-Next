import React from 'react'
import './styles.css'
import localFont from "next/font/local";
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const geistSans = localFont({
  src: "../../fonts/Cormorant Garamond/cormorant-garamond-v21-latin-regular.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../fonts/Montserrat/montserrat-v31-latin-regular.woff2",
  variable: "--font-geist-mono",
});

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Novel Signature Homes',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
