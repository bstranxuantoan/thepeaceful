import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FDF8F0',
          50: '#FEFCF8',
          100: '#FDF8F0',
          200: '#F5EDE0',
          300: '#EDE0CC',
        },
        sage: {
          50: '#EEF4EE',
          100: '#D4E4D5',
          200: '#A9C9AB',
          300: '#7DAE80',
          DEFAULT: '#5A7A5C',
          600: '#4A6A4C',
          700: '#3D5C3F',
          800: '#2E4530',
          900: '#1E2E20',
        },
        amber: {
          50: '#FEF7EC',
          100: '#FAEBD0',
          200: '#F2D4A0',
          DEFAULT: '#C4965A',
          600: '#B08040',
          700: '#8F6830',
        },
        forest: '#2C3A2C',
        muted: '#6B7B6B',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['18px', { lineHeight: '1.7' }],
      },
      boxShadow: {
        soft: '0 2px 20px rgba(90,122,92,0.08)',
        card: '0 4px 32px rgba(44,58,44,0.10)',
        cta: '0 4px 24px rgba(90,122,92,0.30)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
