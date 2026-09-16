/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tm: {
          bg: '#070b09',
          card: '#0d1311',
          border: '#1c2622',
          green: '#00ff88',
          'green-dim': '#00cc6a',
          muted: '#8b9690',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 255, 136, 0.15)',
        'glow-strong': '0 0 60px rgba(0, 255, 136, 0.28)',
      },
      maxWidth: {
        page: '1180px',
      },
    },
  },
  plugins: [],
};
