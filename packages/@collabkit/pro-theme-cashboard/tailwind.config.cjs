/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'prime-norm': '#35b474', // cashboard green
        'prime-ghost': 'rgba(54, 179, 116, 0.15)',
        'prime-hover': 'rgba(54, 179, 116, 0.3)',
        'prime-pressed': 'rgba(54, 179, 116, 0.5)',
        'prime-focus': '#9bd9b9',
        'prime-dark': '#2C915E',
        'cb-white': '#FFFFFF',
        'sec-hover': '#f2f2f2',
        'sec-pressed': '#e6e6e6',
        'cb-spark': '#E53D00',
        'cb-fg1': '#000000',
        'cb-fg2': '#6A7278',
        'cb-fg3': '#B4BDC2',
        'cb-bg1': '#FFFFFF',
        'cb-bg2': '#F5F8FA',
        'cb-bg3': '#E3E9ED',
        'cb-bg4': '#E5E5E5',
        bg3: '#E3E9ED',
      },
    },
  },
  plugins: [],
};
