import { useState } from 'react'
import Hero from './components/Hero'
import Lobby from './components/Lobby'
import StatsBar from './components/StatsBar'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import MiniGames from './components/MiniGames'

function App() {
  const [entered, setEntered] = useState(false)
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero onSubmit={() => setEntered(true)} />
      <Lobby visible={entered} />
      <MiniGames />
      <StatsBar />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
