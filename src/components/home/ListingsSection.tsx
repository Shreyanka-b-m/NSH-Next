import { getPayload } from 'payload'
import config from '@/payload.config'
import ListingsSlider from './ListingsSlider'

export default async function ListingsSection() {
  const payload = await getPayload({
    config,
  })

  const properties = await payload.find({
    collection: 'properties',

    where: {
      isFeatured: {
        not_equals: true,
      },
    },

    depth: 2,
    limit: 100,
  })

  return (
    <section className="listings-section">
      <div className="container-custom">
        <div className="section-heading">
          <h2>Our Listings</h2>
        </div>

        <ListingsSlider properties={properties.docs} />
      </div>
    </section>
  )
}
