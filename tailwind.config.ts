import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        surface: '#18181B',
        primary: '#6366F1',
        muted: '#A1A1AA',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(99, 102, 241, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
