// Card details for blog posts, e.g. "05/01/26" and "3 mins read".

// Dates are shown in the time zone chosen in Site Settings (see `getTimeZone`), so a post
// published late evening there doesn't show tomorrow's date. Formatters are built once per zone.
const formatter = (options: Intl.DateTimeFormatOptions) => {
  const byZone = new Map<string, Intl.DateTimeFormat>()
  return (timeZone: string) => {
    let format = byZone.get(timeZone)
    if (!format)
      byZone.set(timeZone, (format = new Intl.DateTimeFormat('en-US', { ...options, timeZone })))
    return format
  }
}

const dateFormat = formatter({ month: '2-digit', day: '2-digit', year: '2-digit' })

export const formatPostDate = (iso: string, timeZone: string) =>
  dateFormat(timeZone).format(new Date(iso))

export const formatReadingTime = (minutes: number | null | undefined) => {
  const value = minutes || 1
  return `${value} ${value === 1 ? 'min' : 'mins'} read`
}

const longDateFormat = formatter({ month: 'long', day: 'numeric', year: 'numeric' })

// e.g. "October 8, 2026"
export const formatLongDate = (iso: string, timeZone: string) =>
  longDateFormat(timeZone).format(new Date(iso))

const dateTimeFormat = formatter({
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

// e.g. "October 8, 2026 at 6:40 am"
export const formatDateTime = (iso: string, timeZone: string) =>
  dateTimeFormat(timeZone)
    .format(new Date(iso))
    .replace(/\b(AM|PM)\b/, (m) => m.toLowerCase())
