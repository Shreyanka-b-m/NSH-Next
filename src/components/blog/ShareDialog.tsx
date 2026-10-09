'use client'

import { useRef, useState } from 'react'

import { shareLinks } from '@/utilities/share'
import {
  CloseIcon,
  FacebookBrandIcon,
  LinkedInBrandIcon,
  LinkIcon,
  MailIcon,
  ShareIcon,
  WhatsAppBrandIcon,
  XBrandIcon,
} from './ShareIcons'

// The "Share" button and its popup. Uses the browser's own <dialog> (focus trap, Esc to close)
// so no extra library is needed.
export default function ShareDialog({ url, title }: { url: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [copied, setCopied] = useState(false)
  const links = shareLinks(url, title)

  const options = [
    { label: 'LinkedIn', href: links.linkedin, Icon: LinkedInBrandIcon },
    { label: 'X', href: links.x, Icon: XBrandIcon },
    { label: 'Facebook', href: links.facebook, Icon: FacebookBrandIcon },
    { label: 'WhatsApp', href: links.whatsapp, Icon: WhatsAppBrandIcon },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (e.g. insecure context): the URL is still visible to copy by hand.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex h-11 cursor-pointer items-center gap-2.5 border border-[#ccc] bg-[#fafafa] px-5 text-[15px] transition-colors duration-300 hover:border-black max-[768px]:h-8 max-[768px]:gap-1.5 max-[768px]:px-3 max-[768px]:text-[13px]"
      >
        <ShareIcon className="h-5 w-5 max-[768px]:h-4 max-[768px]:w-4" />
        Share
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="share-dialog-title"
        // Clicking the dimmed backdrop (the dialog element itself) closes it.
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(440px,calc(100%-32px))] bg-white p-0 opacity-0 shadow-2xl transition-[opacity,translate,display,overlay] transition-discrete duration-300 backdrop:bg-black/50 open:translate-y-0 open:opacity-100 starting:open:translate-y-3 starting:open:opacity-0"
      >
        <div className="p-7 max-[768px]:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p id="share-dialog-title" className="text-[20px]! leading-tight! font-medium">
                Share this article
              </p>
              <p className="mt-1 line-clamp-2 text-[13px]! leading-normal! text-[#777]">{title}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="-mt-1 -mr-1 cursor-pointer p-1 text-[#555] transition-colors hover:text-black"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-4 gap-3 max-[400px]:grid-cols-2">
            {options.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 py-2 text-[12px] text-[#444] transition-opacity hover:opacity-75"
                >
                  <Icon className="h-10 w-10" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={links.email}
            className="mt-4 flex items-center gap-3 border-t border-[#eee] pt-4 text-[14px] text-[#444] transition-colors hover:text-black"
          >
            <MailIcon className="h-5 w-5" />
            Send by email
          </a>

          <div className="mt-5 flex items-stretch border border-[#ddd]">
            <input
              readOnly
              value={url}
              aria-label="Article link"
              onFocus={(event) => event.currentTarget.select()}
              className="min-w-0 flex-1 bg-[#fafafa] px-3 text-[13px] text-[#555] outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex w-[110px] shrink-0 cursor-pointer items-center justify-center gap-2 bg-black py-2.5 text-[13px] text-white transition-opacity hover:opacity-85"
            >
              <LinkIcon className="h-4 w-4" />
              <span aria-live="polite">{copied ? 'Copied!' : 'Copy link'}</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
