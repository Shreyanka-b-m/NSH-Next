'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'

import './ListingsSlider.css'

export default function ListingsSlider({ properties }: { properties: any[] }) {
  return (
    <Swiper
      className="listings-swiper"
      modules={[Navigation, Pagination]}
      slidesPerView="auto"
      spaceBetween={24}
      grabCursor={true}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true,
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
      dotClassName: 'bg-[#00d54f]',
    },

    'sold-out': {
      label: 'SOLD OUT',
      dotClassName: 'bg-[#ff2d2d]',
    },

    'under-contract': {
      label: 'UNDER CONTRACT',
      dotClassName: 'bg-[#ffb100]',
    },
  }

  const status = statusMap[property.status as keyof typeof statusMap]

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="flex h-[auto] w-[600px] flex-col max-[976px]:h-[auto] max-[976px]:w-[550px] max-[768px]:h-[auto] max-[768px]:w-[300px]"
    >
      <div className="relative h-[350px] shrink-0 max-[976px]:h-[350px] max-[768px]:h-[200px]">
        {property.cardImage?.url && (
          <Image
            src={property.cardImage.url}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 400px, (max-width: 976px) 550px, 610px"
            className="object-cover"
          />
        )}

        <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/75 px-3 py-2 text-xs text-white max-[976px]:text-[12px] max-[768px]:text-[10px]">
          <span className={`h-3 w-3 rounded-full ${status.dotClassName}`} />

          {status.label}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden pt-4">
        <div className="flex flex-row justify-between items-center gap-2.5 max-[768px]:flex-col max-[768px]:items-start">
          <div className="truncate font-semibold">{property.name}</div>

          <div className="flex flex-wrap gap-2 truncate font-medium">
            <span>{property.bedrooms} BD</span>

            <span>|</span>

            <span>{property.bathrooms} BA</span>

            <span>|</span>

            <span>AC Area: {property.acArea?.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-3.5 flex shrink-0 items-center justify-end gap-2.5 text-[#9d6b44] max-[768px]:justify-start">
          <span className="font-semibold">View Property</span>

          <svg className="h-3 w-4" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path
              d="M1 2 5 6 1 10M6 2l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
