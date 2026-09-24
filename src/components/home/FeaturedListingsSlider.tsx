'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// import './FeaturedListings.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function FeaturedListingsSlider({ properties }: { properties: any[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
      speed={900}
      grabCursor={true}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
    >
      {properties.map((property) => {
        const displayName = property.featuredDisplayName || property.name

        return (
          <SwiperSlide key={property.id}>
            <div className="relative h-[90vh] overflow-hidden max-[976px]:h-[70vh] max-[768px]:h-[50vh]">
              {property.featuredImage?.url && (
                <Image
                  src={property.featuredImage.url}
                  alt={displayName}
                  fill
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover"
                />
              )}

              <div className="absolute inset-x-0 bottom-0 text-[#fefefe] flex items-center justify-between gap-6 bg-black/85 px-[50px] py-[35px] max-[976px]:px-[30px] max-[976px]:py-[30px] max-[768px]:px-5 max-[768px]:pt-5 max-[768px]:pb-8">
                <div className="contents max-[976px]:flex max-[976px]:flex-col max-[976px]:gap-2.5">
                  <h3 className="featured-card__heading text-6xl text-center leading-none [font-family:var(--font-heading)] max-[976px]:text-[48px] max-[768px]:text-[36px]">
                    {displayName}
                  </h3>

                  <div className="flex items-center gap-2.5 text-lg max-[768px]:text-sm justify-center">
                    <span>{property.bedrooms} BD</span>

                    <span>|</span>

                    <span>AC Area: {property.acArea?.toLocaleString()} Sqft</span>
                  </div>
                </div>

                <Link
                  href={`/properties/${property.slug}`}
                  className="flex shrink-0 items-center gap-3 text-lg transition-opacity duration-300 ease-in-out hover:opacity-80 max-[768px]:text-sm"
                >
                  <span className="max-[768px]:hidden text-[#DFCBB6]">View Property</span>
                  <svg
                    className="h-[42px] w-[42px] shrink-0 max-[768px]:h-8 max-[768px]:w-8"
                    viewBox="0 0 42 42"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="21" cy="21" r="15" stroke="#DFCBB6" strokeWidth="2" />
                    <path
                      d="M18.5 14.5 25.5 21l-7 6.5"
                      stroke="#DFCBB6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
