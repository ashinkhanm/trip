/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meme: {
          yellow: '#FFDE00',
          orange: '#FF5722',
          purple: '#7928CA',
          pink: '#FF0080',
          dark: '#111827',
          card: '#1F2937',
          accent: '#00F5D4',
          whatsapp: '#25D366'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Manjari', 'Gayathri', 'sans-serif'],
        malayalam: ['Manjari', 'Gayathri', 'Noto Sans Malayalam', 'sans-serif'],
        comic: ['Bangers', 'Chilanka', 'cursive', 'sans-serif']
      },
      animation: {
        'bounce-slight': 'bounceSlight 2s infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 25px rgba(255, 222, 0, 0.6)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 10px rgba(255, 87, 34, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
