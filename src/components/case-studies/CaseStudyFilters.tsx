interface CaseStudyFiltersProps {
  tags: string[]
  selectedTags: string[]
  onToggleTag: (tag: string) => void
}

export default function CaseStudyFilters({ tags, selectedTags, onToggleTag }: CaseStudyFiltersProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag)

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'border-white bg-white text-slate-900'
                : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}