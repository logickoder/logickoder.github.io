import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      screens: {
        '3xl': '1920px'
      },
      colors: {
        primary: '#0c7ff2',
        'chinese-black': '#111418'
      },
      fontSize: {
        xxs: '0.625rem'
      }
    }
  }
} satisfies Config;
