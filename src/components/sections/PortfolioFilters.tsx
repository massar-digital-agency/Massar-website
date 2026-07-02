import { useTranslation } from 'react-i18next'

interface FilterOption {
  value: string
  label: string
}

interface PortfolioFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function PortfolioFilters({ activeFilter, onFilterChange }: PortfolioFiltersProps) {
  const { t } = useTranslation()

  const filters: FilterOption[] = [
    { value: 'all', label: t('projects.label') },
    { value: 'Website + App + Branding', label: 'Full Ecosystem' },
    { value: 'Website development', label: 'Websites' },
    { value: 'Mobile App Development', label: 'Mobile Apps' },
    { value: 'Brand Identity', label: 'Branding' },
  ]

  return (
    <div className="mb-8 sm:mb-10" role="group" aria-label="Filter projects by category">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 ${
              activeFilter === filter.value
                ? 'border-[#8B5CF6] bg-[#F3F0FF] text-[#8B5CF6]'
                : 'border-[#E4E4E7] bg-white text-[#71717A] hover:border-[#D4D4D8] hover:text-[#52525B]'
            }`}
            aria-pressed={activeFilter === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
