// src/components/layout/Header.tsx

'use client'

import Link from 'next/link'
import './Header.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/concierge', label: 'Concierge' },
  { href: '/properties', label: 'Properties' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <Image src="/assets/images/NSH-Logo.svg" alt="Logo" width={120} height={50} />
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <button
          className={`header__mobile-toggle ${isMenuOpen ? 'header__mobile-toggle--open' : ''}`}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
