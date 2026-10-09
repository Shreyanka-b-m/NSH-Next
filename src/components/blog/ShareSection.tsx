import ShareDialog from './ShareDialog'
import { FacebookBrandIcon, LinkedInBrandIcon, XBrandIcon } from './ShareIcons'
import { shareLinks } from '@/utilities/share'

// "Like what you read? Share it." The three brand buttons are plain links (no JavaScript);
// only the "Share" popup is a client component.
export default function ShareSection({ url, title }: { url: string; title: string }) {
  const links = shareLinks(url, title)
  const networks = [
    { label: 'LinkedIn', href: links.linkedin, Icon: LinkedInBrandIcon },
    { label: 'X', href: links.x, Icon: XBrandIcon },
    { label: 'Facebook', href: links.facebook, Icon: FacebookBrandIcon },
  ]

  return (
    <div>
      <p className="text-[19px]! leading-normal! font-medium max-[768px]:text-[17px]!">Like what you read? Share it.</p>

      <div className="mt-5 flex flex-wrap items-center gap-5 max-[768px]:mt-4 max-[768px]:gap-3.5">
        {networks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Icon className="h-10 w-10 max-[768px]:h-8 max-[768px]:w-8" />
          </a>
        ))}

        <ShareDialog url={url} title={title} />
      </div>
    </div>
  )
}
