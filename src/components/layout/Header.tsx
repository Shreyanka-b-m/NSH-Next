// src/components/layout/Header.tsx

import Link from 'next/link'
import './Header.css'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          <Image src="/assets/images/NSH-Logo.svg" alt="Logo" width={110} height={50} />
        </Link>

        <nav className="header__nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/concierge">Concierge</Link>
          <Link href="/properties">Properties</Link>
        </nav>

        <button className="header__mobile-toggle" aria-label="Open Menu">
          ☰
        </button>
      </div>
    </header>
  )
}
