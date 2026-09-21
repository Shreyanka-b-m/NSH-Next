import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: 'properties',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const property = result.docs[0]

  if (!property) {
    notFound()
  }

  const bannerImages = property.gallery?.filter((item: any) => item.showInBanner === true) || []

  return (
    <main>
      {/* Breadcrumb */}
      <section className="container-custom">
        <nav>
          Home {'>'} Properties {'>'} {property.name}
        </nav>
      </section>

      {/* Banner Slider Placeholder */}
      <section className="container-custom">
        <h2>Banner Images</h2>

        {bannerImages.map((item: any, index: number) => (
          <div key={index}>
            {item.image?.url && (
              <img src={item.image.url} alt={property.name} width={1200} height={700} />
            )}
          </div>
        ))}
      </section>

      {/* Disclaimer */}
      <section className="container-custom">
        <p>
          Disclaimer: Information deemed reliable but not guaranteed and should be independently
          verified.
        </p>
      </section>

      {/* Property Header */}
      <section className="container-custom">
        <div>
          <div>
            <h1>{property.name}</h1>

            <p>
              {property.address}
              {property.city && `, ${property.city}`}
              {property.state && `, ${property.state}`}
            </p>
          </div>

          <div>
            <h3>${property.price ? Number(property.price).toLocaleString() : ''}</h3>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom">
        <div>
          <div>
            <h3>{property.bedrooms}</h3>
            <p>Beds</p>
          </div>

          <div>
            <h3>{property.bathrooms}</h3>
            <p>Baths</p>
          </div>

          <div>
            <h3>{property.acArea}</h3>
            <p>AC Area</p>
          </div>

          <div>
            <h3>{property.designTheme}</h3>
            <p>Design Theme</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="container-custom">
        <p>{property.description}</p>
      </section>

      {/* Team */}
      <section className="container-custom">
        <div>
          <div>
            <p>Broker</p>
            <h3>{property.broker}</h3>
          </div>

          <div>
            <p>Builder</p>
            <h3>{property.builder}</h3>
          </div>

          <div>
            <p>Architect</p>
            <h3>{property.architect}</h3>
          </div>

          <div>
            <p>Interior Designer</p>
            <h3>{property.interiorDesigner}</h3>
          </div>
        </div>
      </section>

      {/* Experience Your Future Home */}
      <section className="container-custom">
        <h2>Experience Your Future Home</h2>

        <div>
          <button>All Photos</button>
          <button>All Floor Plans</button>
          <button>Virtual Tour</button>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-custom">
        <h2>Gallery</h2>

        {property.gallery?.map((item: any, index: number) => (
          <div key={index}>
            {item.image?.url && (
              <img src={item.image.url} alt={`Gallery ${index + 1}`} width={600} height={400} />
            )}
          </div>
        ))}
      </section>

      {/* Floor Plans */}
      <section className="container-custom">
        <h2>Floor Plans</h2>

        {property.floorPlans?.map((item: any, index: number) => (
          <div key={index}>
            <h3>{item.title}</h3>

            {item.image?.url && (
              <img src={item.image.url} alt={item.title} width={600} height={400} />
            )}
          </div>
        ))}
      </section>

      {/* Virtual Tour */}
      {property.virtualTourUrl && (
        <section className="container-custom">
          <h2>Virtual Tour</h2>

          <a href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer">
            Open Virtual Tour
          </a>
        </section>
      )}
    </main>
  )
}
