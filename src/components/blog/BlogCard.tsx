import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp } from '@/hooks/useAnimationVariants'
import type { BlogMeta } from '@/types/blog'

interface BlogCardProps {
  meta: BlogMeta
}

export function BlogCard({ meta }: BlogCardProps) {
  const { t, i18n } = useTranslation()

  return (
    <motion.article
      variants={fadeUp}
      className="group rounded-2xl border border-[#E4E4E7] bg-white overflow-hidden transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
    >
      <Link to={`/blog/${meta.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-inset">
        <div className="aspect-[16/9] bg-[#F3F0FF] flex items-center justify-center overflow-hidden">
          <div className="text-[#8B5CF6]/30 text-6xl font-bold font-heading">
            {meta.slug.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {meta.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-[#F3F0FF] px-3 py-1 text-[11px] font-medium text-[#8B5CF6]">
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 text-[12px] text-[#71717A]">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {meta.readingTime}
            </span>
          </div>
          <h3 className="text-[17px] font-bold leading-[1.35] text-[#0A0A0A] group-hover:text-[#8B5CF6] transition-colors duration-200 mb-2">
            {meta.title}
          </h3>
          <p className="text-[14px] leading-[1.7] text-[#71717A] line-clamp-2 mb-4">
            {meta.description}
          </p>
          <div className="flex items-center justify-between text-[13px] text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {new Date(meta.publishedAt).toLocaleDateString(i18n.language === 'ar' ? 'ar-DZ' : i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1 text-[#8B5CF6] font-medium">
              {t('blog.index.readMore')}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
