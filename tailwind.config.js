/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'Rubik', 'system-ui', 'sans-serif'],
        heading: ['Rubik', 'Assistant', 'sans-serif'],
      },
      colors: {
        revit: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36a9f7',
          500: '#0c8de8',
          600: '#006fc6',
          700: '#0058a1',
          800: '#044b84',
          900: '#093f6e',
          950: '#062849',
        },
        blueprint: {
          bg: '#0a101d',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          accent: '#00a3ff',
          glow: 'rgba(0, 163, 255, 0.35)',
        }
      },
      backgroundImage: {
        'blueprint-grid': "linear-gradient(to right, rgba(0, 163, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 163, 255, 0.05) 1px, transparent 1px)",
        'hero-gradient': "radial-gradient(ellipse at top, rgba(14, 165, 233, 0.18) 0%, rgba(10, 16, 29, 0.95) 70%)",
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 163, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 163, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
