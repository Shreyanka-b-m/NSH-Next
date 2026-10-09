'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import CommentForm from './CommentForm'

type ReplyState = { openId: number | null; setOpenId: (id: number | null) => void }

const ReplyContext = createContext<ReplyState>({ openId: null, setOpenId: () => {} })

// Wraps the comment list so only one reply box is open at a time.
export function ReplyProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null)
  return <ReplyContext.Provider value={{ openId, setOpenId }}>{children}</ReplyContext.Provider>
}

type Props = { postId: number; commentId: number; authorName: string }

// The "Reply" link under an approved comment, and the reply box it opens.
export function CommentReply({ postId, commentId, authorName }: Props) {
  const { openId, setOpenId } = useContext(ReplyContext)
  const open = openId === commentId
  const close = () => setOpenId(null)

  return (
    <div className="mt-2.5">
      {!open && (
        <button
          type="button"
          onClick={() => setOpenId(commentId)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-medium tracking-[0.08em] text-[var(--color-brown)] uppercase transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
            <path
              d="M6 4 2 8l4 4M2.5 8H10a4 4 0 0 1 4 4v1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Reply
        </button>
      )}

      {open && (
        <div className="mt-2 border-l-2 border-[var(--color-brown)] pl-5 transition-[opacity,translate] duration-300 starting:-translate-y-1 starting:opacity-0 max-[768px]:pl-3.5">
          <p className="mb-3 text-[13px]! leading-normal! text-[#777]">
            Replying to <span className="font-medium text-black">{authorName}</span>
          </p>
          <CommentForm postId={postId} parentId={commentId} onClose={close} />
        </div>
      )}
    </div>
  )
}
