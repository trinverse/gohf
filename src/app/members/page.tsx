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
            <div className="grid gap-4 sm:grid-cols-2">
              {approvedMembers.map((member) => (
                <div
                  key={member.id}
                  className="group p-6 rounded-2xl bg-[var(--md-sys-color-surface-bright)] shadow-[var(--md-sys-elevation-1)] hover:shadow-[var(--md-sys-elevation-3)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${getInterestColor(member.interest || '')} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                      <span className="text-lg font-semibold text-[var(--md-sys-color-on-surface)]">
                        {member.first_name?.charAt(0)}{member.last_name?.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-[var(--md-sys-color-on-surface)] tracking-tight">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-sm font-medium text-[var(--md-sys-color-primary)]">
                        {getInterestLabel(member.interest || '')}
                      </p>
                    </div>
                  </div>
                  {member.message && (
                    <p className="mt-4 text-sm text-[var(--md-sys-color-on-surface-variant)] leading-relaxed line-clamp-2">
                      &ldquo;{member.message}&rdquo;
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-[var(--md-sys-color-surface-container)] flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-muted)]">
                    <svg className="w-4 h-4 text-[var(--md-sys-color-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      Joined {new Date(member.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="group p-5 rounded-2xl bg-[var(--md-sys-color-surface-bright)] shadow-[var(--md-sys-elevation-1)] hover:shadow-[var(--md-sys-elevation-3)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
                      user.role === 'admin'
                        ? 'bg-gradient-to-br from-[var(--md-sys-color-secondary-container)] to-[var(--md-sys-color-secondary-container)]'
                        : 'bg-gradient-to-br from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-primary-container)]'
                    }`}>
                      <span className={`text-base font-semibold ${
                        user.role === 'admin' ? 'text-[var(--md-sys-color-secondary)]' : 'text-[var(--md-sys-color-primary)]'
                      }`}>
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--md-sys-color-on-surface)] truncate">
                        {user.email}
                      </p>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md capitalize ${
                        user.role === 'admin'
                          ? 'bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-secondary)]'
                          : 'bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-primary)]'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[var(--md-sys-color-surface-container)] flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-muted)]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
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
