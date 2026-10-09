'use client'

import { useActionState, useId, useRef, useState } from 'react'

import { submitComment, type CommentState } from '@/lib/submitComment'
import { COMMENT_MAX, COMMENT_NAME_MAX } from '@/lib/commentLimits'

const initialState: CommentState = { status: 'idle' }

type Props = {
  postId: number
  /** Set for a reply: the approved comment being answered. */
  parentId?: number
  /** Called once a reply's "posted" note has faded out, or when Cancel is pressed. */
  onClose?: () => void
}

const fieldClass =
  'block w-full border-0 border-b border-[#d9d2c9] bg-[#f6f4f1] font-light outline-none transition-colors duration-300 placeholder:text-[#9a948c] focus:border-[var(--color-brown)] focus:bg-[#f2eee9]'

// "Leave a Comment" on a blog post, or a reply to a comment. Sends to a server action; the
// comment is saved as pending and appears on the post once approved in the admin.
export default function CommentForm({ postId, parentId, onClose }: Props) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [length, setLength] = useState(0)
  const isReply = parentId !== undefined

  const [state, formAction, isPending] = useActionState(
    async (prev: CommentState, formData: FormData) => {
      const result = await submitComment(prev, formData)
      if (result.status === 'success') {
        formRef.current?.reset()
        setLength(0)
      }
      return result
    },
    initialState,
  )

  // A posted reply: the box gives way to the note, which closes the reply once it fades out.
  if (isReply && state.status === 'success') {
    return (
      <p
        role="status"
        className="comment-posted py-2 text-[14px]! leading-normal! text-[var(--color-brown)]"
        onAnimationEnd={onClose}
      >
        Reply posted! It will appear here once it has been approved.
      </p>
    )
  }

  const nearLimit = length > COMMENT_MAX * 0.9

  return (
    <form ref={formRef} action={formAction} className="relative max-w-[900px]">
      <input type="hidden" name="postId" value={postId} />
      {isReply && <input type="hidden" name="parentId" value={parentId} />}

      {/* Honeypot: hidden from people, often filled in by spam bots. Kept inside the form
          (`relative` above) so it can never stretch the page. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label htmlFor={`${id}-comment`} className="sr-only">
        {isReply ? 'Reply' : 'Comment'}
      </label>
      <div className="relative">
        <textarea
          id={`${id}-comment`}
          name="comment"
          required
          minLength={2}
          maxLength={COMMENT_MAX}
          rows={isReply ? 3 : 4}
          // A reply box opens on request, so put the cursor straight in it.
          autoFocus={isReply}
          placeholder={isReply ? 'Write your reply…' : 'Share your thoughts…'}
          onChange={(event) => setLength(event.currentTarget.value.length)}
          className={`${fieldClass} resize-y px-4 py-3.5 text-[15px] leading-[1.7] max-[768px]:text-[14px]`}
        />
        {length > 0 && (
          <span
            className={`pointer-events-none absolute right-3 bottom-2 text-[11px] ${nearLimit ? 'text-[var(--color-brown)]' : 'text-[#aaa]'}`}
          >
            {length} / {COMMENT_MAX}
          </span>
        )}
      </div>

      <label htmlFor={`${id}-name`} className="sr-only">
        Your name (optional)
      </label>
      <input
        id={`${id}-name`}
        name="name"
        type="text"
        maxLength={COMMENT_NAME_MAX}
        autoComplete="name"
        placeholder="Your name (optional)"
        className={`${fieldClass} mt-3 max-w-[340px] px-4 py-3 text-[14px]`}
      />

      <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={isPending}
          className={`inline-flex cursor-pointer items-center bg-black text-white transition-opacity duration-300 hover:opacity-85 disabled:cursor-wait disabled:opacity-60 ${
            isReply
              ? 'h-10 px-5 text-[13px]'
              : 'h-11 px-7 text-[14px] max-[768px]:h-10 max-[768px]:px-5 max-[768px]:text-[13px]'
          }`}
        >
          {isPending ? 'Posting…' : 'Post Comment'}
        </button>

        {isReply && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[13px] text-[#777] underline-offset-4 transition-colors hover:text-black hover:underline"
          >
            Cancel
          </button>
        )}

        <p
          role="status"
          aria-live="polite"
          // Keyed by the post time so the fade replays on every new comment.
          key={state.postedAt ?? state.status}
          className={`text-[14px]! leading-normal! ${
            state.status === 'success'
              ? 'comment-posted text-[var(--color-brown)]'
              : state.status === 'error'
                ? 'text-[#b42318]'
                : ''
          }`}
        >
          {state.status === 'success' &&
            'Comment posted! It will appear here once it has been approved.'}
          {state.status === 'error' && state.message}
        </p>
      </div>
    </form>
  )
}
