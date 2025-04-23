import { light } from 'daisyui/src/theming/themes';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-iransans)'],
        sans: ['var(--font-iransans)'],
      },
      screens: {
        'sm-down': { max: '639px' },
        'xtra-small': { min: '319px' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          primary: '#EF233C',
          'primary-content': '#FEFFFB',
          secondary: '#1C326E',
          accent: '#9C27B1',
          neutral: '#EDF2F5',
          'base-100': '#FFFFFF',
          'base-200': '#F0F0F1',
          'base-300': '#F6F6F7',
          '.text-100': {
            'text-color': '#4B4B6D',
          },
          '.star-active': {
            'background-color': '#FAA927',
          },
          '.star-inactive': {
            'background-color': '#A0A3A9',
          },
        },
        octocommerce: {
          primary: '#EF233C',
          'primary-content': '#FEFFFB',
          secondary: '#1C326E',
          accent: '#9C27B1',
          neutral: '#EDF2F5',
          'base-100': '#FFFFFF',
          'base-200': '#F6F6F7',
          'base-300': '#F6F6F7',
          'star-active': '#FAA927',
          'star-inactive': '#A0A3A9',
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
} satisfies Config;
