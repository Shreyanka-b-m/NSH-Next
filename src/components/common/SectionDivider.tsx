export default function SectionDivider({ variant = 'brown' }: { variant?: 'brown' | 'black' }) {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className={`section-divider ${variant === 'black' ? 'section-divider--black' : ''}`} />
    </div>
  )
}
