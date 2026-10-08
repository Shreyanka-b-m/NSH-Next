// The double arrow used after "View Property" / "Read More" links.
export default function ChevronsRight({ className = 'h-3 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M1 2 5 6 1 10M6 2l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
