// Shorten to at most `max` characters, cut at a word boundary (never mid-word), then add "…".
export const truncateWords = (text: string, max: number) => {
  if (text.length <= max) return text
  // One extra character tells us whether the cut already falls on a word boundary.
  const cut = text.slice(0, max + 1)
  const space = cut.lastIndexOf(' ')
  const kept = space > 0 ? cut.slice(0, space) : text.slice(0, max)
  return `${kept.replace(/[\s,.;:–-]+$/, '')}…`
}

// Same, but the "…" counts towards `max` (for length limits such as SEO titles).
export const fitWords = (text: string, max: number) =>
  text.length <= max ? text : truncateWords(text, max - 1)
