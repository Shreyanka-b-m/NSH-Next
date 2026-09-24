import Image from 'next/image'

import Link from 'next/link'
import FeaturedListings from '@/components/home/FeaturedListings'
import ListingsSection from '@/components/home/ListingsSection'
import HeroVideo from '@/components/home/HeroVideo'
import SectionDivider from '@/components/common/SectionDivider'

import './styles.css'
import VideoShowcase from '@/components/home/VideoShowcase'

// Queries Payload/Postgres; render at request time so the Docker build needs no database.
export const dynamic = 'force-dynamic'

const why_choose_items = [
  {
    title: 'INDULGE',
    subtitle: 'In Ultimate Luxury',
    description:
      'Every home reflects our commitment to excellence, blending meticulous craftsmanship with the finest materials. Designed by industry experts, from foundation to finishing, our spaces redefine luxury living. Experience unmatched quality and service, crafted just for you.',
  },
  {
    title: 'IMAGINE',
    subtitle: 'Your Future Home Today',
    description:
      'Visualize your dream home with the latest technology. Our 3D designs, virtual reality, and augmented reality experiences let you explore every detail in stunning clarity. Immerse yourself in the world of possibilities and bring your vision to life before a single brick is laid.',
  },
  {
    title: 'DISCOVER',
    subtitle: 'Your Perfect Oasis',
    description:
      'We believe that location is everything. Our experts carefully select prime locations that offer tranquillity, convenience, and prestige. Enjoy seamless access to top schools, parks, hospitals, and major highways, providing effortless connectivity.',
  },
]

export default function HomePage() {
  return (
    <>
      {/****************** Hero Section ******************/}
      <section className="hero">
        <HeroVideo
          poster="/assets/images/hero-poster.webp"
          mp4Src="/assets/videos/hero-video 2mb.mp4"
        />

        <div className="hero-overlay" />

        <div className="container-custom hero-container">
          <div className="hero-content text-white">
            <h1 className="tracking-wide mb-6">LUXURY REDEFINED</h1>

            <p className="mb-8 ">
              Experience Unparalleled Luxury Living With Our Meticulously Crafted High-End Homes
            </p>

            <Link href="/properties" className="btn btn-light">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/****************** Featured Listings Section ******************/}
      <FeaturedListings />

      <SectionDivider />

      {/****************** About Section ******************/}
      <section className="container-custom">
        <h2 className="mb-10 section-heading">
          Timeless <span style={{ color: 'var(--color-brown)' }}>Comfort</span> in every detail
        </h2>
        <p className="pb-5">
          We believe in creating more than just houses; we create homes. meticulously designed to
          bring you comfort, beauty and a sense of peace. Welcome to a home that truly understands
          you.
        </p>
        <Link href="/about" className="btn btn-dark">
          About Us
        </Link>
      </section>

      {/****************** Why Choose Us Section ******************/}
      <section className="black-pattern-bg relative bg-cover bg-center">
        <div className="container-custom relative z-10">
          <h2 className="mb-10 section-heading-black-bg text-white">Why Choose Us? </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {why_choose_items.map((item) => (
              <div key={item.title} className="text-center lg:text-left">
                <h3 className="text-white mb-2">{item.title}</h3>

                {/* <p className="text-[#dfcbb6] mb-4">{item.subtitle}</p> */}
                {/* <p className="text-[#dfcbb6] mb-4 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-transparent after:via-[#dfcbb6] after:to-transparent pb-2">
                  {item.subtitle}
                </p> */}

                <p className="inline-block text-[#dfcbb6] mb-5 relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-[#DFCBB6] after:to-[#666666]">
                  {item.subtitle}
                </p>

                {/* <div className="h-px bg-white/30 mb-6" /> */}

                <p className="text-white leading-[1.8] text-justify">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/****************** Listings Section ******************/}
      <ListingsSection />

      {/****************** Concierge Services Section ******************/}

      <section className="concierge-cta">
        <div className="concierge-content">
          <div className="concierge-inner">
            <h2 className="section-heading-black-bg text-white mb-12">
              Our <span className="text-[#D4B08A]">Concierge</span> Services
            </h2>

            <p className="text-white mb-8">
              We’re here for you long after you get the keys. From Mortgage Assistance and Handyman
              Service to Transfer utilities — and so much more— you can count on our trusted network
              to make settling into your new home effortless.
            </p>

            <a href="/concierge" className="btn btn-light">
              Learn More
            </a>
          </div>
        </div>

        <div className="concierge-image">
          <Image
            src="/assets/images/concierge-services.webp"
            alt="Concierge Services"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <SectionDivider />

      {/****************** Video Showcase Section ******************/}
      <VideoShowcase />

      {/****************** Contact Form Section ******************/}
      <section className="white-pattern-bg relative bg-cover bg-center">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-[52px] md:text-[72px] lg:text-[86px] text-black">
                LET'S FIND YOUR
                <br />
                <span className="text-[#8A561F]">DREAM HOME</span>
                <br />
                TOGETHER
              </h2>
            </div>

            {/* Right Content */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-[1px] bg-[#8A561F] mx-auto mb-6" />

                <h3 className="text-3xl md:text-4xl font-light mb-4">Contact Form Coming Soon</h3>

                <p className="text-gray-600 max-w-md mx-auto">
                  We're currently building the contact experience. Soon you'll be able to submit
                  inquiries directly from this page.
                </p>

                <button
                  disabled
                  className="mt-8 px-8 py-4 border border-black text-black opacity-50 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
