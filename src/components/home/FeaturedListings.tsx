import { getFeaturedProperties } from '@/lib/properties'
import FeaturedListingsSlider from './FeaturedListingsSlider'

export default async function FeaturedListings() {
  const properties = await getFeaturedProperties()

  return (
    <section className="featured-listings">
      <div className="container-custom">
        <div className="featured-listings__header section-heading mb-12">
          <h2>Our Featured Listings</h2>
        </div>

        <FeaturedListingsSlider properties={properties} />
      </div>
    </section>
  )
}
