// Structured data for search engines. Escaping "<" stops text from content (e.g. a property
// description) from closing the script tag early. Browsers don't run it: no JavaScript cost.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
