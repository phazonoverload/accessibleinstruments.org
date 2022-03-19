const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        durable: '#009473',
        flexible: '#0066FF',
        practical: '#FF0066',
        complex: '#FCAF3C',
        compatible: '#FF4E00'
      },
      fontFamily: {
        sans: ['Fredoka', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
