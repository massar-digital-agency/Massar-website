import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import {
  buildBreadcrumbListSchema,
  getBreadcrumbsForRoute,
  type BreadcrumbItem,
} from '@/lib/breadcrumbs'
import { navigateToSection } from '@/lib/navigate'
import { trackEvent } from '@/lib/analytics'

interface BreadcrumbsProps {
  /** Override auto-detected breadcrumbs (e.g. section hierarchy). */
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items: overrideItems, className = 'mb-8' }: BreadcrumbsProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const params = useParams()
  const items =
    overrideItems ?? getBreadcrumbsForRoute(location.pathname, params, t)

  if (!items || items.length === 0) return null

  const schema = buildBreadcrumbListSchema(items)

  const handleSectionClick = (sectionId: string, label: string) => {
    navigateToSection(sectionId)
    trackEvent('nav_click', { nav_section: sectionId, nav_label: label, nav_source: 'breadcrumb' })
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label={t('breadcrumbs.ariaLabel')} className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#52525B]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isCurrent = item.isCurrent ?? isLast

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                )}
                {isCurrent ? (
                  <span className="font-medium text-[#0A0A0A]" aria-current="page">
                    {item.label}
                  </span>
                ) : item.to ? (
                  <Link
                    to={item.to}
                    className="transition-colors underline-offset-2 hover:text-[#8B5CF6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
                  >
                    {item.label}
                  </Link>
                ) : item.sectionId ? (
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item.sectionId!, item.label)}
                    className="transition-colors underline-offset-2 hover:text-[#8B5CF6] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
