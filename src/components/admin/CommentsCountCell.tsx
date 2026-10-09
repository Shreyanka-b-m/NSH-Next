import Link from 'next/link'
import type { DefaultServerCellComponentProps } from 'payload'

// Admin → Blog Posts list, "Comments" column: the post's comment count (brown pill) and how
// many still wait for approval. Clicking it opens Admin → Comments filtered to this post.
export async function CommentsCountCell({ rowData, payload }: DefaultServerCellComponentProps) {
  const postId = rowData?.id
  if (!postId) return null

  const [{ totalDocs: total }, { totalDocs: pending }] = await Promise.all([
    payload.count({ collection: 'comments', where: { post: { equals: postId } } }),
    payload.count({
      collection: 'comments',
      where: { and: [{ post: { equals: postId } }, { status: { equals: 'pending' } }] },
    }),
  ])

  const href = `${payload.config.routes.admin}/collections/comments?where[post][equals]=${postId}`

  return (
    <Link
      href={href}
      title="View the comments on this post"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
    >
      <span
        style={{
          minWidth: 28,
          padding: '2px 9px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          textAlign: 'center',
          color: total ? '#fff' : 'var(--theme-elevation-500)',
          background: total ? '#8a561f' : 'transparent',
          border: total ? '1px solid #8a561f' : '1px solid var(--theme-elevation-200)',
        }}
      >
        {total}
      </span>
      {pending > 0 && (
        <span style={{ fontSize: 12, fontWeight: 500, color: '#d97706' }}>{pending} pending</span>
      )}
    </Link>
  )
}
