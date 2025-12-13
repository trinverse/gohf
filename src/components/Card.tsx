import Link from 'next/link'

interface CardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  variant?: 'elevated' | 'filled' | 'outlined'
}

export default function Card({ title, description, icon, href, variant = 'elevated' }: CardProps) {
  const baseStyles = 'group relative p-8 rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]'

  const variants = {
    elevated: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1',
    filled: 'bg-[#f8f9fa] hover:bg-[#f1f3f4]',
    outlined: 'bg-white border border-[#e8eaed] hover:border-[#dadce0] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
  }

  const content = (
    <div className={`${baseStyles} ${variants[variant]} h-full`}>
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-[#f8f9fa] group-hover:bg-[#e8eaf6] flex items-center justify-center mb-6 transition-colors duration-500">
          <div className="text-[#1a1a2e]">{icon}</div>
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#1a1a2e] tracking-tight">{title}</h3>
      <p className="mt-3 text-[#5f6368] leading-relaxed">{description}</p>

      {href && (
        <div className="mt-6 flex items-center text-sm font-medium text-[#1a1a2e]">
          <span>Learn more</span>
          <svg
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>
  }

  return content
}
