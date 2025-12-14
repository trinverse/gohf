import Link from 'next/link'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

const initiatives = [
  {
    title: 'Education Support',
    description: 'Scholarships, books, and educational resources for underprivileged students to pursue their academic dreams.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Mentorship',
    description: 'One-on-one guidance from alumni mentors helping students navigate their academic and career journeys.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Health & Wellness',
    description: 'Regular health camps, nutritional support, and wellness programs ensuring children can focus on learning.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Skill Building',
    description: 'Workshops on communication, technology, and life skills preparing students for future opportunities.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      <Hero
        title="Empowering Future Generations"
        subtitle="A collective of JNV alumni committed to transforming lives through education, mentorship, and unwavering support for underprivileged children."
        showCTA
      />

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide uppercase">Our Purpose</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight leading-tight">
                Every child deserves a chance to thrive
              </h2>
              <p className="mt-6 text-lg text-[var(--md-sys-color-on-surface-variant)] leading-relaxed">
                A united family of JNV alumni, bound by gratitude and purpose—dedicated to transforming lives through education, mentorship, and support for underprivileged children. We stand with families of our brave soldiers who served on the frontlines. Where education uplifts, sacrifice is honored, and no family ever stands alone.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-[var(--md-sys-color-primary)] font-medium hover:gap-3 transition-all duration-300"
                >
                  <span>Our Story</span>
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-surface-container-low)] flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-6xl md:text-7xl font-semibold text-[var(--md-sys-color-primary)]">100+</p>
                  <p className="mt-2 text-lg text-[var(--md-sys-color-on-surface-variant)]">Lives Impacted</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[var(--md-sys-color-secondary-container)] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24 px-6 bg-[var(--md-sys-color-surface)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide uppercase">What We Do</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">
              Our Initiatives
            </h2>
            <p className="mt-6 text-lg text-[var(--md-sys-color-on-surface-variant)]">
              Comprehensive programs designed to nurture potential and create lasting change.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <Card
                key={initiative.title}
                title={initiative.title}
                description={initiative.description}
                icon={initiative.icon}
                variant="elevated"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--md-sys-color-primary)] p-12 md:p-16 text-center">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--md-sys-color-primary-dark)] to-transparent rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--md-sys-color-secondary)]/20 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-semibold text-[var(--md-sys-color-on-primary)] tracking-tight">
                Be Part of the Change
              </h2>
              <p className="mt-6 text-lg text-[var(--md-sys-color-on-primary)]/70 max-w-xl mx-auto">
                Your involvement can transform a child&apos;s future. Join our community of changemakers today.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/join"
                  className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-surface-bright)] rounded-full hover:bg-[var(--md-sys-color-surface-container-low)] hover:shadow-xl transition-all duration-300"
                >
                  Get Involved
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-on-primary)] border border-[var(--md-sys-color-on-primary)]/30 rounded-full hover:bg-[var(--md-sys-color-on-primary)]/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
