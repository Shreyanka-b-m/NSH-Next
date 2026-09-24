import Image from 'next/image'
import SectionDivider from '@/components/common/SectionDivider'
import WhyChooseCollage from '@/components/sections/WhyChooseCollage'
import '../styles.css'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-top-gap container-custom font-light text-justify">
        <h1 className="section-heading mb-10">Our Story</h1>
        <div className="relative w-full h-[570px] max-[976px]:h-[300px] max-[768px]:h-[150px] mb-8">
          <Image
            src="/assets/images/about.webp"
            alt="Hero Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <p>
          At Novel Signature Homes, we craft luxurious homes that blend timeless elegance with
          modern innovation. Our story began as part of the Novel Group—a diverse conglomerate with
          a vast commercial portfolio, expertise in IT services, cable distribution, real estate,
          and innovative solutions—established in 1993 in Dallas, TX. Over the years, we have built
          a reputation for fast delivery of office spaces, setting industry standards with
          customized layouts and zero material wastage.
        </p>
        <br />
        <p>
          Building on this legacy, Novel Signature Homes is redefining residential property
          development. We specialize in bespoke villas and single-unit luxury homes that reflect
          open-concept designs, quality and craftsmanship. Located in prime areas, our properties
          offer easy access to premium amenities and vibrant neighborhoods. Our journey is driven by
          a commitment to excellence. Partnering with leading architects and designers, we
          seamlessly integrate elegance with eco-friendly features, ensuring that your home is as
          responsible as it is beautiful.
        </p>
      </section>

      <SectionDivider variant="black" />

      <section className="container-custom">
        <div className="flex flex-row gap-20 max-[976px]:flex-col max-[976px]:gap-13 max-[768px]:gap-10 text-center font-light">
          <div className="flex-1 shadow-[0px_0px_18px_0px_rgba(0,0,0,0.08)] py-7 px-5 max-[976px]:max-w-[600px] max-[976px]:mx-auto max-[768px]:max-w-full">
            <h3 className="mb-4">Our Vision</h3>
            <p>
              To set a new standard in the residential real estate by crafting luxury homes that
              blend timeless elegance with modern innovation.
            </p>
          </div>

          <div className="flex-1 shadow-[0px_0px_18px_0px_rgba(0,0,0,0.08)] py-7 px-5 max-[976px]:max-w-[600px] max-[976px]:mx-auto max-[768px]:max-w-full">
            <h3 className="mb-4">Our Mission</h3>
            <p>
              To provide exceptional value and unparalleled service in every aspect of our
              residential real estate development.
            </p>
          </div>

          <div className="flex-1 shadow-[0px_0px_18px_0px_rgba(0,0,0,0.08)] py-7 px-5 max-[976px]:max-w-[600px] max-[976px]:mx-auto max-[768px]:max-w-full">
            <h3 className="mb-4">Our Values</h3>
            <p>
              Integrity, Excellence, and Customer Satisfaction are the pillars that guide our
              actions and decisions.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseCollage />
    </>
  )
}
