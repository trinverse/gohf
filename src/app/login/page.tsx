'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (isSignUp) {
      // Validate passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      // Validate password length
      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      const { error } = await signUp(email, password)

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        setSuccess('Account created! Please check your email to verify your account.')
        setLoading(false)
        // Clear form
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } else {
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setSuccess(null)
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-3xl bg-[#0A84FF] flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-semibold text-xl">GHF</span>
          </div>
          <h1 className="text-3xl font-semibold text-[#1C1C1E] tracking-tight">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h1>
          <p className="mt-3 text-[#86868b]">
            {isSignUp ? 'Join the Guardians of Hope community' : 'Sign in to access your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1E] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-4 rounded-2xl bg-[#f5f5f7] border-0 text-[#1C1C1E] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0A84FF] transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1C1C1E] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              className="w-full px-4 py-4 rounded-2xl bg-[#f5f5f7] border-0 text-[#1C1C1E] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0A84FF] transition-all duration-300"
              placeholder={isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'}
            />
          </div>

          {/* Confirm Password - Only for Sign Up */}
          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1C1C1E] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full px-4 py-4 rounded-2xl bg-[#f5f5f7] border-0 text-[#1C1C1E] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0A84FF] transition-all duration-300"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-[#FCE4EC] text-[#FF6B6B] text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 rounded-2xl bg-[#E8FAE8] text-[#30D158] text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-[#0A84FF] text-white font-medium text-base hover:bg-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </span>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </button>
        </form>

        {/* Toggle Sign In / Sign Up */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#86868b]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#0A84FF] font-medium hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-[#86868b] hover:text-[#0A84FF] transition-colors duration-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
