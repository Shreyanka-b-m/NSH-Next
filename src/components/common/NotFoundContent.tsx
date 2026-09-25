import Link from 'next/link'
import type { CSSProperties } from 'react'

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/concierge', label: 'Concierge' },
  { href: '/buy-a-home', label: 'Buy A Home' },
  { href: '/other-inquiries', label: 'Contact Us' },
]

// Staggers the fade-in of each block (see .nf-fade-up in styles.css).
const delay = (seconds: number) => ({ '--nf-delay': `${seconds}s` }) as CSSProperties

// Shared 404 design, used by app/global-not-found.tsx (unknown URLs) and
// app/(frontend)/not-found.tsx (pages that call notFound()).
// Animations (nf-*) live in styles.css under "404 Page".
type NotFoundContentProps = {
  title?: string
  message?: string
}

export default function NotFoundContent({
  title = 'This address isn’t on our map',
  message = 'The page you’re looking for may have moved, been sold, or never been built. Let us guide you back to something extraordinary.',
}: NotFoundContentProps) {
  return (
    <section className="black-pattern-bg relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-[130px] pb-24 text-(--color-white)">
      {/* Vignette so the centre reads clearly over the pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.35)_0%,rgba(10,10,10,0.92)_70%)]"
      />

      <div className="relative z-10 flex w-full max-w-[780px] flex-col items-center text-center">
        <p
          className="nf-fade-up mb-6 text-xs! tracking-[0.4em] text-[#DFCBB6] uppercase"
          style={delay(0.1)}
        >
          Error 404
        </p>

        {/* "4 [house] 4" — the zero is a line-drawn house with a lit doorway */}
        <div
          aria-hidden="true"
          className="flex items-center justify-center font-(family-name:--font-heading) text-[220px] leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_#DFCBB6] max-[976px]:text-[170px] max-[768px]:text-[120px]"
        >
          <span className="nf-fade-up" style={delay(0.2)}>
            4
          </span>
          <HouseDrawing />
          <span className="nf-fade-up" style={delay(0.35)}>
            4
          </span>
        </div>

        <h1 className="nf-fade-up mt-10 max-[768px]:mt-8" style={delay(0.9)}>
          {title}
        </h1>

        <div
          aria-hidden="true"
          className="nf-fade-up my-7 h-px w-full max-w-[420px] bg-[linear-gradient(90deg,transparent,#DFCBB6,transparent)]"
          style={delay(1)}
        />

        <p className="nf-fade-up max-w-[560px] font-light text-white/80" style={delay(1.1)}>
          {message}
        </p>

        <div
          className="nf-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={delay(1.25)}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-[#DFCBB6] bg-[#DFCBB6] px-8 py-4 text-sm tracking-[0.15em] text-black! uppercase transition-colors duration-300 hover:bg-transparent hover:text-[#DFCBB6]!"
          >
            Return Home
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center border border-white/60 px-8 py-4 text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:border-white hover:bg-white hover:text-black!"
          >
            Explore Properties
          </Link>
        </div>

        <nav
          aria-label="Helpful links"
          className="nf-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60"
          style={delay(1.4)}
        >
          <span className="w-full text-xs tracking-[0.3em] text-white/40 uppercase max-[768px]:tracking-[0.15em]">
            Or perhaps you were looking for
          </span>
          {quickLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="underline-offset-[6px] transition-colors hover:text-[#DFCBB6]! hover:underline!"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

// Line-art house that draws itself in; sized in em so it matches the "4"s.
function HouseDrawing() {
  const stroke = {
    fill: 'none',
    stroke: '#DFCBB6',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
    pathLength: 1,
  }

  return (
    <svg viewBox="0 0 100 120" className="nf-draw mx-[0.06em] h-[0.78em] w-auto overflow-visible">
      {/* Warm light spilling from the open doorway */}
      <path className="nf-glow" d="M38 118 V80 H62 V118 Z" fill="#DFCBB6" stroke="none" />
      <path
        className="nf-glow"
        d="M38 118 L20 128 H80 L62 118 Z"
        fill="url(#nf-spill)"
        stroke="none"
      />
      <defs>
        <linearGradient id="nf-spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DFCBB6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#DFCBB6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Roof, chimney and walls */}
      <path {...stroke} d="M4 60 L50 14 L96 60" />
      <path {...stroke} d="M72 38 V20 H82 V48" />
      <path {...stroke} d="M14 50 V118 M86 50 V118" />
      <path {...stroke} d="M2 118 H98" />
      {/* Round attic window */}
      <circle {...stroke} cx="50" cy="46" r="7" />
      <path {...stroke} d="M50 39 V53 M43 46 H57" />
      {/* Door frame and the door swung open */}
      <path {...stroke} d="M38 118 V80 H62 V118" />
      <path {...stroke} d="M62 118 L73 112 V84 L62 80" />
      <circle {...stroke} cx="70" cy="99" r="0.8" />
    </svg>
  )
}
