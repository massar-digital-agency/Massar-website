import type { BlogModule, BlogPost } from '@/types/blog'

const modules = import.meta.glob('/src/content/blog/*.mdx', { eager: true }) as Record<string, BlogModule>

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const path of Object.keys(modules)) {
    const mod = modules[path]
    if (mod?.meta && mod?.default) {
      posts.push({ meta: mod.meta, Component: mod.default })
    }
  }

  return posts.sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime(),
  )
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.meta.slug === slug)
}

export function getRelatedPosts(current: BlogPost, max = 2): BlogPost[] {
  return getAllBlogPosts()
    .filter((p) => p.meta.slug !== current.meta.slug)
    .map((p) => ({
      post: p,
      score: p.meta.tags.filter((t) => current.meta.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((item) => item.post)
}

export function paginatePosts(posts: BlogPost[], page: number, perPage: number) {
  const total = posts.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const items = posts.slice(start, start + perPage)

  return { items, total, totalPages, page, hasNext: page < totalPages, hasPrev: page > 1 }
}
