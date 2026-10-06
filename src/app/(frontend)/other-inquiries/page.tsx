import { notFound } from 'next/navigation'
import ContactLayout from '@/components/contact/ContactLayout'
import { getFormBySlug } from '@/lib/forms'
import { pageMetadata } from '@/lib/pageSeo'

// Loads its form from Payload; render at request time so the Docker build needs no database.
export const dynamic = 'force-dynamic'

export const generateMetadata = () => pageMetadata('other-inquiries')

export default async function OtherInquiriesPage() {
  const form = await getFormBySlug('other-inquiries')
  if (!form) notFound()

  return (
    <ContactLayout
      form={form}
      subtitle="Other Inquiries"
      image={{ src: '/assets/images/other-inquiries.webp', alt: 'Luxury living room interior' }}
    >
      <p>
        Have any queries about homes, neighborhoods, or designs? We are here for you to assist and
        provide the answers you need. Reach out to us!
      </p>
    </ContactLayout>
  )
}
