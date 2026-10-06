import { notFound } from 'next/navigation'
import ContactLayout from '@/components/contact/ContactLayout'
import { getFormBySlug } from '@/lib/forms'
import { pageMetadata } from '@/lib/pageSeo'

// Loads its form from Payload; render at request time so the Docker build needs no database.
export const dynamic = 'force-dynamic'

export const generateMetadata = () => pageMetadata('trade-inquiry')

export default async function TradeInquiryPage() {
  const form = await getFormBySlug('trade-inquiry')
  if (!form) notFound()

  return (
    <ContactLayout
      form={form}
      subtitle="Trade Inquiry"
      image={{ src: '/assets/images/trade-inquiry.webp', alt: 'Luxury home interior detail' }}
    >
      <p>
        We value strong partnerships and are always eager to work with skilled professionals and
        reliable partners who can help us and be of service to our organization. Reach out to us;
        we’d love to collaborate.
      </p>
    </ContactLayout>
  )
}
