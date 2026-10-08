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
