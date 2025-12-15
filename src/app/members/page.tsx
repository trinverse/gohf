'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'

interface ApprovedMember {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  interest?: string
  message?: string
  status: string
  created_at: string
}

interface AppUser {
  id: string
  email: string
  role: string
  created_at: string
}

export default function Members() {
  const [approvedMembers, setApprovedMembers] = useState<ApprovedMember[]>([])
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, usersRes] = await Promise.all([
          fetch('/api/members'),
          fetch('/api/users')
        ])

        const membersData = await membersRes.json()
        const usersData = await usersRes.json()

        if (membersData.data) {
          setApprovedMembers(membersData.data.filter((m: ApprovedMember) => m.status === 'approved'))
        }
        if (usersData.data) {
          setUsers(usersData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getInterestLabel = (interest: string) => {
    const labels: Record<string, string> = {
      volunteer: 'Volunteer',
      donate: 'Donor',
      mentor: 'Mentor',
      partner: 'Partner',
    }
    return labels[interest] || 'Member'
  }

  const getInterestColor = (interest: string) => {
    const colors: Record<string, string> = {
      volunteer: 'from-[var(--md-sys-color-tertiary-container)] to-[var(--md-sys-color-tertiary-container)]',
      donate: 'from-[var(--md-sys-color-secondary-container)] to-[var(--md-sys-color-secondary-container)]',
      mentor: 'from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-primary-container)]',
      partner: 'from-[var(--md-sys-color-error-container)] to-[var(--md-sys-color-error-container)]',
    }
    return colors[interest] || 'from-[var(--md-sys-color-surface-dim)] to-[var(--md-sys-color-outline-variant)]'
  }

  return (
    <>
      <Hero
        title="Our Members"
        subtitle="Meet the dedicated individuals driving our mission forward."
        minimal
      />

      {/* Members Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-tertiary-container)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--md-sys-color-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[var(--md-sys-color-tertiary)] tracking-wide uppercase">Our Community</span>
            </div>
            <h2 className="text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">Community Members</h2>
            <p className="mt-3 text-[var(--md-sys-color-on-surface-variant)]">
              Dedicated individuals who have joined our mission to make a difference.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-2 border-[var(--md-sys-color-tertiary)] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-[var(--md-sys-color-on-surface-muted)]">Loading members...</p>
            </div>
          ) : approvedMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-surface-dim)] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[var(--md-sys-color-on-surface-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--md-sys-color-on-surface)]">No members yet</h3>
              <p className="mt-2 text-[var(--md-sys-color-on-surface-muted)] max-w-sm">
                Be the first to join our community and help make a difference.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[var(--md-sys-color-surface-bright)] shadow-[var(--md-sys-elevation-1)] overflow-hidden divide-y divide-[var(--md-sys-color-surface-container)]">
              {approvedMembers.map((member) => {
                const isExpanded = expandedMember === member.id
                return (
                  <div key={member.id} className="transition-colors duration-200 hover:bg-[var(--md-sys-color-surface-container-low)]">
                    <button
                      onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-left"
                    >
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${getInterestColor(member.interest || '')} flex items-center justify-center`}>
                        <span className="text-sm font-semibold text-[var(--md-sys-color-on-surface)]">
                          {member.first_name?.charAt(0)}{member.last_name?.charAt(0)}
                        </span>
                      </div>

                      {/* Name (left) */}
                      <h3 className="flex-1 min-w-0 font-medium text-[var(--md-sys-color-on-surface)] truncate">
                        {member.first_name} {member.last_name}
                      </h3>

                      {/* Join date (center) & Type (right) */}
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[var(--md-sys-color-on-surface-muted)] hidden sm:inline">
                          {new Date(member.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md font-medium ${
                          member.interest === 'mentor' ? 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-primary)]' :
                          member.interest === 'volunteer' ? 'bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-tertiary)]' :
                          member.interest === 'donate' ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-secondary)]' :
                          'bg-[var(--md-sys-color-surface-dim)] text-[var(--md-sys-color-on-surface-variant)]'
                        }`}>
                          {getInterestLabel(member.interest || '')}
                        </span>
                      </div>

                      {/* Expand indicator */}
                      {member.message && (
                        <svg
                          className={`w-5 h-5 text-[var(--md-sys-color-on-surface-muted)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {/* Expandable content */}
                    {isExpanded && member.message && (
                      <div className="px-4 pb-4 pt-1 ml-13">
                        <div className="pl-13 ml-10 p-3 rounded-xl bg-[var(--md-sys-color-surface-container-low)] text-sm text-[var(--md-sys-color-on-surface-variant)] leading-relaxed">
                          &ldquo;{member.message}&rdquo;
                        </div>
                        <p className="mt-2 ml-10 text-xs text-[var(--md-sys-color-on-surface-muted)] sm:hidden">
                          Joined {new Date(member.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Registered Users Section */}
      {!loading && users.length > 0 && (
        <section className="py-16 px-6 bg-[var(--md-sys-color-surface)]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--md-sys-color-primary-container)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--md-sys-color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--md-sys-color-primary)] tracking-wide uppercase">Registered</span>
              </div>
              <h2 className="text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">Users</h2>
              <p className="mt-3 text-[var(--md-sys-color-on-surface-variant)]">
                People who have created accounts on our platform.
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--md-sys-color-surface-bright)] shadow-[var(--md-sys-elevation-1)] overflow-hidden divide-y divide-[var(--md-sys-color-surface-container)]">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="px-4 py-3 flex items-center gap-3 transition-colors duration-200 hover:bg-[var(--md-sys-color-surface-container-low)]"
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                    user.role === 'admin'
                      ? 'bg-[var(--md-sys-color-secondary-container)]'
                      : 'bg-[var(--md-sys-color-primary-container)]'
                  }`}>
                    <span className={`text-sm font-semibold ${
                      user.role === 'admin' ? 'text-[var(--md-sys-color-secondary)]' : 'text-[var(--md-sys-color-primary)]'
                    }`}>
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {/* Email (left) */}
                  <p className="flex-1 min-w-0 text-sm font-medium text-[var(--md-sys-color-on-surface)] truncate">
                    {user.email}
                  </p>

                  {/* Join date (center) & Role (right) */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[var(--md-sys-color-on-surface-muted)] hidden sm:inline">
                      {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-medium capitalize ${
                      user.role === 'admin'
                        ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-secondary)]'
                        : 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-primary)]'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className={`py-24 px-6 ${users.length > 0 ? '' : 'bg-[var(--md-sys-color-surface)]'}`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">
            Become a Member
          </h2>
          <p className="mt-4 text-lg text-[var(--md-sys-color-on-surface-variant)]">
            Join our growing community of changemakers. Whether you&apos;re a JNV alumni or someone who shares our vision, there&apos;s a place for you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/join"
              className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-on-primary)] bg-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-dark)] transition-all duration-300 hover:shadow-lg"
            >
              Join Us
            </a>
            <a
              href="/contact"
              className="px-8 py-4 text-base font-medium text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface-bright)] border border-[var(--md-sys-color-outline-variant)] rounded-full hover:border-[var(--md-sys-color-primary)] transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
