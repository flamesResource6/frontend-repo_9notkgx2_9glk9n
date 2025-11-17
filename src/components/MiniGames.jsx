import { useEffect, useRef, useState } from 'react'

function ClickSprint() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(10)
  const [running, setRunning] = useState(false)
  useEffect(()=>{
    if (!running || time<=0) return
    const t = setInterval(()=> setTime((s)=> s-1), 1000)
    return ()=> clearInterval(t)
  }, [running, time])
  return (
    <div className="p-4 border rounded-xl">
      <h4 className="font-semibold">Click Sprint</h4>
      <p className="text-sm text-gray-600">How many clicks in 10 seconds?</p>
      <div className="mt-3 flex items-center gap-4">
        <button onClick={()=>{ if(!running) setRunning(true); if(time>0) setCount(c=>c+1) }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Click!</button>
        <div className="text-sm">Score: <span className="font-semibold">{count}</span></div>
        <div className="text-sm">Time: <span className="font-semibold">{time}s</span></div>
        {time<=0 && <button onClick={()=>{setTime(10); setCount(0); setRunning(false)}} className="px-3 py-2 bg-gray-100 rounded-lg">Reset</button>}
      </div>
    </div>
  )
}

function WhackADot() {
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(Math.floor(Math.random()*9))
  useEffect(()=>{
    const t = setInterval(()=> setActive(Math.floor(Math.random()*9)), 700)
    return ()=> clearInterval(t)
  },[])
  return (
    <div className="p-4 border rounded-xl">
      <h4 className="font-semibold">Whack‑a‑Dot</h4>
      <p className="text-sm text-gray-600">Tap the highlighted dot!</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {Array.from({length:9}).map((_,i)=> (
          <button key={i} onClick={()=> i===active && setScore(s=>s+1)} className={`aspect-square rounded-lg ${i===active? 'bg-indigo-500' : 'bg-gray-200'} transition-colors`}></button>
        ))}
      </div>
      <div className="mt-3 text-sm">Score: <span className="font-semibold">{score}</span></div>
    </div>
  )
}

export default function MiniGames() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900">Mini‑Games</h3>
        <p className="text-gray-600 mt-1">Quick, friendly games to pass time in the lobby.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <ClickSprint />
          <WhackADot />
        </div>
      </div>
    </section>
  )
}
