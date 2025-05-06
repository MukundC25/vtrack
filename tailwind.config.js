/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: {
          light: '#6366f1',
          dark: '#4f46e5',
        },
        accent: {
          light: '#10b981',
          dark: '#059669',
        },
        background: {
          light: '#f8f9fa',
          dark: '#121212',
        },
        card: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        text: {
          light: '#333333',
          dark: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
}
