import { Children, useEffect } from 'react'
import type { ReactNode } from 'react'

type HelmetProps = {
  children?: ReactNode
  prioritizeSeoTags?: boolean
  [key: string]: unknown
}

type HelmetProviderProps = {
  children?: ReactNode
}

function removeHelmetNodes() {
  document.head.querySelectorAll('[data-helmet-shim="true"]').forEach((node) => node.remove())
}

function applyHelmetChildren(children: ReactNode) {
  if (typeof document === 'undefined') return

  removeHelmetNodes()

  Children.forEach(children, (child) => {
    const elementChild = child as any
    if (!elementChild || typeof elementChild !== 'object' || !('type' in elementChild)) return

    if (elementChild.type === 'title') {
      const titleText = Children.toArray(elementChild.props?.children).join('')
      document.title = titleText
      return
    }

    if (typeof elementChild.type !== 'string') return

    const element = document.createElement(elementChild.type)
    Object.entries(elementChild.props ?? {}).forEach(([key, value]) => {
      if (key === 'children' || key === 'dangerouslySetInnerHTML' || value == null) return
      if (value === false) return
      element.setAttribute(key, value === true ? '' : String(value))
    })

    const childContent = elementChild.props?.children
    if (typeof childContent === 'string') {
      element.textContent = childContent
    }

    element.setAttribute('data-helmet-shim', 'true')
    document.head.appendChild(element)
  })
}

export function Helmet({ children }: HelmetProps) {
  useEffect(() => {
    applyHelmetChildren(children)
    return () => {
      removeHelmetNodes()
    }
  }, [children])

  return null
}

export function HelmetProvider({ children }: HelmetProviderProps) {
  return <>{children}</>
}
