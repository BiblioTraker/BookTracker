import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Illustratif & Vintage (light mode)
        parchment:   '#F6E8DC',
        sepia:       '#A17F59',
        rust:        '#B35949',
        teal:        '#6B9E9F',
      },
      fontFamily: {
        // Vintage
        body:    ['Merriweather', 'serif'],
        heading: ['Parisienne', 'cursive'],
      },
    },
  },
  plugins: [
    typography,
  ],
};