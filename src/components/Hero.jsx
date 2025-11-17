import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [drop, setDrop] = useState(false)
  const audioRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const backend = import.meta.env.VITE_BACKEND_URL || ''
    if (!email) {
      setError('Please enter your email')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/early-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero' })
      })
      if (!res.ok) throw new Error('Signup failed')
      const data = await res.json()
      // trigger drop animation + sound, then reveal lobby
      setDrop(true)
      if (audioRef.current) {
        try { audioRef.current.currentTime = 0; audioRef.current.play() } catch {}
      }
      setTimeout(() => onSubmit?.(data), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    const onKey = (e) => {
      if (e.key === 'Enter') {
        const form = document.getElementById('hero-form')
        if (form) form.requestSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/10 to-white pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 sm:pt-16">
        <div className={`backdrop-blur-sm bg-white/40 border border-white/60 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-xl transition-transform duration-700 ${drop ? '-translate-y-[120vh] opacity-0' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">ROME</h1>
          <p className="mt-3 text-gray-700">A playful world where your avatar drops into a living lobby. Get early access.</p>
          <form id="hero-form" onSubmit={handleSubmit} className="mt-6 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-gray-300 bg-white/80 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 transition-colors disabled:opacity-60"
            >
              {loading ? 'Entering…' : 'Enter'}
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-2 text-xs text-gray-600">By entering, you agree to receive updates about early access.</p>
        </div>
      </div>

      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3" preload="auto" />
    </section>
  )
}
