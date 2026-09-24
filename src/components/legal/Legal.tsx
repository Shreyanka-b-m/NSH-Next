import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

// Shared building blocks for Privacy Policy, Terms & Conditions and Cookie Policy pages.
// Text sizes on <p>/<h2>/<a> use `!` because the global element rules in styles.css are
// unlayered and would otherwise override Tailwind utilities.

type Props = { children: ReactNode }

export function legalMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | Novel Signature Homes`
  return {
    title: fullTitle,
    description,
    openGraph: { title: fullTitle, description, type: 'website' },
  }
}

export function LegalPage({
  title,
  effectiveDate,
  children,
}: Props & { title: string; effectiveDate: string }) {
  return (
    <section className="hero-top-gap container-custom flex flex-col gap-5">
      <h1 className="section-heading">{title}</h1>
      <LegalText className="italic">Effective as of {effectiveDate}</LegalText>
      {children}
    </section>
  )
}

export function LegalHeading({ children }: Props) {
  return (
    <h2 className="mt-[30px] text-[36px]! leading-[1.2]! max-[976px]:mt-5 max-[976px]:text-[30px]! max-[768px]:mt-3 max-[768px]:text-[26px]!">
      {children}
    </h2>
  )
}

export function LegalText({ children, className = '' }: Props & { className?: string }) {
  return <p className={`${className}`}>{children}</p>
}

export function LegalList({ children, nested = false }: Props & { nested?: boolean }) {
  return <ul className={`pl-6 ${nested ? 'list-[circle]' : 'list-disc'}`}>{children}</ul>
}

export function LegalItem({ children }: Props) {
  return <li className="py-2.5 leading-[1.7]">{children}</li>
}

export function Bold({ children }: Props) {
  return <span className="font-semibold">{children}</span>
}

export function LegalContact() {
  return (
    <address className="not-italic">
      <LegalText>
        <Bold>Novel Signature Homes</Bold>
        <br />
        Email:{' '}
        <Bold>
          <LegalLink href="mailto:info@novelsignaturehomes.com">
            info@novelsignaturehomes.com
          </LegalLink>
        </Bold>
        <br />
        Phone:{' '}
        <Bold>
          <LegalLink href="tel:+16067075050">+1(606)-707-5050</LegalLink>
        </Bold>
      </LegalText>
    </address>
  )
}

export function LegalLink({ href, children }: Props & { href: string }) {
  const className =
    'underline! underline-offset-[3px] break-words transition-colors hover:text-(--color-brown)!'
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  )
}
