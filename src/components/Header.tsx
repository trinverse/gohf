'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Founders', href: '/founders' },
  { name: 'Members', href: '/members' },
  { name: 'Events', href: '/events' },
  { name: 'Join Us', href: '/join' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, role, signOut } = useAuth()
  const router = useRouter()

  const isAdmin = role === 'admin'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = () => {
    console.log('Logout clicked')
    setMobileMenuOpen(false)

    // Clear storage synchronously first
    localStorage.removeItem('gohf-user-role') // Clear cached role
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth')) {
        localStorage.removeItem(key)
      }
    })
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth')) {
        sessionStorage.removeItem(key)
      }
    })

    // Call signOut (fire and forget - don't await)
    signOut().catch(err => console.error('SignOut error:', err))

    // Redirect immediately - don't wait for async operations
    window.location.href = '/'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
        scrolled
          ? 'bg-[var(--md-sys-color-surface-bright)]/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <Logo size="md" />
            <div className="hidden sm:block">
              <span className="text-[var(--md-sys-color-on-surface)] font-semibold tracking-tight">Guardians of Hope</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-container)] transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Link - Only visible to admins */}
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-[var(--md-sys-color-secondary)] hover:text-[var(--md-sys-color-secondary)] rounded-full hover:bg-[var(--md-sys-color-secondary-container)] transition-all duration-300"
              >
                Admin
              </Link>
            )}

            {/* Auth Buttons - Always show Login unless user is logged in */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="ml-2 px-4 py-2 text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-accent)] rounded-full hover:bg-[var(--md-sys-color-error-container)] transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-4 py-2 text-sm font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-container)] transition-all duration-300"
              >
                Login
              </Link>
            )}

            <ThemeToggle />

            <Link
              href="/join"
              className="ml-2 px-6 py-2.5 text-sm font-medium text-[var(--md-sys-color-on-primary)] bg-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-dark)] hover:shadow-lg hover:shadow-[var(--md-sys-color-primary)]/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Involved
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--md-sys-color-surface-container)] transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-[var(--md-sys-color-on-surface)] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-[var(--md-sys-color-on-surface)] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-[var(--md-sys-color-on-surface)] rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary-container)] rounded-2xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Link - Mobile */}
            {isAdmin && (
              <Link
                href="/admin"
                className="block px-4 py-3 text-base font-medium text-[var(--md-sys-color-secondary)] hover:bg-[var(--md-sys-color-secondary-container)] rounded-2xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {/* Auth - Mobile - Always show Login unless user is logged in */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 text-base font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-accent)] hover:bg-[var(--md-sys-color-error-container)] rounded-2xl transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-3 text-base font-medium text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary-container)] rounded-2xl transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}

            <div className="pt-4 px-4">
              <Link
                href="/join"
                className="block w-full py-3 text-center text-base font-medium text-[var(--md-sys-color-on-primary)] bg-[var(--md-sys-color-primary)] rounded-2xl hover:bg-[var(--md-sys-color-primary-dark)] transition-all duration-300"
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
