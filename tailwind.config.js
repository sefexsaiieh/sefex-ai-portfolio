/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#53b0ff',
          500: '#2b8fff',
          600: '#1470f5',
          700: '#0d5be1',
          800: '#114ab6',
          900: '#14408f',
          950: '#102957',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};
