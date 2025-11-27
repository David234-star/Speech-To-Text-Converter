import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // We define the font families here
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      // We Map our CSS variables to Tailwind colors
      colors: {
        'dark-navy': 'var(--dark-navy)',
        'dark-violet': 'var(--dark-violet)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-magenta': 'var(--neon-magenta)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      // Custom shadows for the neon glow
      boxShadow: {
        'glow-cyan': '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)',
        'glow-magenta': '0 0 10px var(--neon-magenta), 0 0 20px var(--neon-magenta)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
export default config