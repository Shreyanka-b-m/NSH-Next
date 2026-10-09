// Card details for blog posts, e.g. "05/01/26" and "3 mins read".

// The business is in Texas, so a post published late evening there doesn't show tomorrow's date.
const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: '2-digit',
  timeZone: 'America/Chicago',
})

export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso))

export const formatReadingTime = (minutes: number | null | undefined) => {
  const value = minutes || 1
  return `${value} ${value === 1 ? 'min' : 'mins'} read`
}

const longDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/Chicago',
})

// e.g. "October 8, 2026"
export const formatLongDate = (iso: string) => longDateFormat.format(new Date(iso))

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Chicago',
})

// e.g. "October 8, 2026 at 6:40 am"
export const formatDateTime = (iso: string) =>
  dateTimeFormat.format(new Date(iso)).replace(/\b(AM|PM)\b/, (m) => m.toLowerCase())
