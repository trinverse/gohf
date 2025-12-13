'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

const waysToHelp = [
  {
    title: 'Volunteer',
    description: 'Contribute your time and skills to our programs and events.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Donate',
    description: 'Your contribution helps provide scholarships and resources.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: 'Mentor',
    description: 'Guide students in their academic and career journey.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Spread the Word',
    description: 'Share our mission with your network and community.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
]

const stats = [
  { value: '100+', label: 'Children Helped' },
  { value: '20+', label: 'Active Volunteers' },
  { value: '10+', label: 'Programs Running' },
]

export default function Join() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interest: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Hero
        title="Join Us"
        subtitle="Be part of the change. Your involvement can transform lives."
        minimal
      />

      {/* Ways to Help */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-medium text-[#FF9F0A] tracking-wide uppercase">Get Involved</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#1C1C1E] tracking-tight">Ways to Contribute</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {waysToHelp.map((way) => (
              <Card
                key={way.title}
                title={way.title}
                description={way.description}
                icon={way.icon}
                variant="elevated"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">Express Your Interest</h2>
            <p className="mt-4 text-[#5f6368]">
              Fill out the form and we&apos;ll get in touch about how you can contribute.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-4 rounded-2xl bg-[#E8FAE8] border border-[#30D158] text-center">
              <p className="text-[#1C1C1E] font-medium">Thank you for your interest!</p>
              <p className="text-sm text-[#5f6368] mt-1">We&apos;ll be in touch soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 rounded-2xl bg-[#FCE4EC] border border-[#FF6B6B] text-center">
              <p className="text-[#1C1C1E] font-medium">Something went wrong</p>
              <p className="text-sm text-[#5f6368] mt-1">Please try again or email us directly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                How would you like to help? *
              </label>
              <select
                id="interest"
                required
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
              >
                <option value="">Select an option</option>
                <option value="volunteer">Volunteer</option>
                <option value="donate">Donate</option>
                <option value="mentor">Become a Mentor</option>
                <option value="partner">Partner with Us</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                Tell us about yourself
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300 resize-none"
                placeholder="Your background and why you want to join..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-base font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#E3F2FF] to-[#f8f9fa]">
            <h2 className="text-2xl font-semibold text-[#1C1C1E] tracking-tight text-center mb-10">
              Your Impact Matters
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-4xl md:text-5xl font-semibold ${index === 0 ? 'text-[#0A84FF]' : index === 1 ? 'text-[#FF9F0A]' : 'text-[#30D158]'}`}>{stat.value}</p>
                  <p className="mt-2 text-sm text-[#5f6368]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
