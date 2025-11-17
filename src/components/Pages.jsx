export function Placeholder({ title, children }) {
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">This is a placeholder section. We’ll flesh it out with your content.</p>
        <div className="mt-6 prose prose-gray max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ContactPage() {
  const base = import.meta.env.VITE_BACKEND_URL || ''
  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    const r = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (r.ok) alert('Thanks! We received your message.')
    else alert('Something went wrong. Please try again later.')
    e.currentTarget.reset()
  }
  return (
    <div className="min-h-[60vh] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <form onSubmit={submit} className="mt-6 grid gap-4 max-w-xl">
          <input name="name" placeholder="Name" className="px-4 py-3 border rounded-lg" />
          <input type="email" name="email" placeholder="Email" required className="px-4 py-3 border rounded-lg" />
          <input name="subject" placeholder="Subject" className="px-4 py-3 border rounded-lg" />
          <textarea name="message" placeholder="Your message" rows={5} required className="px-4 py-3 border rounded-lg" />
          <button className="px-4 py-3 bg-indigo-600 text-white rounded-lg">Send</button>
        </form>
      </div>
    </div>
  )
}
