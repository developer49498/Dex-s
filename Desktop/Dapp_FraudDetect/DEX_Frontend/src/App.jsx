import React, { useState } from 'react'
import './App.css'
import LionIntro from './components/LionIntro'
import DEXInterface from './components/DEXInterface'

function App() {
  const [showDEX, setShowDEX] = useState(false)

  const handleGetStarted = () => {
    setShowDEX(true)
  }

  if (showDEX) {
    return <DEXInterface />
  }

  return (
    <div className="App bg-gradient-mesh min-h-screen">
      <LionIntro onGetStarted={handleGetStarted} />
    </div>
  )
}

export default App
