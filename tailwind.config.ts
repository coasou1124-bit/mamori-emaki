import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kin: '#c9a047',
        'kin-light': '#d4b96a',
        shu: '#a83232',
        fukai: '#0d1117',
        kard: '#161d27',
        washi: '#f0ebe0',
        'washi-dim': '#8a8070',
      },
      fontFamily: {
        'serif-jp': ['"Noto Serif JP"', 'Georgia', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
