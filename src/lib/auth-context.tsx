'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  role: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ROLE_STORAGE_KEY = 'gohf-user-role'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  // Initialize role from localStorage for immediate availability on refresh
  const [role, setRole] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ROLE_STORAGE_KEY)
    }
    return null
  })
  const [loading, setLoading] = useState(true)

  // Fetch user role from API (bypasses RLS)
  const fetchUserRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        return null
      }

      const response = await fetch('/api/users/role', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!response.ok) {
        console.error('Error fetching user role:', response.statusText)
        return null
      }

      const data = await response.json()
      return data?.role || null
    } catch (err) {
      console.error('Error fetching user role:', err)
      return null
    }
  }

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()

        if (initialSession?.user) {
          setSession(initialSession)
          setUser(initialSession.user)
          const userRole = await fetchUserRole()
          setRole(userRole)
          // Persist role to localStorage
          if (userRole) {
            localStorage.setItem(ROLE_STORAGE_KEY, userRole)
          }
        } else {
          // No session - clear any stale cached role
          localStorage.removeItem(ROLE_STORAGE_KEY)
          setRole(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession)
        setUser(currentSession?.user || null)

        if (currentSession?.user) {
          const userRole = await fetchUserRole()
          setRole(userRole)
          // Persist role to localStorage
          if (userRole) {
            localStorage.setItem(ROLE_STORAGE_KEY, userRole)
          }
        } else {
          // Clear cached role on logout
          localStorage.removeItem(ROLE_STORAGE_KEY)
          setRole(null)
        }

        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      // Insert user into users table with 'member' role
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            role: 'member'
          }])

        if (insertError) {
          console.error('Error creating user profile:', insertError)
          // Don't return error - auth succeeded, profile insert failed
        }
      }

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      // CRITICAL: Clear state FIRST to prevent race conditions
      setUser(null)
      setSession(null)
      setRole(null)

      // Clear ALL storage synchronously BEFORE calling Supabase signOut
      if (typeof window !== 'undefined') {
        // Clear cached role
        localStorage.removeItem(ROLE_STORAGE_KEY)

        // Clear localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth')) {
            localStorage.removeItem(key)
          }
        })

        // Clear sessionStorage
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth')) {
            sessionStorage.removeItem(key)
          }
        })
      }

      // Now call Supabase signOut with scope: 'global'
      await supabase.auth.signOut({ scope: 'global' })

    } catch (err) {
      console.error('Error during sign out:', err)
      // Even on error, ensure storage is cleared
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
