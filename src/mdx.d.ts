declare module '*.mdx' {
  import type { ComponentType } from 'react'
  let MDXComponent: ComponentType
  export default MDXComponent
  export const meta: import('@/types/blog').BlogMeta
}
