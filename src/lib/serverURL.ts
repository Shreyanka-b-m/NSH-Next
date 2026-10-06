// Public address of the website, used for absolute links (SEO previews, Open Graph images).
// Set NEXT_PUBLIC_SERVER_URL in .env for each environment, e.g. https://www.example.com
export const SERVER_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

// Makes a site path (e.g. an uploaded image's "/api/media/file/...") a full URL.
export const absoluteUrl = (url: string) => (url.startsWith('http') ? url : `${SERVER_URL}${url}`)
