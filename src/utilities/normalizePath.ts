// Turns what an editor types or a visitor requests into one comparable form:
// "https://novelsignaturehomes.com/Gallery/?x=1" → "/gallery". Safe to use anywhere.
export const normalizePath = (value: string): string => {
  let path = value.trim()
  if (/^https?:\/\//i.test(path)) {
    try {
      path = new URL(path).pathname
    } catch {
      // Not a valid URL: treat it as a path.
    }
  }
  path = path.split(/[?#]/)[0]
  if (!path.startsWith('/')) path = `/${path}`
  return (path.replace(/\/+$/, '') || '/').toLowerCase()
}
