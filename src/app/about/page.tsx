import Hero from '@/components/Hero'

const values = [
  {
    title: 'Compassion',
    description: 'We lead with empathy, understanding the unique challenges each child faces.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Integrity',
    description: 'Transparency and accountability guide every decision we make.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'Together we achieve more than any of us could alone.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <>
      <Hero
        title="About Us"
        subtitle="The story of how four JNV alumni came together to create lasting change."
        minimal
      />

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1C1E] tracking-tight">
                Born from shared experiences, driven by purpose
              </h2>
              <div className="mt-8 space-y-6 text-lg text-[#5f6368] leading-relaxed">
                <p>
                  Guardians of Hope Foundation emerged from a simple yet powerful idea: those who have
                  been given opportunities have a responsibility to create them for others.
                </p>
                <p>
                  As alumni of Jawahar Navodaya Vidyalaya, our founders experienced firsthand
                  how quality education can transform lives. The residential school system
                  provided them not just academic excellence, but a foundation for success.
                </p>
                <p>
                  Today, we channel that gratitude into action, supporting underprivileged
                  children who remind us of our younger selves—full of potential, just
                  waiting for the right opportunity.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-32">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#E3F2FF] via-[#f8f9fa] to-[#FFF4E0] p-8 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#5f6368] uppercase tracking-wide">Established</p>
                    <p className="mt-2 text-6xl font-semibold text-[#0A84FF]">2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FF] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#0A84FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#1C1C1E] tracking-tight">Our Vision</h3>
              <p className="mt-4 text-[#5f6368] leading-relaxed">
                A world where every deserving child has access to quality education and
                opportunities for growth, regardless of their socio-economic background.
                We envision empowered individuals who pay forward the support they received.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4E0] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FF9F0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#1C1C1E] tracking-tight">Our Mission</h3>
              <p className="mt-4 text-[#5f6368] leading-relaxed">
                A united family of JNV alumni, bound by gratitude and purpose—dedicated to transforming lives through education, mentorship, and lifelong support for underprivileged children. We stand shoulder to shoulder with the families left behind by our brave brothers and sisters of JNV Bijnor who served on the frontlines, protecting our borders, we commit to being their strength, their hope, and their extended family. Where education uplifts, sacrifice is honored, and no family ever stands alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">What Guides Us</span>
            <h2 className="mt-4 text-4xl font-semibold text-[#1C1C1E] tracking-tight">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-3xl bg-[#E3F2FF] flex items-center justify-center mx-auto mb-6">
                  <div className="text-[#0A84FF]">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1E]">{value.title}</h3>
                <p className="mt-3 text-[#5f6368]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="p-8 rounded-3xl bg-[#f8f9fa] border border-[#e8eaed] text-center">
            <p className="text-[#5f6368]">
              <span className="font-medium text-[#1C1C1E]">Please note:</span> Guardians of Hope Foundation
              is an independent non-profit organization founded by JNV alumni. We are not affiliated with the official
              Jawahar Navodaya Vidyalaya administration or Navodaya Vidyalaya Samiti.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
