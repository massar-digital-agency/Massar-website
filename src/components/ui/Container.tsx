import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Container({ children, className = '', narrow }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${
        narrow ? 'max-w-[880px]' : 'max-w-[1180px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}
