// src/components/layout/Header.tsx

'use client'

import Link from 'next/link'
import './Header.css'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/concierge', label: 'Concierge' },
  { href: '/properties', label: 'Properties' },
]

const contactLinks = [
  { href: 'mailto:info@novelsignaturehomes.com', label: 'info@novelsignaturehomes.com' },
  { href: 'tel:+16067075050', label: '+1 (606)-707-5050' },
  { href: '/buy-a-home', label: 'Buy A Home' },
  { href: '/trade-inquiry', label: 'Trade Inquiry' },
  { href: '/other-inquiries', label: 'Other Inquiries' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isContactActive = contactLinks.some(
    ({ href }) => href.startsWith('/') && pathname.startsWith(href),
  )

  const closeMenus = () => {
    setIsMenuOpen(false)
    setIsContactOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close the click-opened dropdown on outside click or Escape.
  useEffect(() => {
    if (!isContactOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!contactRef.current?.contains(e.target as Node)) setIsContactOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsContactOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isContactOpen])

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
                onClick={closeMenus}
              >
                {label}
              </Link>
            )
          })}

          <div
            ref={contactRef}
            className={`header__dropdown ${isContactOpen ? 'header__dropdown--open' : ''}`}
          >
            <button
              type="button"
              className={`header__nav-link header__dropdown-toggle ${isContactActive ? 'header__nav-link--active' : ''}`}
              aria-haspopup="true"
              aria-expanded={isContactOpen}
              aria-controls="header-contact-menu"
              onClick={() => setIsContactOpen((open) => !open)}
            >
              Contact
              <svg
                className="header__dropdown-chevron"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <ul id="header-contact-menu" className="header__dropdown-menu">
              {contactLinks.map(({ href, label }) => {
                const isInternal = href.startsWith('/')
                const isActive = isInternal && pathname.startsWith(href)
                const className = `header__dropdown-link ${isActive ? 'header__dropdown-link--active' : ''}`
                return (
                  <li key={href}>
                    {isInternal ? (
                      <Link
                        href={href}
                        className={className}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={closeMenus}
                      >
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className={className} onClick={closeMenus}>
                        {label}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
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
