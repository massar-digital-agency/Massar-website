/**
 * Generates sitemap.xml with multilingual hreflang alternates.
 * Run automatically as part of the production build.
 */
import { writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, resolve, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_URL = 'https://massardigital.com'
const LANGUAGES = ['en', 'fr', 'ar']
const CASE_STUDY_SLUGS = ['journeya', 'wafr', 'darlink', 'nextgen']

const CONTENT_DIR = resolve(__dirname, '../src/content/blog')

/** Read blog post slugs dynamically from MDX files in the content directory. */
function getBlogSlugs() {
  try {
    const files = readdirSync(CONTENT_DIR)
    return files
      .filter((f) => extname(f) === '.mdx')
      .map((f) => basename(f, '.mdx'))
  } catch {
    console.warn('⚠ Blog content directory not found; using fallback slugs.')
    return ['how-to-improve-seo', 'react-performance-guide']
  }
}

const BLOG_SLUGS = getBlogSlugs()

const ROUTES = [
  { path: '', changefreq: 'monthly', priority: '1.0' },
  { path: '#services', changefreq: 'monthly', priority: '0.9' },
  { path: '#projects', changefreq: 'monthly', priority: '0.9' },
  { path: '#contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/#/about', changefreq: 'monthly', priority: '0.8' },
  ...CASE_STUDY_SLUGS.map((slug) => ({
    path: `/#/case-studies/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  ...BLOG_SLUGS.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  { path: '/careers', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/#/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/#/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/#/cookies', changefreq: 'yearly', priority: '0.3' },
]

function buildAbsoluteUrl(path) {
  return `${SITE_URL}${path}`
}

function buildHreflangLinks(absoluteUrl) {
  const separator = absoluteUrl.includes('?') ? '&' : '?'
  return [
    { lang: 'x-default', href: absoluteUrl },
    ...LANGUAGES.map((lang) => ({
      lang,
      href: `${absoluteUrl}${separator}lang=${lang}`,
    })),
  ]
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateSitemapXml() {
  const urls = ROUTES.map(({ path, changefreq, priority }) => {
    const loc = buildAbsoluteUrl(path)
    const hreflangLinks = buildHreflangLinks(loc)
    const alternates = hreflangLinks
      .map(
        ({ lang, href }) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
      )
      .join('\n')

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n\n')}
</urlset>
`
}

const outputPaths = [
  resolve(__dirname, '../public/sitemap.xml'),
  resolve(__dirname, '../dist/sitemap.xml'),
]

const xml = generateSitemapXml()

for (const outputPath of outputPaths) {
  try {
    mkdirSync(dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, xml, 'utf-8')
    console.log(`✓ sitemap.xml written to ${outputPath}`)
  } catch (error) {
    if (outputPath.includes('/dist/')) {
      console.log(`ℹ dist/ not found yet — sitemap will be copied from public/ during build`)
    } else {
      throw error
    }
  }
}
