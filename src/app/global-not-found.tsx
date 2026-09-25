// Global 404 for URLs that match no route. The app has two root layouts ((frontend) and
// (payload)), so Next.js renders this file on its own, without either layout; it therefore
// brings the site's fonts, styles, header and footer itself.
import type { Metadata } from 'next'
import NotFoundContent from '@/components/common/NotFoundContent'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { bodyFont, headingFont } from './(frontend)/fonts'
import './(frontend)/styles.css'

export const metadata: Metadata = {
  title: 'Page Not Found | Novel Signature Homes',
  description: 'The page you are looking for could not be found.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Header />
        <main>
          <NotFoundContent />
        </main>
        <Footer />
      </body>
    </html>
  )
}
