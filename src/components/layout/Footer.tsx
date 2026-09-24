// src/components/layout/Footer.tsx

import Link from 'next/link'
import Image from 'next/image'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  XIcon,
  YoutubeIcon,
} from './FooterIcons'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/novelsignaturehomes/',
    Icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/novel-signature-homes/',
    Icon: LinkedInIcon,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Novel-Signature-Homes/61566500864621/',
    Icon: FacebookIcon,
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@NovelSignatureHomes', Icon: YoutubeIcon },
  { label: 'X', href: 'https://x.com/nsignaturehomes', Icon: XIcon },
]

const contactPhone = '+1 (606)-707-5050'
const contactEmail = 'info@novelsignaturehomes.com'
const contactAddress = '11133 Shady Trail #171, Dallas, TX 75229'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-6 md:px-[70px] md:pt-[60px] md:pb-[30px]">
        <div className="flex flex-col items-center gap-9 text-center md:flex-row md:items-stretch md:justify-between md:gap-[60px] md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Link href="/">
              <Image
                src="/assets/images/NSH-Footer-Logo.svg"
                alt="Novel Signature Homes"
                width={200}
                height={83}
              />
            </Link>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center text-white transition-opacity hover:opacity-70"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <ul className="m-0 flex list-none flex-row flex-wrap items-center justify-center gap-0 p-0 md:flex-col md:items-start md:gap-3.5">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                className={`flex items-center transition-opacity hover:opacity-75 ${
                  index !== menuItems.length - 1
                    ? "after:mx-2.5 after:text-white/40 after:content-['|'] md:after:content-none"
                    : ''
                }`}
              >
                <Link
                  href={item.href}
                  className="text-base text-white transition-colors hover:text-[var(--color-brown)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="w-full md:w-auto md:min-w-[320px]">
            <h3 className="relative mb-6 inline-block pb-3 font-body text-sm after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[100%] after:-translate-x-1/2 after:bg-white/25 after:content-[''] md:block md:w-full md:border-b md:border-white/100 md:pb-3 md:after:content-none">
              Contact Us
            </h3>

            <div className="flex flex-col items-center gap-3.5 lg:flex-row md:items-start lg:gap-10">
              <div className="flex flex-col items-center gap-3.5 md:items-start">
                <a
                  href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`}
                  className="flex items-start gap-2.5 text-[15px] leading-snug text-white"
                >
                  <PhoneIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {contactPhone}
                </a>

                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-start gap-2.5 text-[15px] leading-snug text-white"
                >
                  <MailIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {contactEmail}
                </a>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <a
                  href={`https://maps.app.goo.gl/bpZubMctATeZ9jy76`}
                  className="flex items-start gap-2.5 text-[15px] leading-snug text-white"
                >
                  <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {contactAddress}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 pt-6 text-center md:mt-[50px]">
          <p className="text-sm text-white">
            Copyright © {new Date().getFullYear()} Novel Signature Homes | All Rights Reserved.{' '}
            <Link href="/privacy-policy" className="underline hover:text-white">
              Privacy-Policy
            </Link>
            .{' '}
            <Link href="/terms-and-conditions" className="underline hover:text-white">
              Terms&Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
