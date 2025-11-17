import { useEffect, useRef, useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'avatar', text: 'Welcome to ROME. Ask me anything or say "play" to try a mini‑game!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  const base = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content) return
    setMessages((m) => [...m, { role: 'user', text: content }])
    setInput('')
    setLoading(true)
    try {
      const r = await fetch(`${base}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: content }) })
      const data = await r.json()
      setMessages((m) => [...m, { role: 'avatar', text: data.reply || '…' }])
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(data.reply)
        u.rate = 1.05
        window.speechSynthesis.speak(u)
      }
    } catch (e) {
      setMessages((m) => [...m, { role: 'avatar', text: 'I ran into a connection issue. Try again?' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-2 bg-gray-900 text-white text-sm flex items-center justify-between">
            <span>Lobby Companion</span>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">✕</button>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${m.role==='avatar' ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); send()}} className="p-2 border-t border-gray-200 flex gap-2">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 border rounded-lg" />
            <button disabled={loading} className="px-3 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50">Send</button>
          </form>
        </div>
      )}
      {!open && (
        <button onClick={() => setOpen(true)} className="rounded-full bg-indigo-600 text-white px-4 py-3 shadow-lg">Chat</button>
      )}
    </div>
  )
}
