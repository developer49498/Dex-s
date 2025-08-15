import React, { useEffect, useState } from 'react'
import { Zap, Shield, Eye, Sparkles, Globe, Cpu } from 'lucide-react'
import lion from '../assets/logo.png'

const LionIntro = ({ onGetStarted }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles with Web3 theme
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
    }))
    setParticles(particleArray)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-mesh flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.speed}s`,
              background: particle.color
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent-yellow/20 rounded-full animate-pulse-slow" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-yellow/10 rounded-lg rotate-45 animate-bounce-slow" />
        <div className="absolute bottom-32 left-32 w-20 h-20 border border-accent-purple/20 hexagon animate-spin-slow" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-purple/10 rounded-full animate-ping-slow" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo section with modern styling */}
        <div className="mb-8">
          <div className="relative">
            {/* Glowing background circle */}
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-accent-yellow/20 via-accent-purple/20 to-accent-pink/20 p-6 border border-accent-yellow/30 relative overflow-hidden">
              {/* Animated inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 to-transparent animate-pulse-glow" />
              
              {/* Logo image */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
                <img
                  src={lion}
                  alt="DEX Lion Logo"
                  className="w-full h-full object-cover"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.4))' }}
                />
              </div>
              
              {/* Floating elements around logo */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent-yellow rounded-full animate-bounce-slow" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-purple rounded-full animate-ping-slow" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-accent-pink rounded-full animate-bounce-slow" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-accent-green rounded-full animate-ping-slow" />
            </div>
          </div>
        </div>

        {/* Welcome text with modern typography */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-accent-yellow mr-3 animate-pulse" />
            <h1 className="text-6xl font-black bg-gradient-to-r from-accent-yellow via-accent-purple to-accent-pink bg-clip-text text-transparent">
              Welcome to DEX
            </h1>
            <Sparkles className="w-6 h-6 text-accent-pink ml-3 animate-pulse" />
          </div>
          <p className="text-2xl text-white/90 font-medium leading-relaxed">
            The future of decentralized finance is here
          </p>
          <p className="text-lg text-white/60 font-normal mt-3">
            Powered by blockchain technology and AI
          </p>
        </div>

        {/* Feature grid with modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group">
            <div className="glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-glow-yellow">
              <div className="w-16 h-16 bg-gradient-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-yellow/30 group-hover:border-accent-yellow/50 transition-colors">
                <Zap className="w-8 h-8 text-accent-yellow" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70 text-sm leading-relaxed">Instant transactions with sub-second finality</p>
            </div>
          </div>
          
          <div className="group">
            <div className="glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-glow-green">
              <div className="w-16 h-16 bg-gradient-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-green/30 group-hover:border-accent-green/50 transition-colors">
                <Shield className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure & Trustless</h3>
              <p className="text-white/70 text-sm leading-relaxed">Built on immutable blockchain technology</p>
            </div>
          </div>
          
          <div className="group">
            <div className="glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-glow-purple">
              <div className="w-16 h-16 bg-gradient-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-purple/30 group-hover:border-accent-purple/50 transition-colors">
                <Cpu className="w-8 h-8 text-accent-purple" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Powered</h3>
              <p className="text-white/70 text-sm leading-relaxed">Advanced analytics and fraud detection</p>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="mb-8">
          <button
            onClick={onGetStarted}
            className="btn-primary px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default LionIntro
