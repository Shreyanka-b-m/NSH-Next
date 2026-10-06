import { notFound } from 'next/navigation'
import { redirectIfListed } from '@/lib/redirects'

// Catches only addresses that match no other page (e.g. old WordPress URLs like /gallery):
// follows Admin → Redirects if listed, otherwise shows the normal 404 page.
export default async function UnknownPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  await redirectIfListed(`/${path.join('/')}`)
  notFound()
}
