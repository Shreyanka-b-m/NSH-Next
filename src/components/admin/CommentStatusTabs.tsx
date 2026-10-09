import Link from 'next/link'
import type { Payload } from 'payload'

type Props = {
  payload: Payload
  searchParams?: Record<string, unknown>
}

const STATUSES = [
  { value: undefined, label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'spam', label: 'Spam' },
] as const

// The query can arrive flat ("where[post][equals]") or already nested ({ where: { post: … } }).
const filterValue = (searchParams: Props['searchParams'], field: string) => {
  const flat = searchParams?.[`where[${field}][equals]`]
  if (typeof flat === 'string') return flat
  const where = searchParams?.where as Record<string, { equals?: unknown }> | undefined
  const nested = where?.[field]?.equals
  return typeof nested === 'string' ? nested : undefined
}

// Above the Admin → Comments list: "All (4) | Pending (1) | Approved (2) | Spam (1)" quick
// filters, kept within one post when the list was opened from that post's Comments column.
export async function CommentStatusTabs({ payload, searchParams }: Props) {
  const status = filterValue(searchParams, 'status')
  const postFilter = filterValue(searchParams, 'post')
  const postId = postFilter && /^\d+$/.test(postFilter) ? Number(postFilter) : undefined

  const forPost = postId ? [{ post: { equals: postId } }] : []
  const [counts, post] = await Promise.all([
    Promise.all(
      STATUSES.map(({ value }) =>
        payload
          .count({
            collection: 'comments',
            where: { and: [...forPost, ...(value ? [{ status: { equals: value } }] : [])] },
          })
          .then((result) => result.totalDocs),
      ),
    ),
    postId
      ? payload
          .findByID({ collection: 'posts', id: postId, depth: 0, select: { title: true } })
          .catch(() => null)
      : null,
  ])

  const base = `${payload.config.routes.admin}/collections/comments`
  const hrefFor = (value?: string) => {
    const query = [
      postId && `where[post][equals]=${postId}`,
      value && `where[status][equals]=${value}`,
    ].filter(Boolean)
    return query.length ? `${base}?${query.join('&')}` : base
  }

  return (
    <div style={{ marginBottom: 16, fontSize: 14 }}>
      {post && (
        <p style={{ margin: '0 0 8px', color: 'var(--theme-elevation-600)' }}>
          Comments on <strong>{post.title}</strong> ·{' '}
          <Link
            href={status ? `${base}?where[status][equals]=${status}` : base}
            style={{ color: '#8a561f' }}
          >
            Show all posts
          </Link>
        </p>
      )}
      <nav aria-label="Filter comments by status" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {STATUSES.map(({ value, label }, index) => {
          const active = status === value
          return (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {index > 0 && (
                <span style={{ margin: '0 8px', color: 'var(--theme-elevation-300)' }}>|</span>
              )}
              <Link
                href={hrefFor(value)}
                aria-current={active ? 'page' : undefined}
                style={{
                  color: active ? 'var(--theme-text)' : '#8a561f',
                  fontWeight: active ? 600 : 400,
                  textDecoration: 'none',
                }}
              >
                {label} <span style={{ color: 'var(--theme-elevation-500)' }}>({counts[index]})</span>
              </Link>
            </span>
          )
        })}
      </nav>
    </div>
  )
}
