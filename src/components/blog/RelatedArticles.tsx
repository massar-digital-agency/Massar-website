import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import type { BlogPost } from '@/types/blog'

interface RelatedArticlesProps {
  posts: BlogPost[]
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  const { t } = useTranslation()

  if (posts.length === 0) return null

  return (
    <section className="mt-16 sm:mt-20 border-t border-[#E4E4E7] pt-12 sm:pt-16">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
        <motion.h2 variants={fadeUp} className="text-[20px] font-bold text-[#0A0A0A] sm:text-[24px] mb-8">
          {t('blog.index.relatedArticles')}
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <motion.div key={post.meta.slug} variants={fadeUp}>
              <Link
                to={`/blog/${post.meta.slug}`}
                className="group block rounded-xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.meta.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-[#F3F0FF] px-2.5 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[15px] font-bold leading-[1.35] text-[#0A0A0A] group-hover:text-[#8B5CF6] transition-colors duration-200 mb-2">
                  {post.meta.title}
                </h3>
                <p className="text-[13px] text-[#71717A] line-clamp-2 mb-3">
                  {post.meta.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[12px] text-[#8B5CF6] font-medium">
                  {t('blog.index.readMore')}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
