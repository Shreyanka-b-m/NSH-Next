import React from 'react'
import './styles.css'
import localFont from 'next/font/local'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

const headingFont = localFont({
  src: '../../fonts/Cormorant Garamond/cormorant-garamond-v21-latin-regular.woff2',
  variable: '--font-heading',
})

const bodyFont = localFont({
  src: '../../fonts/Montserrat/montserrat-v31-latin-regular.woff2',
  variable: '--font-body',
})

// Pages query Payload/Postgres; render at request time so the Docker build needs no database.
export const dynamic = 'force-dynamic'

export const metadata = {
  description:
    'Luxury Homes redefined. Explore the epitome of modern living with Novel Signature Homes.',
  title: 'Novel Signature Homes',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
