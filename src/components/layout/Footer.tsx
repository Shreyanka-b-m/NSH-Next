import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Concierge', href: '/concierge' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-12 py-15">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/assets/images/NSH-Logo.svg"
                alt="Novel Signature Homes"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-4 text-right">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#8A561F] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Novel Signature Homes. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
