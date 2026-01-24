/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'luxury-fade-in': 'luxuryFadeIn 1s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float-subtle': 'floatSubtle 6s ease-in-out infinite',
        'shimmer-line': 'shimmerLine 2s linear infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        luxuryFadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px) scale(0.98)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmerLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        },
        borderGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(190, 81, 97, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(190, 81, 97, 0.4)'
          }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
