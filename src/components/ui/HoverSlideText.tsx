import type { ReactNode } from 'react'

interface HoverSlideTextProps {
  children: ReactNode
  className?: string
}

export function HoverSlideText({ children, className = '' }: HoverSlideTextProps) {
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full text-[#8B5CF6] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )
}
