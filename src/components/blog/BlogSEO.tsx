import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SEO_CONFIG, getOgImage } from '@/lib/seo'
import type { BlogMeta } from '@/types/blog'

interface BlogSEOProps {
  meta?: BlogMeta
  isIndex?: boolean
}

export function BlogSEO({ meta, isIndex }: BlogSEOProps) {
  const { i18n } = useTranslation()

  if (isIndex) {
    const url = `${SEO_CONFIG.siteUrl}/blog`
    const title = `Blog | ${SEO_CONFIG.siteName}`
    const description = 'Read expert articles about web development, SEO, design, and digital strategy from Massar Digital Studio.'
    const ogImage = getOgImage(i18n.language)
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
    )
  }

  if (!meta) return null

  const url = `${SEO_CONFIG.siteUrl}/blog/${meta.slug}`
  const title = `${meta.title} | ${SEO_CONFIG.siteName}`
  const description = meta.description
  const ogImage = meta.featuredImage
    ? `${SEO_CONFIG.siteUrl}${meta.featuredImage}`
    : getOgImage(i18n.language)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: ogImage,
    datePublished: meta.publishedAt,
    dateModified: meta.publishedAt,
    author: {
      '@type': 'Person',
      name: meta.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/images/og-imageFavIcon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="article:published_time" content={meta.publishedAt} />
      <meta property="article:author" content={meta.author.name} />
      {meta.tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
    </Helmet>
  )
}
