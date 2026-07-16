import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF0EB',
          100: '#FFD6C7',
          200: '#FFBCA3',
          300: '#FFA27F',
          400: '#FF885B',
          500: '#FF6B35',
          600: '#FF4D0F',
          700: '#DB3A00',
          800: '#B72E00',
          900: '#932200',
        },
        secondary: {
          DEFAULT: '#2D3047',
          50: '#F5F5F7',
          100: '#E6E7EB',
          200: '#D0D2DA',
          300: '#B9BCC9',
          400: '#A3A7B8',
          500: '#8C91A7',
          600: '#757B96',
          700: '#5E6685',
          800: '#475074',
          900: '#2D3047',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config