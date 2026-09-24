import Image from 'next/image'

export default function WhyChooseCollage() {
  return (
    <section className="container-custom white-pattern-bg grid grid-cols-1 min-[769px]:grid-cols-2 min-[977px]:grid-cols-4">
      {/* Why Choose - intro */}
      <div className="flex min-h-[320px] max-[976px]:min-h-[0px] flex-col justify-center min-[769px]:col-span-2 min-[769px]:row-start-1">
        <span className="text-7xl leading-[1.1] [font-family:var(--font-heading)] max-[768px]:text-4xl">
          Why
          <br />
          Choose
        </span>

        <p className="mt-1 uppercase" style={{ fontSize: '22px' }}>
          Novel Signature Homes?
        </p>

        <p className="mt-5 max-w-md max-[976px]:mb-7">
          Everyday, we work hard to make our clients&rsquo; lives better and happier.
        </p>
      </div>

      {/* Experience the finest materials - house exterior image */}
      <div className="relative flex  min-h-[405px] font-light max-[976px]:min-h-[300px] items-center justify-center px-[20%] max-[976px]:px-[50px]  min-[769px]:col-start-1 min-[769px]:row-start-2 min-[977px]:col-start-1 min-[977px]:row-start-2">
        <Image
          src="/assets/images/whychoose-bg-1.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 976px) 50vw, 25vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/80" />

        <p className="relative text-white">
          Experience the finest materials and careful attention to detail with superior
          craftsmanship.
        </p>
      </div>

      {/* Live in Texas's most desirable neighborhoods */}
      <div className="black-pattern-bg flex  min-h-[405px] font-light max-[976px]:min-h-[300px] items-center justify-center px-[20%] max-[976px]:px-[50px]  min-[769px]:col-start-2 min-[769px]:row-start-2 min-[977px]:col-start-2 min-[977px]:row-start-2">
        <p className="text-white">
          Live in Texas&rsquo;s most desirable and well-connected neighborhoods with prime
          locations.
        </p>
      </div>

      {/* Center lifestyle image - spans both rows */}
      <div className="relative min-h-[320px] max-[768px]:min-h-[600px] min-[769px]:col-start-1 min-[769px]:row-start-3 min-[769px]:row-span-2 min-[977px]:col-start-3 min-[977px]:row-start-1 min-[977px]:row-span-2 min-[977px]:min-h-0">
        <Image
          src="/assets/images/whychoose.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 976px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Enjoy living without compromising - interior/staircase image */}
      <div className="relative flex  min-h-[405px] font-light max-[976px]:min-h-[300px] items-center justify-center px-[20%] max-[976px]:px-[50px]  min-[769px]:col-start-2 min-[769px]:row-start-3 min-[977px]:col-start-4 min-[977px]:row-start-1">
        <Image
          src="/assets/images/whychoose-bg.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 976px) 50vw, 25vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/80" />

        <p className="relative text-white">
          Enjoy living without compromising on elegance through luxury.
        </p>
      </div>

      {/* Enjoy exceptional customer care */}
      <div className="black-pattern-bg flex  min-h-[405px] font-light max-[976px]:min-h-[300px] max-[976px]:min-h-[300px] items-center justify-center px-[20%] max-[976px]:px-[50px]  min-[769px]:col-start-2 min-[769px]:row-start-4 min-[977px]:col-start-4 min-[977px]:row-start-2">
        <p className="text-white">
          Enjoy exceptional customer care from start to finish, with our signature white-glove
          service.
        </p>
      </div>
    </section>
  )
}
