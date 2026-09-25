import NotFoundContent from '@/components/common/NotFoundContent'

// Shown when a frontend page calls notFound() (e.g. a missing property or form).
// Unknown URLs are handled by app/global-not-found.tsx, which renders the same design.
export default function NotFound() {
  return (
    <>
      <title>Page Not Found | Novel Signature Homes</title>
      <NotFoundContent />
    </>
  )
}
