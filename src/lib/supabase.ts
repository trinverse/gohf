import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
})

// Admin client with service role key (bypasses RLS) - only use server-side
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase

// Types for our database tables
export interface Member {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  interest?: string
  message?: string
  status?: string
  created_at?: string
}

export interface Donation {
  id?: string
  member_id?: string
  donor_name: string
  donor_email: string
  amount: number
  currency?: string
  method?: string
  transaction_id?: string
  notes?: string
  status?: string
  created_at?: string
}

export interface EventRegistration {
  id?: string
  member_id?: string
  event_name: string
  participant_name: string
  participant_email: string
  participant_phone?: string
  num_guests?: number
  notes?: string
  status?: string
  created_at?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  subject?: string
  message: string
  status?: string
  created_at?: string
}
