/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        '2p': [
          '0px 0px 4px rgba(7, 19, 36, 0.08)',
          '0px 8px 24px rgba(7, 19, 36, 0.12)',
          '0px 16px 80px rgba(7, 19, 36, 0.08)',
        ],
      },
    },
  },
  plugins: [],
};
