import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'

const founders = [
  {
    name: 'Deepak Chauhan',
    role: 'Co-Founder',
    initial: 'DC',
    bio: 'A passionate advocate for education and child welfare, Deepak brings his experience and dedication to creating opportunities for underprivileged children.',
    color: 'from-[#e8eaf6] to-[#c5cae9]',
    image: '/images/founders/deepak-chauhan.jpeg',
  },
  {
    name: 'Rajni Dhani',
    role: 'Co-Founder',
    initial: 'RD',
    bio: 'With deep commitment to community service, Rajni ensures every program truly serves the needs of the children we support.',
    color: 'from-[#fff8e1] to-[#ffecb3]',
  },
  {
    name: 'Awaiting Approval',
    role: 'Co-Founder',
    initial: '??',
    bio: 'A dedicated co-founder whose strategic thinking and organizational excellence help translate the foundation\'s vision into sustainable, impactful programs. Name pending organizational approval.',
    color: 'from-[#e8f5e9] to-[#c8e6c9]',
  },
  {
    name: 'Ashish Tyagi',
    role: 'Co-Founder',
    initial: 'AT',
    bio: 'Driven by belief that every child deserves a chance, Ashish works to expand the foundation\'s reach through technology and innovation.',
    color: 'from-[#fce4ec] to-[#f8bbd0]',
    image: '/images/founders/ashish-tyagi.jpg',
  },
]

export default function Founders() {
  return (
    <>
      <Hero
        title="Our Founders"
        subtitle="Four JNV alumni united by a shared vision for change."
        minimal
      />

      {/* Founders Grid */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className="group relative p-8 md:p-10 rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${founder.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 overflow-hidden`}>
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-semibold text-[#1C1C1E]">{founder.initial}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-semibold text-[#1C1C1E] tracking-tight">{founder.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[#FF9F0A]">{founder.role}</p>
                    <p className="mt-4 text-[#5f6368] leading-relaxed">{founder.bio}</p>
                  </div>
                </div>
                {/* Decorative number */}
                <span className="absolute top-6 right-8 text-8xl font-semibold text-[#f8f9fa] select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Vision */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">United Purpose</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[#1C1C1E] tracking-tight">
            Bound by roots, driven by purpose
          </h2>
          <p className="mt-6 text-lg text-[#5f6368] leading-relaxed max-w-2xl mx-auto">
            Our founders share more than a vision—they share the transformative experience
            of JNV education. This common foundation drives their collective commitment
            to creating similar opportunities for the next generation.
          </p>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A84FF] to-[#0066CC] p-12 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-white tracking-tight">
                Want to join our team?
              </h2>
              <p className="mt-4 text-white/70 max-w-lg mx-auto">
                We welcome passionate individuals who share our vision. Whether as a volunteer,
                contributor, or partner—there&apos;s a place for you.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 text-base font-medium text-[#0A84FF] bg-white rounded-full hover:shadow-xl transition-all duration-300"
              >
                <span>Get Involved</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
