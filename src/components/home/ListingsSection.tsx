import { getListedProperties } from '@/lib/properties'
import ListingsSlider from './ListingsSlider'

export default async function ListingsSection() {
  const properties = await getListedProperties()

  return (
    <section className="listings-section">
      <div className="container-custom">
        <div className="section-heading mb-12">
          <h2>Our Listings</h2>
        </div>

        <ListingsSlider properties={properties} />
      </div>
    </section>
  )
}
