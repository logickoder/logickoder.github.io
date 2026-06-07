import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      serif: ['"Fraunces"', ...defaultTheme.fontFamily.serif],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
    },
    extend: {
      screens: {
        '3xl': '1920px'
      },
      colors: {
        // Burnt-orange accent — anchored on Chocolate #D2691E
        // Distinct from Tailwind-default blue dev portfolios.
        primary: {
          50: '#FDF6F0',
          100: '#FBEAD7',
          200: '#F7D0AC',
          300: '#F0AE6F',
          400: '#E68D40',
          500: '#D2691E',
          600: '#B5571A',
          700: '#8C4015',
          800: '#663012',
          900: '#422010',
          950: '#2A1408'
        },
        'chinese-black': '#111418',
        gray: {
          950: '#0a0c0f',
          900: '#111418',
          800: '#1a1f26',
          700: '#2d3748',
          600: '#4a5568',
          500: '#718096',
          400: '#a0aec0',
          300: '#cbd5e0',
          200: '#e2e8f0',
          100: '#f7fafc',
          50: '#fafbfc'
        }
      },
      fontSize: {
        xxs: '0.625rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(210, 105, 30, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(210, 105, 30, 0.6)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  }
} satisfies Config;
