'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/components/Hero'

interface Member {
  id: string
  name: string
  role: string
  category: 'founding' | 'core' | 'volunteer'
  initial: string
  bio: string
  location?: string
  joinedYear: string
  contributions: string[]
  color: string
  image?: string
}

const members: Member[] = [
  {
    id: 'deepak-chauhan',
    name: 'Deepak Chauhan',
    role: 'Co-Founder',
    category: 'founding',
    initial: 'DC',
    bio: 'A passionate advocate for education and child welfare, Deepak brings his experience and dedication to creating opportunities for underprivileged children. His vision for the foundation stems from his own transformative JNV experience.',
    joinedYear: '2025',
    contributions: ['Strategic Planning', 'Community Outreach', 'Program Development'],
    color: 'from-[#E3F2FF] to-[#B3D9FF]',
    image: '/images/founders/deepak-chauhan.jpeg',
  },
  {
    id: 'rajni-dhani',
    name: 'Rajni Dhani',
    role: 'Co-Founder',
    category: 'founding',
    initial: 'RD',
    bio: 'With deep commitment to community service, Rajni ensures every program truly serves the needs of the children we support. Her empathetic approach and organizational skills drive the foundation\'s welfare initiatives.',
    joinedYear: '2025',
    contributions: ['Welfare Programs', 'Volunteer Coordination', 'Event Management'],
    color: 'from-[#FFF4E0] to-[#FFE4B3]',
  },
  {
    id: 'awaiting-approval',
    name: 'Awaiting Approval',
    role: 'Co-Founder',
    category: 'founding',
    initial: '??',
    bio: 'A dedicated co-founder whose strategic thinking and organizational excellence help translate the foundation\'s vision into sustainable, impactful programs. Their analytical mindset ensures efficient resource allocation and measurable outcomes. Name pending organizational approval.',
    joinedYear: '2025',
    contributions: ['Operations Management', 'Financial Planning', 'Partnership Development'],
    color: 'from-[#E8FAE8] to-[#B8F0B8]',
  },
  {
    id: 'ashish-tyagi',
    name: 'Ashish Tyagi',
    role: 'Co-Founder',
    category: 'founding',
    initial: 'AT',
    bio: 'Driven by belief that every child deserves a chance, Ashish works to expand the foundation\'s reach through technology and innovation. His technical expertise powers the digital presence and outreach initiatives.',
    joinedYear: '2025',
    contributions: ['Technology & Innovation', 'Digital Strategy', 'Mentorship Programs'],
    color: 'from-[#FCE4EC] to-[#F8BBD9]',
    image: '/images/founders/ashish-tyagi.jpg',
  },
]

function MemberCard({ member, isExpanded, onToggle }: { member: Member; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      className={`group relative rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden ${
        isExpanded ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Collapsed View - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center gap-5 text-left transition-colors duration-300 hover:bg-[#fafafa]"
      >
        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-105 overflow-hidden`}>
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-[#1C1C1E]">{member.initial}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-[#1C1C1E] tracking-tight">{member.name}</h3>
          <p className="text-sm font-medium text-[#FF9F0A]">{member.role}</p>
        </div>
        <div className={`w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-[#5f6368]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded View */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-[#f1f3f4]">
          <p className="text-[#5f6368] leading-relaxed">{member.bio}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {member.contributions.map((contribution) => (
              <span
                key={contribution}
                className="px-3 py-1.5 text-xs font-medium text-[#0A84FF] bg-[#E3F2FF] rounded-full"
              >
                {contribution}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#f1f3f4] flex items-center gap-6 text-sm text-[#5f6368]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#30D158]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Member since {member.joinedYear}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Members() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const foundingMembers = members.filter(m => m.category === 'founding')

  const toggleMember = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <>
      <Hero
        title="Our Members"
        subtitle="Meet the dedicated individuals driving our mission forward."
        minimal
      />

      {/* Founding Members Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#E3F2FF] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0A84FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">Est. 2025</span>
            </div>
            <h2 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">Founding Members</h2>
            <p className="mt-3 text-[#5f6368]">
              The visionaries who came together to establish Guardians of Hope Foundation.
            </p>
          </div>

          <div className="space-y-4">
            {foundingMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isExpanded={expandedId === member.id}
                onToggle={() => toggleMember(member.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
            Become a Member
          </h2>
          <p className="mt-4 text-lg text-[#5f6368]">
            Join our growing community of changemakers. Whether you&apos;re a JNV alumni or someone who shares our vision, there&apos;s a place for you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/join"
              className="px-8 py-4 text-base font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] transition-all duration-300 hover:shadow-lg"
            >
              Join Us
            </a>
            <a
              href="/contact"
              className="px-8 py-4 text-base font-medium text-[#1C1C1E] bg-white border border-[#e8eaed] rounded-full hover:border-[#0A84FF] transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
