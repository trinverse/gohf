import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  showCTA?: boolean
  minimal?: boolean
}

export default function Hero({ title, subtitle, showCTA = false, minimal = false }: HeroProps) {
  if (minimal) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a2e] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-[#5f6368] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-white to-[#fafafa]" />

      {/* Decorative elements - Jony Ive inspired subtle shapes */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-[#e8eaf6] to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-[#fff8e1] to-transparent rounded-full blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#f1f3f4] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#4a6741] animate-pulse" />
          <span className="text-sm font-medium text-[#5f6368]">Non-profit Initiative by JNV Alumni</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-[#1a1a2e] tracking-tight leading-[1.1]">
          {title.split(' ').map((word, i) => (
            <span key={i} className="inline-block">
              {word}
              {i < title.split(' ').length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        {subtitle && (
          <p className="mt-8 text-xl md:text-2xl text-[#5f6368] max-w-3xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        )}

        {showCTA && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="group px-8 py-4 text-base font-medium text-white bg-[#1a1a2e] rounded-full hover:bg-[#2d2d44] hover:shadow-xl hover:shadow-[#1a1a2e]/15 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Join Our Mission
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 text-base font-medium text-[#1a1a2e] bg-white rounded-full border border-[#e8eaed] hover:border-[#dadce0] hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        )}

        {/* Stats row */}
        {showCTA && (
          <div className="mt-20 pt-12 border-t border-[#f1f3f4]">
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-[#1a1a2e]">100+</p>
                <p className="mt-1 text-sm text-[#5f6368]">Children Helped</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-[#1a1a2e]">4</p>
                <p className="mt-1 text-sm text-[#5f6368]">Founders</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-[#1a1a2e]">10+</p>
                <p className="mt-1 text-sm text-[#5f6368]">Programs</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {showCTA && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-[#dadce0] flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#5f6368] rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </section>
  )
}
