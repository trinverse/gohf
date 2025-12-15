import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get approved members count
    const { count: membersCount, error: membersError } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

    if (membersError) {
      console.error('Error fetching members count:', membersError)
    }

    // Get users count
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      console.error('Error fetching users count:', usersError)
    }

    return NextResponse.json({
      members: membersCount || 0,
      users: usersCount || 0,
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
