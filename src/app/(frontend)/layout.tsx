import type { Metadata } from 'next'
import React from 'react'
import './styles.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { bodyFont, headingFont } from './fonts'
import { SERVER_URL } from '@/lib/serverURL'
import { getSiteSettings } from '@/lib/siteSettings'
import { DEFAULT_SITE_NAME } from '@/globals/SiteSettings'

// Static pages stay prerendered. They regenerate in the background at most hourly (so a fresh
// deploy picks up Site Settings) and immediately after Site Settings is saved.
export const revalidate = 3600

const DEFAULT_DESCRIPTION =
  'Luxury Homes redefined. Explore the epitome of modern living with Novel Signature Homes.'

// Site-wide defaults from Admin → Site Settings. Pages override these with their own metadata.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteName = settings?.siteName || DEFAULT_SITE_NAME
  const title = settings?.meta?.title || siteName
  const description = settings?.meta?.description || DEFAULT_DESCRIPTION
  const image = typeof settings?.meta?.image === 'object' ? settings.meta.image?.url : undefined

  return {
    // Lets pages use relative URLs (e.g. uploaded images) in Open Graph tags.
    metadataBase: new URL(SERVER_URL),
    // A page title like "Buy A Home" becomes "Buy A Home | <site name>".
    title: { default: title, template: `%s | ${siteName}` },
    description,
    openGraph: {
      siteName,
      title,
      description,
      type: 'website',
      images: image ? [image] : undefined,
    },
  }
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
