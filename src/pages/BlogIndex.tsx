import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogSEO } from '@/components/blog/BlogSEO'
import { stagger } from '@/hooks/useAnimationVariants'
import { getAllBlogPosts, paginatePosts } from '@/lib/blog'

const PER_PAGE = 6

export function BlogIndex() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const allPosts = getAllBlogPosts()
  const { items: posts, totalPages, page: currentPage, hasNext, hasPrev } = paginatePosts(allPosts, page, PER_PAGE)

  const goToPage = (p: number) => {
    setSearchParams(p > 1 ? { page: String(p) } : {})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <BlogSEO isIndex />
      <Helmet>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <main id="main-content">
        <section className="py-24 sm:py-32">
          <Container>
            <Breadcrumbs />

            <div className="mx-auto max-w-[700px] text-center mb-16">
              <span className="mb-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
                {t('blog.index.label')}
              </span>
              <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px] mb-5">
                {t('blog.index.title')}
              </h1>
              <p className="text-[15px] leading-[1.75] text-[#52525B] sm:text-[17px] max-w-[560px] mx-auto">
                {t('blog.index.subtitle')}
              </p>
            </div>

            {posts.length > 0 ? (
              <>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {posts.map((post) => (
                    <BlogCard key={post.meta.slug} meta={post.meta} />
                  ))}
                </motion.div>

                {totalPages > 1 && (
                  <nav aria-label={t('blog.index.pagination')} className="mt-12 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={!hasPrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                      aria-label={t('blog.index.previous')}
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <span className="text-[14px] text-[#71717A]">
                      {t('blog.index.page')} {currentPage} {t('blog.index.of')} {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={!hasNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                      aria-label={t('blog.index.next')}
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#71717A]">{t('blog.index.noArticles')}</p>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  )
}
