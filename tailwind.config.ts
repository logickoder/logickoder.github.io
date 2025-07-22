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
        primary: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe2fe',
          300: '#93d0fd',
          400: '#60b4fa',
          500: '#3b96f6',
          600: '#0c7ff2',
          700: '#0369dd',
          800: '#0754b3',
          900: '#0c4a8c',
          950: '#082f57'
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
          '0%': { boxShadow: '0 0 20px rgba(12, 127, 242, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(12, 127, 242, 0.6)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  }
} satisfies Config;
