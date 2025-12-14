import Link from 'next/link'
import Hero from '@/components/Hero'

const upcomingEvents = [
  {
    title: 'Alumni Meet & Fundraiser',
    date: 'Dec 2025',
    type: 'Event',
    description: 'Annual gathering to connect, share, and raise funds for initiatives.',
  },
]

const highlights = [
  { title: 'Scholarship Program Launch', date: 'Dec 2024', students: '25 students supported' },
  { title: 'Foundation Inauguration', date: 'Nov 2024', students: 'Community gathering' },
  { title: 'First Mentorship Session', date: 'Oct 2024', students: '15 mentees connected' },
]

export default function Events() {
  return (
    <>
      <Hero
        title="Events"
        subtitle="Programs, workshops, and community initiatives."
        minimal
      />

      {/* Upcoming Events */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide uppercase">What&apos;s Next</span>
              <h2 className="mt-2 text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">Upcoming Events</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className="group relative p-8 rounded-3xl bg-[var(--md-sys-color-surface-bright)] shadow-[var(--md-sys-elevation-1)] hover:shadow-[var(--md-sys-elevation-3)] transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary-container)] rounded-full">
                    {event.type}
                  </span>
                  <span className="text-sm font-medium text-[var(--md-sys-color-on-surface-variant)]">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">{event.title}</h3>
                <p className="mt-3 text-[var(--md-sys-color-on-surface-variant)]">{event.description}</p>

                {/* Decorative number */}
                <span className="absolute -bottom-4 -right-4 text-[8rem] font-semibold text-[var(--md-sys-color-surface-container-low)] select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="py-24 px-6 bg-[var(--md-sys-color-surface)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[var(--md-sys-color-secondary)] tracking-wide uppercase">Looking Back</span>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">Recent Highlights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-[var(--md-sys-color-surface-bright)]">
                <p className="text-sm text-[var(--md-sys-color-secondary)] font-medium">{item.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--md-sys-color-on-surface)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">{item.students}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">
            Want to participate?
          </h2>
          <p className="mt-4 text-lg text-[var(--md-sys-color-on-surface-variant)]">
            Join us in our events and programs. We welcome volunteers, attendees, and supporters.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/join"
              className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-on-primary)] bg-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-dark)] transition-all duration-300"
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface-bright)] border border-[var(--md-sys-color-outline-variant)] rounded-full hover:border-[var(--md-sys-color-primary)] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
