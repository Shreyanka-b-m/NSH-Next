import type { ReactNode } from 'react'
import Link from 'next/link'

import { getListedProperties } from '@/lib/properties'
import ListingsSlider from './ListingsSlider'

type Props = {
  heading?: ReactNode
  /** Adds a "View All Properties" button under the slider. */
  showViewAll?: boolean
  className?: string
}

// The property card slider: "Our Listings" on the home page, "Properties For You" on /blog.
export default async function ListingsSection({
  heading = (
    <>
      Our <span className="text-[var(--color-brown)]">Listings</span>
    </>
  ),
  showViewAll = false,
  className = 'bg-white',
}: Props) {
  const properties = await getListedProperties()

  return (
    <section className={className}>
      <div className="container-custom">
        <div className="section-heading mb-12">
          <h2>{heading}</h2>
        </div>

        <ListingsSlider properties={properties} />

        {showViewAll && (
          <div className="mt-12 flex justify-center">
            <Link href="/properties" className="btn btn-dark">
              View All Properties
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
