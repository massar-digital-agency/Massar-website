import { Children, cloneElement, useEffect } from 'react'

type HelmetProps = {
  children?: React.ReactNode
}

type HelmetProviderProps = {
  children?: React.ReactNode
}

function removeHelmetNodes() {
  document.head.querySelectorAll('[data-helmet-shim="true"]').forEach((node) => node.remove())
}

function applyHelmetChildren(children: React.ReactNode) {
  if (typeof document === 'undefined') return

  removeHelmetNodes()

  Children.forEach(children, (child) => {
    if (!child || typeof child !== 'object' || !('type' in child)) return

    if (child.type === 'title') {
      const titleText = Children.toArray(child.props.children).join('')
      document.title = titleText
      return
    }

    if (typeof child.type !== 'string') return

    const element = document.createElement(child.type)
    Object.entries(child.props ?? {}).forEach(([key, value]) => {
      if (key === 'children' || key === 'dangerouslySetInnerHTML' || value == null) return
      if (value === false) return
      element.setAttribute(key, value === true ? '' : String(value))
    })

    const childContent = child.props?.children
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
