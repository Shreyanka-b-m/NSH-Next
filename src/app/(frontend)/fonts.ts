import localFont from 'next/font/local'

// Site fonts, shared by the frontend layout and app/global-not-found.tsx.
export const headingFont = localFont({
  src: '../../fonts/Cormorant Garamond/cormorant-garamond-v21-latin-regular.woff2',
  variable: '--font-heading',
})

export const bodyFont = localFont({
  src: [
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-300.woff2',
      weight: '300',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-regular.woff2',
      weight: '400',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-500.woff2',
      weight: '500',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-600.woff2',
      weight: '600',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-700.woff2',
      weight: '700',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-800.woff2',
      weight: '800',
    },
    {
      path: '../../fonts/Montserrat/montserrat-v31-latin-900.woff2',
      weight: '900',
    },
  ],
  variable: '--font-body',
})
