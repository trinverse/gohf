'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Founders', href: '/founders' },
  { name: 'Events', href: '/events' },
  { name: 'Join Us', href: '/join' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#0A84FF] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-semibold text-sm">JNV</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#1C1C1E] font-semibold tracking-tight">Alumni Foundation</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-[#5f6368] hover:text-[#0A84FF] rounded-full hover:bg-[#E3F2FF] transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-4 px-6 py-2.5 text-sm font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] hover:shadow-lg hover:shadow-[#0A84FF]/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Involved
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#1C1C1E] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-[#1C1C1E] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#1C1C1E] rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-[#5f6368] hover:text-[#0A84FF] hover:bg-[#E3F2FF] rounded-2xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link
                href="/join"
                className="block w-full py-3 text-center text-base font-medium text-white bg-[#0A84FF] rounded-2xl hover:bg-[#0066CC] transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
