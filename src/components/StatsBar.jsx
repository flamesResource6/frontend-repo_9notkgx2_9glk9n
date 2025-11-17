import { useEffect, useState } from 'react'

export default function StatsBar() {
  const [stats, setStats] = useState({ total_opted_in: 0, spots_left: 10000 })

  useEffect(() => {
    const backend = import.meta.env.VITE_BACKEND_URL || ''
    fetch(`${backend}/api/stats`).then(r => r.json()).then(setStats).catch(() => {})
    const id = setInterval(() => {
      fetch(`${backend}/api/stats`).then(r => r.json()).then(setStats).catch(() => {})
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full bg-white/70 backdrop-blur border-t border-gray-200 py-3">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-end gap-6 text-sm text-gray-800">
        <div className="flex items-center gap-2"><span className="font-semibold">Opted in:</span> {stats.total_opted_in ?? 0}</div>
        <div className="flex items-center gap-2"><span className="font-semibold">Spots left:</span> {stats.spots_left ?? 0}</div>
      </div>
    </div>
  )
}
