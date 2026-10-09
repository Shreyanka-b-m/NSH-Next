import Image from 'next/image'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

import { mediaAlt } from '@/utilities/mediaAlt'
import './BlogContent.css'

// Links the editor made to a post or property ("Internal link") point at its page.
const internalDocToHref = ({ linkNode }: { linkNode: { fields: { doc?: unknown } } }) => {
  const doc = linkNode.fields.doc as { relationTo?: string; value?: unknown } | undefined
  const slug =
    doc?.value && typeof doc.value === 'object' ? (doc.value as { slug?: string }).slug : undefined
  if (!slug) return '/'
  if (doc?.relationTo === 'posts') return `/blog/${slug}`
  if (doc?.relationTo === 'properties') return `/properties/${slug}`
  return '/'
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Blank lines typed between paragraphs would double the spacing the stylesheet already adds.
  paragraph: (args) =>
    args.node.children?.length && typeof defaultConverters.paragraph === 'function'
      ? defaultConverters.paragraph(args)
      : null,
  // Images inside the post go through next/image (resized, AVIF/WebP, lazy-loaded) instead
  // of the default full-size <img>.
  upload: ({ node }) => {
    const doc = node.value
    if (!doc || typeof doc !== 'object' || !('url' in doc) || !doc.url) return null
    const file = doc as {
      url: string
      filename?: string
      mimeType?: string
      width?: number
      height?: number
    }
    if (!file.mimeType?.startsWith('image') || !file.width || !file.height) {
      return (
        <a href={file.url} target="_blank" rel="noopener noreferrer">
          {file.filename}
        </a>
      )
    }
    return (
      <Image
        src={file.url}
        alt={mediaAlt(doc, '')}
        width={file.width}
        height={file.height}
        sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1300px"
      />
    )
  },
})

export default function BlogContent({ data }: { data: SerializedEditorState }) {
  return <RichText data={data} converters={converters} className="blog-content" />
}
