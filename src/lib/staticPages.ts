// Fixed website pages whose SEO editors can set in Admin → Page SEO.
// `title` and `description` are the built-in defaults, used until an editor fills in the SEO tab.
// No server imports: the admin's search preview uses this list too.

export type StaticPage = {
  path: string
  label: string
  /** Page name; the layout adds " | <site name>". Omit to use the Site Settings title. */
  title?: string
  /** Omit to use the Site Settings description. */
  description?: string
}

export const STATIC_PAGES = {
  home: { path: '/', label: 'Home' },
  about: { path: '/about', label: 'About', title: 'About' },
  concierge: { path: '/concierge', label: 'Concierge', title: 'Concierge' },
  properties: { path: '/properties', label: 'Properties', title: 'Properties' },
  'buy-a-home': {
    path: '/buy-a-home',
    label: 'Buy A Home',
    title: 'Buy A Home',
    description:
      'Tell us about the luxury home you are looking for and the Novel Signature Homes team will get in touch.',
  },
  'trade-inquiry': {
    path: '/trade-inquiry',
    label: 'Trade Inquiry',
    title: 'Trade Inquiry',
    description:
      'Builders, architects, designers and suppliers: get in touch about working with Novel Signature Homes.',
  },
  'other-inquiries': {
    path: '/other-inquiries',
    label: 'Other Inquiries',
    title: 'Other Inquiries',
    description:
      'Questions about homes, neighborhoods, or designs? Reach out to Novel Signature Homes.',
  },
  'privacy-policy': {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    description:
      'How Novel Signature Homes collects, uses, discloses, and protects your personal information.',
  },
  'terms-and-conditions': {
    path: '/terms-and-conditions',
    label: 'Terms and Conditions',
    title: 'Terms and Conditions',
    description:
      'The terms and conditions governing your access to and use of the Novel Signature Homes website.',
  },
  'cookie-policy': {
    path: '/cookie-policy',
    label: 'Cookie Policy',
    title: 'Cookie Policy',
    description:
      'How Novel Signature Homes uses cookies and similar tracking technologies, and how you can manage them.',
  },
} satisfies Record<string, StaticPage>

export type StaticPageKey = keyof typeof STATIC_PAGES

export const getStaticPage = (key: unknown): StaticPage | undefined =>
  typeof key === 'string' && key in STATIC_PAGES ? STATIC_PAGES[key as StaticPageKey] : undefined
