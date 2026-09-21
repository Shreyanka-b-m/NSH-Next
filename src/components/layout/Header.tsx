// src/components/layout/Header.tsx

import Link from 'next/link'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          NSH
        </Link>

        <nav className="header__nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/concierge">Concierge</Link>
          <Link href="/properties">Properties</Link>
        </nav>

        <button
          className="header__mobile-toggle"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>
    </header>
  )
}