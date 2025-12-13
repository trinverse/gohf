import Link from 'next/link'
import Hero from '@/components/Hero'

const upcomingEvents = [
  {
    title: 'Annual Scholarship Distribution',
    date: 'Jan 2025',
    type: 'Program',
    description: 'Distribution of scholarships to deserving students for the upcoming academic year.',
  },
  {
    title: 'Career Guidance Workshop',
    date: 'Feb 2025',
    type: 'Workshop',
    description: 'Alumni mentors share insights on career paths and opportunities.',
  },
  {
    title: 'Book & Stationery Drive',
    date: 'Mar 2025',
    type: 'Drive',
    description: 'Collection and distribution of educational materials to students.',
  },
  {
    title: 'Alumni Meet & Fundraiser',
    date: 'Apr 2025',
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
              <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">What&apos;s Next</span>
              <h2 className="mt-2 text-3xl font-semibold text-[#1C1C1E] tracking-tight">Upcoming Events</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.title}
                className="group relative p-8 rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-[#0A84FF] bg-[#E3F2FF] rounded-full">
                    {event.type}
                  </span>
                  <span className="text-sm font-medium text-[#5f6368]">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1E] tracking-tight">{event.title}</h3>
                <p className="mt-3 text-[#5f6368]">{event.description}</p>

                {/* Decorative number */}
                <span className="absolute -bottom-4 -right-4 text-[8rem] font-semibold text-[#f8f9fa] select-none leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">Looking Back</span>
            <h2 className="mt-2 text-3xl font-semibold text-[#1C1C1E] tracking-tight">Recent Highlights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white">
                <p className="text-sm text-[#FF9F0A] font-medium">{item.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#1C1C1E]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5f6368]">{item.students}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
            Want to participate?
          </h2>
          <p className="mt-4 text-lg text-[#5f6368]">
            Join us in our events and programs. We welcome volunteers, attendees, and supporters.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/join"
              className="px-8 py-4 text-base font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] transition-all duration-300"
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 text-base font-medium text-[#1C1C1E] bg-white border border-[#e8eaed] rounded-full hover:border-[#0A84FF] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
