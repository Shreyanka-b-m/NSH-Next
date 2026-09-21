'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'

import './ListingsSection.css'

export default function ListingsSlider({ properties }: { properties: any[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1.2}
      spaceBetween={24}
      grabCursor={true}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },

        1200: {
          slidesPerView: 3,
        },
      }}
    >
      {properties.map((property) => (
        <SwiperSlide key={property.id}>
          <PropertyCard property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

function PropertyCard({ property }: { property: any }) {
  const statusMap = {
    'for-sale': {
      label: 'FOR SALE',
      className: 'tag-sale',
    },

    'sold-out': {
      label: 'SOLD OUT',
      className: 'tag-sold',
    },

    'under-contract': {
      label: 'UNDER CONTRACT',
      className: 'tag-contract',
    },
  }

  const status = statusMap[property.status as keyof typeof statusMap]

  return (
    <Link href={`/properties/${property.slug}`} className="listing-card">
      <div className="listing-card__image-wrapper">
        {property.cardImage?.url && (
          <img src={property.cardImage.url} alt={property.name} className="listing-card__image" />
        )}

        <div className={`listing-status ${status.className}`}>
          <span className="status-dot" />

          {status.label}
        </div>
      </div>

      <div className="listing-card__content">
        <div className="listing-card__address">{property.address}</div>

        <div className="listing-card__meta">
          <span>{property.bedrooms} BD</span>

          <span>|</span>

          <span>{property.bathrooms} BA</span>

          <span>|</span>

          <span>AC Area: {property.acArea?.toLocaleString()}</span>
        </div>

        <div className="listing-card__footer">
          <span>View Property</span>

          <span>»</span>
        </div>
      </div>
    </Link>
  )
}
