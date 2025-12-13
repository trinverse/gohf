'use client'

import { useState, useEffect } from 'react'
import { Member, Donation, EventRegistration, ContactMessage } from '@/lib/supabase'

type Tab = 'members' | 'donations' | 'events' | 'messages'

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('members')
  const [members, setMembers] = useState<Member[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [events, setEvents] = useState<EventRegistration[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [activeTab])

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
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'members' as Tab, label: 'Members', count: members.length },
    { id: 'donations' as Tab, label: 'Donations', count: donations.length },
    { id: 'events' as Tab, label: 'Event Registrations', count: events.length },
    { id: 'messages' as Tab, label: 'Messages', count: messages.length },
  ]

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-[#5f6368]">
              View and manage foundation data
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-white text-[#5f6368] hover:bg-[#f0f0f0]'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-[#e8eaed]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-2 border-[#0A84FF] border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-[#5f6368]">Loading...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <p className="text-[#FF6B6B]">{error}</p>
                <button
                  onClick={fetchData}
                  className="mt-4 px-6 py-2 bg-[#0A84FF] text-white rounded-full text-sm font-medium hover:bg-[#0066CC] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Members Table */}
                {activeTab === 'members' && (
                  <div className="overflow-x-auto">
                    {members.length === 0 ? (
                      <div className="p-12 text-center text-[#5f6368]">
                        No members registered yet
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-[#f8f9fa] border-b border-[#e8eaed]">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Phone</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Interest</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8eaed]">
                          {members.map((member) => (
                            <tr key={member.id} className="hover:bg-[#f8f9fa] transition-colors">
                              <td className="px-6 py-4 text-sm text-[#1C1C1E] font-medium">
                                {member.first_name} {member.last_name}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{member.email}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{member.phone || '-'}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368] capitalize">{member.interest || '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  member.status === 'approved' ? 'bg-[#E8FAE8] text-[#30D158]' :
                                  member.status === 'pending' ? 'bg-[#FFF4E0] text-[#FF9F0A]' :
                                  'bg-[#e8eaed] text-[#5f6368]'
                                }`}>
                                  {member.status || 'pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{formatDate(member.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Donations Table */}
                {activeTab === 'donations' && (
                  <div className="overflow-x-auto">
                    {donations.length === 0 ? (
                      <div className="p-12 text-center text-[#5f6368]">
                        No donations recorded yet
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-[#f8f9fa] border-b border-[#e8eaed]">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Donor</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Method</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8eaed]">
                          {donations.map((donation) => (
                            <tr key={donation.id} className="hover:bg-[#f8f9fa] transition-colors">
                              <td className="px-6 py-4 text-sm text-[#1C1C1E] font-medium">{donation.donor_name}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{donation.donor_email}</td>
                              <td className="px-6 py-4 text-sm text-[#1C1C1E] font-medium">
                                {donation.currency} {donation.amount?.toLocaleString('en-IN')}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368] capitalize">{donation.method || '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  donation.status === 'completed' ? 'bg-[#E8FAE8] text-[#30D158]' :
                                  donation.status === 'pending' ? 'bg-[#FFF4E0] text-[#FF9F0A]' :
                                  'bg-[#FCE4EC] text-[#FF6B6B]'
                                }`}>
                                  {donation.status || 'pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{formatDate(donation.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Events Table */}
                {activeTab === 'events' && (
                  <div className="overflow-x-auto">
                    {events.length === 0 ? (
                      <div className="p-12 text-center text-[#5f6368]">
                        No event registrations yet
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-[#f8f9fa] border-b border-[#e8eaed]">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Event</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Participant</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Phone</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Guests</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8eaed]">
                          {events.map((event) => (
                            <tr key={event.id} className="hover:bg-[#f8f9fa] transition-colors">
                              <td className="px-6 py-4 text-sm text-[#1C1C1E] font-medium">{event.event_name}</td>
                              <td className="px-6 py-4 text-sm text-[#1C1C1E]">{event.participant_name}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{event.participant_email}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{event.participant_phone || '-'}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{event.num_guests || 0}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  event.status === 'registered' ? 'bg-[#E8FAE8] text-[#30D158]' :
                                  event.status === 'cancelled' ? 'bg-[#FCE4EC] text-[#FF6B6B]' :
                                  'bg-[#e8eaed] text-[#5f6368]'
                                }`}>
                                  {event.status || 'registered'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{formatDate(event.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Messages Table */}
                {activeTab === 'messages' && (
                  <div className="overflow-x-auto">
                    {messages.length === 0 ? (
                      <div className="p-12 text-center text-[#5f6368]">
                        No messages received yet
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-[#f8f9fa] border-b border-[#e8eaed]">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Subject</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Message</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8eaed]">
                          {messages.map((message) => (
                            <tr key={message.id} className="hover:bg-[#f8f9fa] transition-colors">
                              <td className="px-6 py-4 text-sm text-[#1C1C1E] font-medium">{message.name}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{message.email}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368] capitalize">{message.subject || '-'}</td>
                              <td className="px-6 py-4 text-sm text-[#5f6368] max-w-xs truncate">{message.message}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  message.status === 'read' ? 'bg-[#e8eaed] text-[#5f6368]' :
                                  message.status === 'replied' ? 'bg-[#E8FAE8] text-[#30D158]' :
                                  'bg-[#E3F2FF] text-[#0A84FF]'
                                }`}>
                                  {message.status || 'unread'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#5f6368]">{formatDate(message.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Info Note */}
          <div className="mt-8 p-4 rounded-2xl bg-[#E3F2FF] border border-[#0A84FF]/20">
            <p className="text-sm text-[#5f6368]">
              <span className="font-medium text-[#1C1C1E]">Note:</span> This is a basic admin view.
              For data management (edit, delete), access your Supabase dashboard directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
