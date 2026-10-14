'use client'

import { useId, useState, type ReactNode } from 'react'

type Props = {
  /** Cards shown straight away. */
  first: ReactNode[]
  /** Older cards, shown after "Show all blogs" is clicked. */
  rest: ReactNode[]
}

// The card grid of "Explore More". Only the button is interactive; the cards are rendered on
// the server and passed in.
export default function ExploreMoreGrid({ first, rest }: Props) {
  const [showAll, setShowAll] = useState(false)
  const gridId = useId()

  return (
    <>
      <div
        id={gridId}
        className="grid grid-cols-1 gap-x-3 gap-y-10 min-[769px]:grid-cols-2 min-[977px]:grid-cols-3"
      >
        {first}
        {showAll && rest}
      </div>

      {rest.length > 0 && !showAll && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="btn btn-dark"
            aria-controls={gridId}
            aria-expanded={showAll}
            onClick={() => setShowAll(true)}
          >
            Show all blogs
          </button>
        </div>
      )}
    </>
  )
}
