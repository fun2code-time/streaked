import type { Config } from 'tailwindcss';

// Tailwind theme + content mapping for App Router and component folders.
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefcf4',
          100: '#d6f8e4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        }
      }
    }
  },
  plugins: []
};

export default config;
