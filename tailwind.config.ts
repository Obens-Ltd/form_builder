import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005E5D',
          50: '#E3F4F0',
          100: '#D1EDE6',
          200: '#ADDED3',
          300: '#88D0BF',
          400: '#64C1AC',
          500: '#45AD95',
          600: '#1A876F',
          700: '#286456',
          800: '#194037',
          900: '#0B1B17',
        },
        // ...
        browngray: '#f6f6f6',
        headinglight: '#899894',
        heading: '#274840',
        input: '#7b7b7b',
        mapping: '#03363D',
        mappingtext: '#CFCFCF',
        Golding: '#E8A804',
        sky900: 'rgb(12 74 110)',
        Bader: '#0284C7',
        slate900: 'rgb(15 23 42)',
        slate950: 'rgb(2 6 23)',
        coop: 'rgb(248 113 113)',
        collec: 'rgb(17 ,180 ,218)',
        supplier: '#3b82f6',
        bgmap: '#CEDEBD',
        bg1map: '#FCE09B',
        textmap: '#186F65',
        bgmap100: 'rgb(8 145 178)',
        mapsecond: '#283739',
        icons: '#9c9c9c',
        grayBox: '#353535',
        greenSection: '#02373F',
        graytext: '#B3C3C5',
        goldText: '#EEE2B6',
        greenInput: '#032C32',
        obensBlue: '#404E7C',
      },

      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        script: ['monospace', ...defaultTheme.fontFamily.sans],
        in: ['inter', ...defaultTheme.fontFamily.sans],
        CreamCake: ['CreamCake', ...defaultTheme.fontFamily.sans],
        Magical: ['Magical', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        max2xl: { max: '1535px' },
        maxxl: { max: '1279px' },
        maxlg: { max: '1023px' },
        maxmd: { max: '767px' },
        maxsm: { max: '639px' },
        maxxs: { max: '320px' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
  ],
};
export default config;
