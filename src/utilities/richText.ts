// Helpers for Lexical rich text (the editor's saved JSON). Safe to use anywhere.

type LexicalNode = { text?: unknown; children?: unknown }

const collectText = (node: unknown, parts: string[]) => {
  if (!node || typeof node !== 'object') return
  const { text, children } = node as LexicalNode
  if (typeof text === 'string') parts.push(text)
  // Each paragraph/heading/list item is its own child, so join them with spaces.
  if (Array.isArray(children)) children.forEach((child) => collectText(child, parts))
}

/** The plain words of a rich text value, e.g. for a summary or a word count. */
export const richTextToPlain = (value: unknown): string => {
  const parts: string[] = []
  collectText((value as { root?: unknown } | null)?.root, parts)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

const WORDS_PER_MINUTE = 200

/** Reading time in whole minutes (at least 1). */
export const readingMinutes = (value: unknown): number => {
  const words = richTextToPlain(value).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
