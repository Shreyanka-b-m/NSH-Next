// Share links for a page. They open each network's own share screen, so the site loads no
// third-party scripts. Safe to use in client components.
export type ShareNetwork = 'linkedin' | 'x' | 'facebook' | 'whatsapp' | 'email'

export const shareLinks = (url: string, title: string): Record<ShareNetwork, string> => {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    x: `https://x.com/intent/tweet?url=${u}&text=${t}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    email: `mailto:?subject=${t}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
  }
}
