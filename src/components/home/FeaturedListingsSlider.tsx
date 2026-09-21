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
      {properties.map((property) => (
        <SwiperSlide key={property.id}>
          <div className="featured-card">
            {property.featuredImage?.url && (
              <Image
                src={property.featuredImage.url}
                alt={property.name}
                width={property.featuredImage.width || 1920}
                height={property.featuredImage.height || 1080}
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="featured-card__image"
              />
            )}

            <div className="featured-card__overlay">
              <h3 className="featured-card__title">{property.name}</h3>

              <div className="featured-card__meta">
                <span>{property.bedrooms} BD</span>

                <span>|</span>

                <span>AC Area: {property.acArea?.toLocaleString()} Sqft</span>
              </div>

              <Link href={`/properties/${property.slug}`} className="featured-card__link">
                View Property
                <span className="featured-card__arrow">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
