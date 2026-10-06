// An uploaded image's own alt text from the Media library, or `fallback` when it has none
// (e.g. the image wasn't populated). Safe to use in client components.
export const mediaAlt = (image: unknown, fallback: string): string => {
  const alt = typeof image === 'object' && image && 'alt' in image ? image.alt : undefined
  return (typeof alt === 'string' && alt.trim()) || fallback
}
