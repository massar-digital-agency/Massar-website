interface CaseStudyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function CaseStudyPagination({ currentPage, totalPages, onPageChange }: CaseStudyPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Case study pagination" className="mt-10 flex justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            page === currentPage
              ? 'bg-white text-slate-900'
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  )
}