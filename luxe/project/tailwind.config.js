/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#C6A45C',
          darkGold: '#B59449',
          black: '#0A0A0A',
          gray: '#1A1A1A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
        'rotate-y': 'rotateY 0.6s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(20px) rotateX(-10deg)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) rotateX(0)',
            opacity: '1'
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotateX(0) rotateY(0)'
          },
          '50%': { 
            transform: 'translateY(-10px) rotateX(2deg) rotateY(2deg)'
          },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGold: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(198, 164, 92, 0.4)'
          },
          '50%': { 
            boxShadow: '0 0 0 15px rgba(198, 164, 92, 0)'
          },
        },
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(198, 164, 92, 0.25)',
        '3d': '0 10px 30px -10px rgba(198, 164, 92, 0.3)',
        'gold': '0 0 15px rgba(198, 164, 92, 0.3)',
        'gold-lg': '0 0 30px rgba(198, 164, 92, 0.4)',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(45deg, #C6A45C, #B59449)',
      },
    },
  },
  plugins: [],
};