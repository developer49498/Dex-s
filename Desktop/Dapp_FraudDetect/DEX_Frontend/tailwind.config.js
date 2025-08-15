/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#000000',
        'dark-secondary': '#0a0a0a',
        'dark-tertiary': '#1a1a1a',
        'dark-quaternary': '#2d2d2d',
        'accent-yellow': '#7F611F',
        'accent-yellow-dark': '#6B4F1A',
        'accent-yellow-light': '#8B6B2A',
        'accent-green': '#00ff7f',
        'accent-green-dark': '#00cc66',
        'accent-purple': '#8a2be2',
        'accent-purple-dark': '#6a0dad',
        'accent-orange': '#ffa500',
        'accent-orange-dark': '#ff8c00',
        'accent-red': '#ff4757',
        'accent-red-dark': '#ff3742',
        'accent-pink': '#ff1493',
        'accent-pink-dark': '#c71585',
        'navy-600': '#1e3a8a',
        'navy-700': '#1e40af',
        'navy-800': '#1e3a8a',
        'navy-900': '#1e293b',
        'navy-200': '#bfdbfe',
        'gradient-start': '#000000',
        'gradient-mid': '#0a0a0a',
        'gradient-end': '#1a1a1a',
        'gradient-accent': '#2d2d2d'
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #2d2d2d 75%, #404040 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #00d4ff, #0099cc)',
        'gradient-green': 'linear-gradient(135deg, #00ff7f, #00cc66)',
        'gradient-purple': 'linear-gradient(135deg, #8a2be2, #6a0dad)',
        'gradient-orange': 'linear-gradient(135deg, #ffa500, #ff8c00)',
        'gradient-pink': 'linear-gradient(135deg, #ff1493, #c71585)',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-green': '0 0 20px rgba(0, 255, 127, 0.4)',
        'glow-purple': '0 0 20px rgba(138, 43, 226, 0.4)',
        'glow-orange': '0 0 20px rgba(255, 165, 0, 0.4)',
        'glow-pink': '0 0 20px rgba(255, 20, 147, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
