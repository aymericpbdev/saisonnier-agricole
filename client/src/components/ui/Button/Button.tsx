import type { ButtonHTMLAttributes, ReactNode } from 'react'

import './Button.css'

// types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'
type ButtonSize = 's' | 'm' | 'l'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

// composant
function Button({
  children,
  variant = 'primary',
  size = 'm',
  loading = false,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button