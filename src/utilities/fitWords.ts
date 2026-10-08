// Cut at a word boundary (never mid-word) and mark the cut.
export const fitWords = (text: string, max: number) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:–-]+$/, '')}…`
}
