interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon - Shield with Heart: Guardians (protection) + Hope (heart/care) */}
      <div className={`${sizes[size]} rounded-2xl bg-[var(--md-sys-color-primary)] flex items-center justify-center`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'}
        >
          {/* Shield outline */}
          <path
            d="M12 3L4 7v5c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V7l-8-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--md-sys-color-on-primary)]"
          />
          {/* Heart inside shield */}
          <path
            d="M12 8.5c-.5-.7-1.3-1-2.1-1-1.5 0-2.4 1.2-2.4 2.5 0 2.5 4.5 5.5 4.5 5.5s4.5-3 4.5-5.5c0-1.3-.9-2.5-2.4-2.5-.8 0-1.6.3-2.1 1z"
            fill="currentColor"
            className="text-[var(--md-sys-color-on-primary)]"
          />
        </svg>
      </div>

      {showText && (
        <div>
          <span className="text-[var(--md-sys-color-on-surface)] font-semibold tracking-tight block">
            Guardians of Hope
          </span>
        </div>
      )}
    </div>
  )
}
