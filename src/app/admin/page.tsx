'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Member, Donation, EventRegistration, ContactMessage } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'

type Tab = 'members' | 'donations' | 'events' | 'messages' | 'users'

interface AppUser {
  id: string
  email: string
  role: string
  created_at: string
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('members')
  const [members, setMembers] = useState<Member[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [events, setEvents] = useState<EventRegistration[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)

  const { user, role, loading: authLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
      } else if (role !== 'admin') {
        router.push('/')
      }
    }
  }, [user, role, authLoading, router])

  useEffect(() => {
    if (user && role === 'admin') {
      fetchData()
    }
  }, [activeTab, user, role])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      let endpoint = ''
      switch (activeTab) {
        case 'members':
          endpoint = '/api/members'
          break
        case 'donations':
          endpoint = '/api/donations'
          break
        case 'events':
          endpoint = '/api/events'
          break
        case 'messages':
          endpoint = '/api/contact'
          break
        case 'users':
          endpoint = '/api/users'
          break
      }

      const response = await fetch(endpoint)
      const result = await response.json()

      if (result.error) {
        setError(result.error)
        return
      }

      switch (activeTab) {
        case 'members':
          setMembers(result.data || [])
          break
        case 'donations':
          setDonations(result.data || [])
          break
        case 'events':
          setEvents(result.data || [])
          break
        case 'messages':
          setMessages(result.data || [])
          break
        case 'users':
          setUsers(result.data || [])
          break
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    {
      id: 'members' as Tab,
      label: 'Members',
      count: members.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      emptyIcon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      emptyTitle: 'No members yet',
      emptyDesc: 'When people join the foundation, they will appear here.'
    },
    {
      id: 'donations' as Tab,
      label: 'Donations',
      count: donations.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      emptyIcon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      emptyTitle: 'No donations yet',
      emptyDesc: 'Donations will be tracked here once received.'
    },
    {
      id: 'events' as Tab,
      label: 'Events',
      count: events.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      emptyIcon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      emptyTitle: 'No registrations yet',
      emptyDesc: 'Event registrations will appear here.'
    },
    {
      id: 'messages' as Tab,
      label: 'Messages',
      count: messages.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      emptyIcon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      emptyTitle: 'No messages yet',
      emptyDesc: 'Contact form submissions will appear here.'
    },
    {
      id: 'users' as Tab,
      label: 'Users',
      count: users.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      emptyIcon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      emptyTitle: 'No users yet',
      emptyDesc: 'Registered users will appear here.'
    },
  ]

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdatingRole(userId)
    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: newRole }),
      })
      const result = await response.json()

      if (result.error) {
        setError(result.error)
      } else {
        // Update local state
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      }
    } catch (err) {
      console.error('Error updating role:', err)
      setError('Failed to update role')
    } finally {
      setUpdatingRole(null)
    }
  }

  const currentTab = tabs.find(t => t.id === activeTab)

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0)

  // Show loading while checking auth
  if (authLoading || !user || role !== 'admin') {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#0A84FF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-[#86868b]">Checking access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="border-b border-[#f0f0f0]">
        <div className="py-12 px-6">
          <div className="mx-auto max-w-6xl">
            <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">Dashboard</span>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-[#1C1C1E] tracking-tight">
              Admin
            </h1>
            <p className="mt-3 text-lg text-[#86868b]">
              Overview of foundation activities and data
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="border-b border-[#f0f0f0] bg-[#fafafa]">
        <div className="py-8 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group">
                <p className="text-sm font-medium text-[#86868b] tracking-wide">Members</p>
                <p className="mt-1 text-3xl font-semibold text-[#1C1C1E] tracking-tight">{members.length}</p>
              </div>
              <div className="group">
                <p className="text-sm font-medium text-[#86868b] tracking-wide">Donations</p>
                <p className="mt-1 text-3xl font-semibold text-[#1C1C1E] tracking-tight">
                  {totalDonations > 0 ? `₹${totalDonations.toLocaleString('en-IN')}` : '₹0'}
                </p>
              </div>
              <div className="group">
                <p className="text-sm font-medium text-[#86868b] tracking-wide">Registrations</p>
                <p className="mt-1 text-3xl font-semibold text-[#1C1C1E] tracking-tight">{events.length}</p>
              </div>
              <div className="group">
                <p className="text-sm font-medium text-[#86868b] tracking-wide">Messages</p>
                <p className="mt-1 text-3xl font-semibold text-[#1C1C1E] tracking-tight">{messages.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Navigation Tabs */}
          <div className="flex gap-1 p-1.5 bg-[#f5f5f7] rounded-2xl w-fit mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1C1C1E] shadow-sm'
                    : 'text-[#86868b] hover:text-[#1C1C1E]'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-[#0A84FF]' : ''}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-[#0A84FF] text-white'
                      : 'bg-[#e8e8ed] text-[#86868b]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-10 h-10 border-2 border-[#0A84FF] border-t-transparent rounded-full animate-spin" />
              <p className="mt-6 text-[#86868b]">Loading data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 rounded-full bg-[#FFF4E0] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#FF9F0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-[#1C1C1E] font-medium">{error}</p>
              <button
                onClick={fetchData}
                className="mt-6 px-6 py-3 bg-[#0A84FF] text-white rounded-full text-sm font-medium hover:bg-[#0066CC] transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Members */}
              {activeTab === 'members' && (
                members.length === 0 ? (
                  <EmptyState
                    icon={currentTab?.emptyIcon}
                    title={currentTab?.emptyTitle || ''}
                    description={currentTab?.emptyDesc || ''}
                  />
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="group p-6 rounded-2xl bg-[#fafafa] hover:bg-[#f5f5f7] transition-colors duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E3F2FF] to-[#f0f0f0] flex items-center justify-center">
                              <span className="text-lg font-semibold text-[#0A84FF]">
                                {member.first_name?.charAt(0)}{member.last_name?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-[#1C1C1E]">
                                {member.first_name} {member.last_name}
                              </h3>
                              <p className="text-sm text-[#86868b]">{member.email}</p>
                            </div>
                          </div>
                          <StatusBadge status={member.status || 'pending'} />
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#e8e8ed] flex flex-wrap gap-6 text-sm">
                          {member.phone && (
                            <div>
                              <span className="text-[#86868b]">Phone: </span>
                              <span className="text-[#1C1C1E]">{member.phone}</span>
                            </div>
                          )}
                          {member.interest && (
                            <div>
                              <span className="text-[#86868b]">Interest: </span>
                              <span className="text-[#1C1C1E] capitalize">{member.interest}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#86868b]">Joined: </span>
                            <span className="text-[#1C1C1E]">{formatDate(member.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Donations */}
              {activeTab === 'donations' && (
                donations.length === 0 ? (
                  <EmptyState
                    icon={currentTab?.emptyIcon}
                    title={currentTab?.emptyTitle || ''}
                    description={currentTab?.emptyDesc || ''}
                  />
                ) : (
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="group p-6 rounded-2xl bg-[#fafafa] hover:bg-[#f5f5f7] transition-colors duration-300">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-[#1C1C1E]">{donation.donor_name}</h3>
                            <p className="text-sm text-[#86868b]">{donation.donor_email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-semibold text-[#30D158]">
                              {donation.currency || '₹'}{donation.amount?.toLocaleString('en-IN')}
                            </p>
                            <StatusBadge status={donation.status || 'pending'} />
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#e8e8ed] flex flex-wrap gap-6 text-sm">
                          {donation.method && (
                            <div>
                              <span className="text-[#86868b]">Method: </span>
                              <span className="text-[#1C1C1E] capitalize">{donation.method}</span>
                            </div>
                          )}
                          {donation.transaction_id && (
                            <div>
                              <span className="text-[#86868b]">Transaction: </span>
                              <span className="text-[#1C1C1E] font-mono text-xs">{donation.transaction_id}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#86868b]">Date: </span>
                            <span className="text-[#1C1C1E]">{formatDate(donation.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Events */}
              {activeTab === 'events' && (
                events.length === 0 ? (
                  <EmptyState
                    icon={currentTab?.emptyIcon}
                    title={currentTab?.emptyTitle || ''}
                    description={currentTab?.emptyDesc || ''}
                  />
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="group p-6 rounded-2xl bg-[#fafafa] hover:bg-[#f5f5f7] transition-colors duration-300">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block px-3 py-1 text-xs font-medium text-[#0A84FF] bg-[#E3F2FF] rounded-full mb-2">
                              {event.event_name}
                            </span>
                            <h3 className="text-base font-semibold text-[#1C1C1E]">{event.participant_name}</h3>
                            <p className="text-sm text-[#86868b]">{event.participant_email}</p>
                          </div>
                          <StatusBadge status={event.status || 'registered'} />
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#e8e8ed] flex flex-wrap gap-6 text-sm">
                          {event.participant_phone && (
                            <div>
                              <span className="text-[#86868b]">Phone: </span>
                              <span className="text-[#1C1C1E]">{event.participant_phone}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#86868b]">Guests: </span>
                            <span className="text-[#1C1C1E]">{event.num_guests || 0}</span>
                          </div>
                          <div>
                            <span className="text-[#86868b]">Registered: </span>
                            <span className="text-[#1C1C1E]">{formatDate(event.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Messages */}
              {activeTab === 'messages' && (
                messages.length === 0 ? (
                  <EmptyState
                    icon={currentTab?.emptyIcon}
                    title={currentTab?.emptyTitle || ''}
                    description={currentTab?.emptyDesc || ''}
                  />
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="group p-6 rounded-2xl bg-[#fafafa] hover:bg-[#f5f5f7] transition-colors duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF4E0] to-[#f0f0f0] flex items-center justify-center">
                              <span className="text-lg font-semibold text-[#FF9F0A]">
                                {message.name?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-[#1C1C1E]">{message.name}</h3>
                              <p className="text-sm text-[#86868b]">{message.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <StatusBadge status={message.status || 'unread'} />
                            <p className="text-xs text-[#86868b] mt-1">{formatDate(message.created_at)} {formatTime(message.created_at)}</p>
                          </div>
                        </div>
                        {message.subject && (
                          <p className="text-sm font-medium text-[#1C1C1E] mb-2">{message.subject}</p>
                        )}
                        <p className="text-sm text-[#5f6368] leading-relaxed">{message.message}</p>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Users */}
              {activeTab === 'users' && (
                users.length === 0 ? (
                  <EmptyState
                    icon={currentTab?.emptyIcon}
                    title={currentTab?.emptyTitle || ''}
                    description={currentTab?.emptyDesc || ''}
                  />
                ) : (
                  <div className="space-y-4">
                    {users.map((appUser) => (
                      <div key={appUser.id} className="group p-6 rounded-2xl bg-[#fafafa] hover:bg-[#f5f5f7] transition-colors duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              appUser.role === 'admin'
                                ? 'bg-gradient-to-br from-[#FFF4E0] to-[#f0f0f0]'
                                : 'bg-gradient-to-br from-[#E3F2FF] to-[#f0f0f0]'
                            }`}>
                              <span className={`text-lg font-semibold ${
                                appUser.role === 'admin' ? 'text-[#FF9F0A]' : 'text-[#0A84FF]'
                              }`}>
                                {appUser.email?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-[#1C1C1E]">{appUser.email}</h3>
                              <p className="text-sm text-[#86868b]">Joined {formatDate(appUser.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Role Toggle */}
                            <div className="flex items-center gap-2 p-1 bg-[#f0f0f0] rounded-xl">
                              <button
                                onClick={() => updateUserRole(appUser.id, 'member')}
                                disabled={updatingRole === appUser.id || appUser.id === user?.id}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                  appUser.role === 'member'
                                    ? 'bg-white text-[#1C1C1E] shadow-sm'
                                    : 'text-[#86868b] hover:text-[#1C1C1E]'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                Member
                              </button>
                              <button
                                onClick={() => updateUserRole(appUser.id, 'admin')}
                                disabled={updatingRole === appUser.id || appUser.id === user?.id}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                  appUser.role === 'admin'
                                    ? 'bg-white text-[#FF9F0A] shadow-sm'
                                    : 'text-[#86868b] hover:text-[#1C1C1E]'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                              >
                                Admin
                              </button>
                            </div>
                            {updatingRole === appUser.id && (
                              <div className="w-5 h-5 border-2 border-[#0A84FF] border-t-transparent rounded-full animate-spin" />
                            )}
                          </div>
                        </div>
                        {appUser.id === user?.id && (
                          <p className="mt-3 text-xs text-[#86868b]">This is your account - role cannot be changed</p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="text-[#d1d1d6] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1C1C1E] tracking-tight">{title}</h3>
      <p className="mt-2 text-[#86868b] text-center max-w-sm">{description}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: 'bg-[#E8FAE8] text-[#30D158]',
    completed: 'bg-[#E8FAE8] text-[#30D158]',
    registered: 'bg-[#E8FAE8] text-[#30D158]',
    replied: 'bg-[#E8FAE8] text-[#30D158]',
    pending: 'bg-[#FFF4E0] text-[#FF9F0A]',
    unread: 'bg-[#E3F2FF] text-[#0A84FF]',
    read: 'bg-[#f0f0f0] text-[#86868b]',
    cancelled: 'bg-[#FCE4EC] text-[#FF6B6B]',
    failed: 'bg-[#FCE4EC] text-[#FF6B6B]',
    admin: 'bg-[#FFF4E0] text-[#FF9F0A]',
    member: 'bg-[#E3F2FF] text-[#0A84FF]',
  }

  return (
    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg capitalize ${styles[status] || 'bg-[#f0f0f0] text-[#86868b]'}`}>
      {status}
    </span>
  )
}
