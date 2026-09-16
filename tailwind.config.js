/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tm: {
          bg: '#0a0d0f',
          card: '#12161a',
          border: '#1e262d',
          green: '#00ff88',
          'green-dim': '#00cc6a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 255, 136, 0.15)',
        'glow-strong': '0 0 60px rgba(0, 255, 136, 0.25)',
      },
    },
  },
  plugins: [],
};
