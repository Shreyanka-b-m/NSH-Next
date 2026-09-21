// src/components/home/FeaturedListings.tsx

import { getPayload } from 'payload'
import config from '@/payload.config'
import FeaturedListingsSlider from './FeaturedListingsSlider'

export default async function FeaturedListings() {
  const payload = await getPayload({
    config,
  })

  const properties = await payload.find({
    collection: 'properties',
    where: {
      isFeatured: {
        equals: true,
      },
    },
    depth: 2,
    limit: 20,
  })

  return (
    <section className="featured-listings">
      <div className="container-custom">
        <div className="featured-listings__header">
          <h2>Our Featured Listings</h2>
        </div>

        <FeaturedListingsSlider properties={properties.docs} />
      </div>
    </section>
  )
}
