import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        candy: {
          pink: '#f9a8d4',
          purple: '#c084fc',
          yellow: '#fde047',
          green: '#86efac',
          orange: '#fdba74',
          red: '#fca5a5',
        },
        playmat: {
          bg: '#e0f2fe',
          card: '#ffffff',
          accent: '#7dd3fc',
          text: '#1e3a5f',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Comic Sans MS', 'cursive'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'progress': 'progress 12s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        progress: {
          '0%': { width: '0%' },
          '20%': { width: '15%' },
          '40%': { width: '35%' },
          '60%': { width: '55%' },
          '80%': { width: '80%' },
          '95%': { width: '92%' },
          '100%': { width: '98%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
