import type { ReactNode } from 'react'

import './AlertBanner.css'

// TYPES 
type AlertVariant = 'warning' | 'error' | 'success' | 'info'

type AlertBannerProps = {
  variant: AlertVariant
  title?: string
  children: ReactNode
  className?: string
}

// COMPOSANT
function AlertBanner({
  variant,
  title,
  children,
  className = '',
}: AlertBannerProps) {
  const classes = [
    'alert-banner',
    `alert-banner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="alert">
      <svg
        className="alert-banner__icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {variant === 'warning' && (
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        )}
        {variant === 'error' && (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </>
        )}
        {variant === 'success' && (
          <>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </>
        )}
        {variant === 'info' && (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </>
        )}
      </svg>

      <div className="alert-banner__content">
        {title && <div className="alert-banner__title">{title}</div>}
        <div className="alert-banner__text">{children}</div>
      </div>
    </div>
  )
}

export default AlertBanner