import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import Link from 'next/link'
import FeaturedListings from '@/components/home/FeaturedListings'
import ListingsSection from '@/components/home/ListingsSection'

import config from '@/payload.config'
import './styles.css'

// export default async function HomePage() {
//   const headers = await getHeaders()
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })
//   const { user } = await payload.auth({ headers })

//   const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

//   return (
//     <div className="home">
//       <div className="content">
//         <picture>
//           <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
//           <Image
//             alt="Payload Logo"
//             height={65}
//             src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
//             width={65}
//           />
//         </picture>
//         {!user && <h1>Welcome to your new project.</h1>}
//         {user && <h1>Welcome back, {user.email}</h1>}
//         <div className="links">
//           <a
//             className="admin"
//             href={payloadConfig.routes.admin}
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Go to admin panel
//           </a>
//           <a
//             className="docs"
//             href="https://payloadcms.com/docs"
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             Documentation
//           </a>
//         </div>
//       </div>
//       <div className="footer">
//         <p>Update this page by editing</p>
//         <a className="codeLink" href={fileURL}>
//           <code>app/(frontend)/page.tsx</code>
//         </a>
//       </div>
//     </div>
//   )
// }

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/assets/videos/sample.mp4" type="video/mp4" />
        </video>

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

      <section className="container-custom">
        <h2 className="mb-10">
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

      <section className="bg-[var(--color-black)] text-white container-custom flex flex-row gap-10">
        <div className="flex-1 align-center justify-center flex flex-col">
          <h2 className="mb-10">Our Concierge Services</h2>
          <p className="pb-5">
            We’re here for you long after you get the keys. From Mortgage Assistance and Handyman
            Service to Transfer utilities —and so much more— you can count on our trusted network to
            make settling into your new home effortless.
          </p>
          <Link href="/concierge" className="btn btn-light">
            Learn More
          </Link>
        </div>

        <div className="flex-1">
          <Image
            src="/assets/images/concierge-services.webp"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </section>

      <FeaturedListings />

      <ListingsSection />
    </>
  )
}
