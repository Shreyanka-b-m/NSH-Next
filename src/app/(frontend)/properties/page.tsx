import Link from 'next/link'
import { getPropertyIndex } from '@/lib/properties'

export default async function PropertiesPage() {
  const properties = await getPropertyIndex()

  return (
    <div className="container-custom">
      <h1>Properties</h1>

      <br />

      {properties.map((property: any) => (
        <div key={property.id}>
          <Link href={`/properties/${property.slug}`}>{property.name}</Link>
        </div>
      ))}
    </div>
  )
}
