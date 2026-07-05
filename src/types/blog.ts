import type { ComponentType } from 'react'

export interface BlogAuthor {
  name: string
  image?: string
}

export interface BlogMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: string
  author: BlogAuthor
  tags: string[]
  featuredImage?: string
  featuredImageAlt?: string
}

export interface BlogModule {
  default: ComponentType
  meta: BlogMeta
}

export interface BlogPost {
  meta: BlogMeta
  Component: ComponentType
}
