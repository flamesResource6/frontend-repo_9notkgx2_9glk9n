import { useState } from 'react'
import Hero from './components/Hero'
import Lobby from './components/Lobby'
import StatsBar from './components/StatsBar'

function App() {
  const [entered, setEntered] = useState(false)
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero onSubmit={() => setEntered(true)} />
      <Lobby visible={entered} />
      <StatsBar />
    </div>
  )
}

export default App
