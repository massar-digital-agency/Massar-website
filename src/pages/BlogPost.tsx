import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { BlogSEO } from '@/components/blog/BlogSEO'
import { RelatedArticles } from '@/components/blog/RelatedArticles'
import { Section } from '@/components/ui/Section'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { getBlogPost, getRelatedPosts } from '@/lib/blog'
import { SEO_CONFIG } from '@/lib/seo'
import { trackPageView, trackEvent } from '@/lib/analytics'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()

  const post = useMemo(() => (slug ? getBlogPost(slug) : undefined), [slug])

  useEffect(() => {
    if (slug) {
      trackPageView(`/blog/${slug}`, `${post?.meta.title || slug} - ${t('seo.title')}`)
    }
  }, [slug, post?.meta.title, t])

  if (!post) {
    return (
      <main id="main-content">
        <Section>
          <Container narrow>
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-[#0A0A0A] mb-4">
                {t('blog.index.notFound')}
              </h1>
              <p className="text-[#71717A] mb-8">
                {t('blog.index.notFoundDesc')}
              </p>
              <Button variant="primary" href="/blog">
                {t('blog.index.backToBlog')}
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    )
  }

  const { meta, Component } = post
  const relatedPosts = getRelatedPosts(post, 2)

  return (
    <>
      <BlogSEO meta={meta} />

      <main id="main-content">
        <article className="py-24 sm:py-32">
          <Container narrow>
            <Breadcrumbs
              items={[
                { label: t('breadcrumbs.home'), to: '/', canonicalUrl: SEO_CONFIG.siteUrl },
                { label: t('breadcrumbs.blog'), to: '/blog', canonicalUrl: `${SEO_CONFIG.siteUrl}/blog` },
                { label: meta.title, canonicalUrl: `${SEO_CONFIG.siteUrl}/blog/${meta.slug}`, isCurrent: true },
              ]}
            />

            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <div className="flex flex-wrap gap-2 mb-4">
                {meta.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#F3F0FF] px-3 py-1 text-[11px] font-medium text-[#8B5CF6]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[36px] lg:text-[44px] mb-6">
                {meta.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#71717A] mb-8 pb-8 border-b border-[#E4E4E7]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={meta.publishedAt}>
                    {new Date(meta.publishedAt).toLocaleDateString(
                      i18n.language === 'ar' ? 'ar-DZ' : i18n.language === 'fr' ? 'fr-FR' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {meta.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {t('blog.index.by')} {meta.author.name}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="prose prose-sm sm:prose-base max-w-none
                prose-headings:font-bold prose-headings:text-[#0A0A0A] prose-headings:tracking-[-0.01em]
                prose-h1:text-[28px] prose-h1:sm:text-[32px] prose-h1:mt-0
                prose-h2:text-[20px] prose-h2:sm:text-[24px] prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-[16px] prose-h3:sm:text-[18px] prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[15px] prose-p:sm:text-[16px] prose-p:leading-[1.8] prose-p:text-[#52525B] prose-p:mb-5
                prose-a:text-[#8B5CF6] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0A0A0A]
                prose-ul:text-[#52525B] prose-ul:text-[15px] prose-ul:sm:text-[16px]
                prose-ol:text-[#52525B] prose-ol:text-[15px] prose-ol:sm:text-[16px]
                prose-li:my-1
                prose-code:bg-[#F4F4F5] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:text-[#8B5CF6] prose-code:font-mono
                prose-pre:bg-[#0A0A0A] prose-pre:rounded-xl prose-pre:p-5 prose-pre:overflow-x-auto
                prose-pre:border prose-pre:border-[#E4E4E7]
                prose-pre:[code]:bg-transparent prose-pre:[code]:p-0 prose-pre:[code]:text-[13px] prose-pre:[code]:leading-[1.7] prose-pre:[code]:text-[#E4E4E7]
                prose-table:text-[14px] prose-table:text-[#52525B]
                prose-th:bg-[#FAFAF9] prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:text-[#0A0A0A] prose-th:font-semibold
                prose-td:px-4 prose-td:py-2.5 prose-td:border-t prose-td:border-[#E4E4E7]
                prose-blockquote:border-l-[#8B5CF6] prose-blockquote:text-[#52525B] prose-blockquote:pl-5 prose-blockquote:italic
                prose-img:rounded-xl prose-img:my-8
                [&_table]:w-full [&_table]:border-collapse
                [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg
                [&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg
                [&_table]:border [&_table]:border-[#E4E4E7] [&_table]:rounded-lg"
            >
              <Component />
            </motion.div>

            <div className="mt-10 pt-8 border-t border-[#E4E4E7] flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[14px] text-[#71717A] hover:text-[#8B5CF6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t('blog.index.backToBlog')}
              </Link>
              <Button
                variant="accent"
                size="sm"
                href="/contact"
                onClick={() => trackEvent('cta_click', { cta_location: 'blog_post', cta_text: 'start_project' })}
              >
                {t('nav.cta')}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <RelatedArticles posts={relatedPosts} />
          </Container>
        </article>
      </main>
    </>
  )
}
