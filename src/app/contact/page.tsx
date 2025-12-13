'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
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
        title="Contact"
        subtitle="We&apos;d love to hear from you."
        minimal
      />

      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
                Get in touch
              </h2>
              <p className="mt-4 text-lg text-[#5f6368] leading-relaxed">
                Have questions about our initiatives? Want to get involved or partner with us?
                We&apos;re here to help.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E3F2FF] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0A84FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1E]">Email</h3>
                    <p className="mt-1 text-[#5f6368]">contact@guardiansofhope.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF4E0] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#FF9F0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1E]">Phone</h3>
                    <p className="mt-1 text-[#5f6368]">+91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8FAE8] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#30D158]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1E]">Response Time</h3>
                    <p className="mt-1 text-[#5f6368]">We typically respond within 24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-[#f8f9fa] border border-[#e8eaed]">
                <p className="text-sm text-[#5f6368]">
                  <span className="font-medium text-[#1C1C1E]">Note:</span> Guardians of Hope Foundation
                  is an independent non-profit by JNV alumni, not affiliated with official JNV administration.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:pl-8">
              <div className="p-8 md:p-10 rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <h3 className="text-2xl font-semibold text-[#1C1C1E] tracking-tight mb-8">
                  Send a message
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#E8FAE8] border border-[#30D158] text-center">
                    <p className="text-[#1C1C1E] font-medium">Message sent!</p>
                    <p className="text-sm text-[#5f6368] mt-1">We&apos;ll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#FCE4EC] border border-[#FF6B6B] text-center">
                    <p className="text-[#1C1C1E] font-medium">Something went wrong</p>
                    <p className="text-sm text-[#5f6368] mt-1">Please try again or email us directly.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

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
                    <label htmlFor="subject" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300"
                    >
                      <option value="">Select a topic</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="donate">Donations</option>
                      <option value="partner">Partnership</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-[#e8eaed] bg-white focus:border-[#0A84FF] focus:ring-0 transition-colors duration-300 resize-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-base font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
