import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function PropertiesPage() {
  const payload = await getPayload({
    config,
  })

  const properties = await payload.find({
    collection: 'properties',
    limit: 100,
  })

  return (
    <div className="container-custom">
      <h1>Properties</h1>

      <br />

      {properties.docs.map((property: any) => (
        <div key={property.id}>
          <Link href={`/properties/${property.slug}`}>{property.name}</Link>
        </div>
      ))}
    </div>
  )
}
