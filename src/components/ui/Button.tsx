import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
}

const base = 'inline-flex items-center justify-center gap-2.5 font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6] whitespace-nowrap'

const variants = {
  primary:
    'bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] active:bg-[#2A2A2A] shadow-sm',
  secondary:
    'bg-transparent text-[#0A0A0A] border border-[#E4E4E7] hover:border-[#A1A1AA] hover:bg-white active:bg-[#F8F7F4]',
  ghost:
    'bg-transparent text-[#52525B] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]',
  accent:
    'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:bg-[#6D28D9] shadow-md',
}

const sizes = {
  sm: 'h-9 px-4 text-[13px] rounded-lg',
  md: 'h-10 px-5 text-[14px] rounded-lg',
  lg: 'h-12 px-7 text-[15px] rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
