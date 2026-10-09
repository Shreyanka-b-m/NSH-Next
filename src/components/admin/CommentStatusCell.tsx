import type { DefaultServerCellComponentProps } from 'payload'

const STYLES: Record<string, { label: string; color: string; background: string }> = {
  pending: { label: 'Pending', color: '#92400e', background: '#fde68a' },
  approved: { label: 'Approved', color: '#166534', background: '#dcfce7' },
  spam: { label: 'Spam', color: '#6b7280', background: '#f3f4f6' },
}

// Admin → Comments list, "Status" column. `data-comment-status` lets custom.scss highlight
// the whole row of a comment that still waits for approval.
export function CommentStatusCell({ cellData }: DefaultServerCellComponentProps) {
  const status = typeof cellData === 'string' ? cellData : 'pending'
  const style = STYLES[status] ?? STYLES.pending

  return (
    <span
      data-comment-status={status}
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: style.color,
        background: style.background,
      }}
    >
      {style.label}
    </span>
  )
}
