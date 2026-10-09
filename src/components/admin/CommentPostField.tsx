import type { ServerFieldBase } from 'payload'

// Admin → Comments, edit view: "In response to" as read-only text with a link to the post,
// instead of a dropdown (a comment always stays on the post it was written on).
export async function CommentPostField({ value, payload }: ServerFieldBase & { value?: unknown }) {
  const id = value && typeof value === 'object' ? (value as { id?: number }).id : value
  const post =
    typeof id === 'number' || typeof id === 'string'
      ? await payload
          .findByID({
            collection: 'posts',
            id,
            depth: 0,
            draft: true,
            select: { title: true, slug: true },
          })
          .catch(() => null)
      : null

  return (
    <div className="field-type" style={{ marginBottom: 'var(--spacing-field, 24px)' }}>
      <span className="field-label">In response to</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 16px' }}>
        <strong style={{ fontSize: 15 }}>{post?.title ?? 'Deleted post'}</strong>
        {post?.slug && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b9ee8', fontSize: 13, textDecoration: 'none' }}
          >
            View Post ↗
          </a>
        )}
      </div>
    </div>
  )
}
