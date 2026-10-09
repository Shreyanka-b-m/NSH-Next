import type { Comment } from '@/payload-types'
import { formatDateTime } from '@/utilities/postMeta'
import CommentForm from './CommentForm'
import { CommentReply, ReplyProvider } from './CommentReply'

type ApprovedComment = Pick<Comment, 'id' | 'name' | 'comment' | 'createdAt' | 'parent'>

type Props = {
  postId: number
  comments: ApprovedComment[]
}

type Thread = { comment: ApprovedComment; replies: { comment: ApprovedComment; to?: string }[] }

const parentIdOf = (comment: ApprovedComment) =>
  comment.parent && typeof comment.parent === 'object' ? comment.parent.id : comment.parent

const nameOf = (comment: ApprovedComment) => comment.name || 'Anonymous'

// Groups replies under the top-level comment they belong to (one level of indent, so threads
// stay readable on phones). A reply whose parent isn't approved (any more) isn't shown.
const toThreads = (comments: ApprovedComment[]): Thread[] => {
  const byId = new Map(comments.map((comment) => [comment.id, comment]))
  const threads = new Map<number, Thread>()
  for (const comment of comments) {
    if (!parentIdOf(comment)) threads.set(comment.id, { comment, replies: [] })
  }

  for (const comment of comments) {
    const parentId = parentIdOf(comment)
    if (!parentId) continue
    // Walk up to the top-level comment; give up on a missing (unapproved) link or a loop.
    let current: ApprovedComment | undefined = comment
    const seen = new Set<number>()
    while (current && parentIdOf(current) && !seen.has(current.id)) {
      seen.add(current.id)
      current = byId.get(parentIdOf(current) as number)
    }
    const thread = current && !parentIdOf(current) ? threads.get(current.id) : undefined
    if (!thread) continue
    const parent = byId.get(parentId)
    // "↳ Name" only when answering a reply; under its own comment it's obvious.
    thread.replies.push({
      comment,
      to: parentId !== thread.comment.id ? parent && nameOf(parent) : undefined,
    })
  }

  return [...threads.values()]
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  const initial = name !== 'Anonymous' ? name.trim().charAt(0).toUpperCase() : null
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#ece6df] text-[var(--color-brown)] [font-family:var(--font-heading)] ${
        small
          ? 'h-9 w-9 text-[15px] max-[768px]:h-8 max-[768px]:w-8'
          : 'h-12 w-12 text-[18px] max-[768px]:h-10 max-[768px]:w-10'
      }`}
    >
      {initial ?? (
        <svg viewBox="0 0 24 24" className={small ? 'h-5 w-5' : 'h-6 w-6'} fill="#c4b8aa">
          <circle cx="12" cy="8.5" r="4" />
          <path d="M4 20.5c0-4.1 3.6-6.5 8-6.5s8 2.4 8 6.5z" />
        </svg>
      )}
    </span>
  )
}

function CommentBody({
  postId,
  comment,
  to,
  small = false,
}: {
  postId: number
  comment: ApprovedComment
  to?: string
  small?: boolean
}) {
  const name = nameOf(comment)
  return (
    <div className={`flex ${small ? 'gap-3' : 'gap-4 max-[768px]:gap-3'}`}>
      <Avatar name={name} small={small} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-[15px]! leading-normal! font-medium">
            {name}
            {to && <span className="ml-2 text-[13px] font-normal text-[#999]">↳ {to}</span>}
          </p>
          <time dateTime={comment.createdAt} className="text-[12px] text-[#999]">
            {formatDateTime(comment.createdAt)}
          </time>
        </div>
        <p className="mt-1.5 text-[15px]! leading-[1.75]! font-light break-words whitespace-pre-line text-[#333] max-[768px]:text-[14px]!">
          {comment.comment}
        </p>
        <CommentReply postId={postId} commentId={comment.id} authorName={name} />
      </div>
    </div>
  )
}

// "Leave a Comment" form, then the approved comments and replies (the only ones ever sent to
// the page).
export default function CommentsSection({ postId, comments }: Props) {
  const threads = toThreads(comments)
  const shown = threads.reduce((total, thread) => total + 1 + thread.replies.length, 0)

  return (
    <section aria-labelledby="leave-comment" className="mt-16 max-[768px]:mt-12">
      <h2
        id="leave-comment"
        className="text-[22px]! leading-normal! font-medium [font-family:var(--font-body)]! max-[768px]:text-[19px]!"
      >
        Leave a Comment
      </h2>
      <p className="mt-1 mb-5 text-[13px]! leading-normal! text-[#888]">
        Comments are reviewed before they appear.
      </p>

      <CommentForm postId={postId} />

      {threads.length > 0 && (
        <div className="mt-16 max-w-[900px] max-[768px]:mt-12">
          <h2 className="text-[22px]! leading-normal! font-medium [font-family:var(--font-body)]! max-[768px]:text-[19px]!">
            Comments <span className="text-[#999]">({shown})</span>
          </h2>

          <ReplyProvider>
            <ol className="mt-6">
              {threads.map((thread) => (
                <li
                  key={thread.comment.id}
                  className="border-t border-[#eee] py-6 first:border-t-0 first:pt-2"
                >
                  <CommentBody postId={postId} comment={thread.comment} />

                  {thread.replies.length > 0 && (
                    <ol className="mt-5 ml-16 space-y-5 border-l border-[#e6ddd2] pl-6 max-[768px]:ml-5 max-[768px]:pl-4">
                      {thread.replies.map(({ comment, to }) => (
                        <li key={comment.id}>
                          <CommentBody postId={postId} comment={comment} to={to} small />
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </ReplyProvider>
        </div>
      )}
    </section>
  )
}
