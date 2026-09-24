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
  src: [
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-300.woff2',
      weight: '300',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-regular.woff2',
      weight: '400',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-500.woff2',
      weight: '500',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-600.woff2',
      weight: '600',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-700.woff2',
      weight: '700',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-800.woff2',
      weight: '800',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-900.woff2',
      weight: '900',
    },
  ],
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
