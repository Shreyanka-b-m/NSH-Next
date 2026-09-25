import React from 'react'
import './styles.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { bodyFont, headingFont } from './fonts'

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
