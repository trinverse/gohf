'use client'

import { useEffect, useState } from 'react'

interface Stats {
  members: number
  users: number
}

export default function StatsCounter() {
  const [stats, setStats] = useState<Stats>({ members: 0, users: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-6 md:gap-8">
      <div className="text-center p-6 md:p-8 rounded-3xl bg-[var(--md-sys-color-surface-container-low)]">
        <p className="text-5xl md:text-6xl font-semibold text-[var(--md-sys-color-primary)]">
          {loading ? '...' : stats.members}
        </p>
        <p className="mt-2 text-base text-[var(--md-sys-color-on-surface-variant)]">Members</p>
      </div>
      <div className="text-center p-6 md:p-8 rounded-3xl bg-[var(--md-sys-color-surface-container-low)]">
        <p className="text-5xl md:text-6xl font-semibold text-[var(--md-sys-color-secondary)]">
          {loading ? '...' : stats.users}
        </p>
        <p className="mt-2 text-base text-[var(--md-sys-color-on-surface-variant)]">Users</p>
      </div>
    </div>
  )
}
