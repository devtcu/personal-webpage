/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#000000', /* black */
        charcoal: {
          100: '#f5f5f6',
          200: '#e5e5e7',
          300: '#c8c8cc',
          400: '#a0a0a8',
          500: '#7c7c86',
          600: '#5f5f6b',
          700: '#4a4a54',
          800: '#33333a',
          900: '#212126',
        },
      },
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
