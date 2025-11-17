import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const nav = [
    { to: '/mission', label: 'Mission' },
    { to: '/features', label: 'Features' },
    { to: '/download', label: 'Download' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">ROME</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `hover:text-gray-900 transition-colors ${isActive ? 'text-gray-900 font-semibold' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/download" className="rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm font-medium hover:bg-indigo-700">Get App</Link>
      </div>
    </header>
  )
}
