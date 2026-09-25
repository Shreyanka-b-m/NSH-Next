import NotFoundContent from '@/components/common/NotFoundContent'

// Shown when a property slug doesn't exist (the page calls notFound()).
export default function NotFound() {
  return (
    <>
      <title>Property Not Found | Novel Signature Homes</title>
      <NotFoundContent
        title="This home isn’t on the market"
        message="The property you’re looking for may have been sold, renamed, or is no longer listed. Explore our current collection of signature homes instead."
      />
    </>
  )
}
