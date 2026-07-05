import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${window.location.origin}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <nav aria-label={t('blog.index.breadcrumbs')} className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-[#71717A]">
          <li>
            <Link to="/" className="hover:text-[#8B5CF6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded">
              {t('nav.home')}
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight className={`h-3.5 w-3.5 text-[#A1A1AA] ${isRtl ? 'rotate-180' : ''}`} aria-hidden="true" />
              {item.href ? (
                <Link to={item.href} className="hover:text-[#8B5CF6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#0A0A0A] font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
