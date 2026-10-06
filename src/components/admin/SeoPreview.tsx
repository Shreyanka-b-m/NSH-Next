'use client'

import { useDocumentInfo, useFormFields, useTheme } from '@payloadcms/ui'
import React from 'react'

import { SERVER_URL } from '@/lib/serverURL'

const SITE_NAME = 'Novel Signature Homes'

// Google's own search-result colours for its light and dark themes.
const COLORS = {
  light: {
    background: '#ffffff',
    border: '#dadce0',
    siteName: '#202124',
    url: '#4d5156',
    title: '#1a0dab',
    text: '#4d5156',
    faviconBg: '#f1f3f4',
  },
  dark: {
    background: '#1f1f1f',
    border: '#3c4043',
    siteName: '#dadce0',
    url: '#bdc1c6',
    title: '#99c3ff',
    text: '#bdc1c6',
    faviconBg: '#303134',
  },
}

const fontFamily = 'Arial, sans-serif'

// Replaces the SEO plugin's default preview with one laid out like a Google search result.
// Empty meta fields fall back to the same values the website uses (see generateMetadata).
export const SeoPreview: React.FC = () => {
  const { theme } = useTheme()
  const { collectionSlug } = useDocumentInfo()
  const c = COLORS[theme === 'dark' ? 'dark' : 'light']

  const metaTitle = useFormFields(([fields]) => fields['meta.title']?.value as string | undefined)
  const metaDescription = useFormFields(
    ([fields]) => fields['meta.description']?.value as string | undefined,
  )
  const name = useFormFields(([fields]) => fields.name?.value as string | undefined)
  const siteName = useFormFields(([fields]) => fields.siteName?.value as string | undefined)
  const description = useFormFields(([fields]) => fields.description?.value as string | undefined)
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)

  // Same fallbacks as the website: a property name gets the site-name suffix from the layout.
  const title = metaTitle || (name ? `${name} | ${SITE_NAME}` : siteName || SITE_NAME)
  const text = metaDescription || description || ''
  const host = SERVER_URL.replace(/^https?:\/\//, '')
  const breadcrumb = [collectionSlug, slug].filter(Boolean).join(' › ')

  return (
    <div style={{ marginBottom: 20 }}>
      <div>Preview</div>
      <div style={{ color: 'var(--theme-elevation-500)', marginBottom: 8 }}>
        How this page may appear in Google search results.
      </div>

      <div
        style={{
          background: c.background,
          border: `1px solid ${c.border}`,
          borderRadius: 8,
          fontFamily,
          maxWidth: 652,
          padding: '20px 24px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex', gap: 12, marginBottom: 6 }}>
          <span
            style={{
              alignItems: 'center',
              background: c.faviconBg,
              border: `1px solid ${c.border}`,
              borderRadius: '50%',
              display: 'flex',
              flexShrink: 0,
              height: 28,
              justifyContent: 'center',
              width: 28,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/favicon.ico" style={{ height: 18, width: 18 }} />
          </span>
          <div style={{ lineHeight: '20px', minWidth: 0 }}>
            <div style={{ color: c.siteName, fontSize: 14 }}>{SITE_NAME}</div>
            <div
              style={{
                color: c.url,
                fontSize: 12,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {SERVER_URL.startsWith('https') ? 'https://' : 'http://'}
              {host}
              {breadcrumb && ` › ${breadcrumb}`}
            </div>
          </div>
        </div>

        {/* Google cuts titles to one line and descriptions to two. */}
        <div
          style={{
            color: c.title,
            fontSize: 20,
            lineHeight: '26px',
            marginBottom: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: c.text,
            display: '-webkit-box',
            fontSize: 14,
            lineHeight: '22px',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}
