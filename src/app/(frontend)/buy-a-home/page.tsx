import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContactLayout from '@/components/contact/ContactLayout'
import { getFormBySlug } from '@/lib/forms'

// Loads its form from Payload; render at request time so the Docker build needs no database.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Buy A Home | Novel Signature Homes',
  description:
    'Tell us about the luxury home you are looking for and the Novel Signature Homes team will get in touch.',
}

export default async function BuyAHomePage() {
  const form = await getFormBySlug('buy-a-home')
  if (!form) notFound()

  return (
    <ContactLayout
      form={form}
      subtitle="Buy A Home"
      image={{
        src: '/assets/images/buy-a-home.webp',
        alt: 'Novel Signature Homes luxury residence',
      }}
    >
      <p>
        Are you looking for your dream luxury home? We are here for you to guide every step of the
        way, from exploring the properties to scheduling a walkthrough of any of our properties of
        your choice with detailed information on our inventory.
      </p>
    </ContactLayout>
  )
}
