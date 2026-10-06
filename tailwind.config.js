/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#121417",
        bgDarkCard: "#1B1E23",
        bgDarkHover: "#242830",
        accentOrange: "#FF6322",
        textMuted: "#9CA3AF",
        textLight: "#E5E7EB",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Instrument Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #EBE1B0 -86.53%, #AEA8FE 100%)',
        'accent-orange-glow': 'radial-gradient(140% 100% at 50% 60%, rgba(255,99,34,0) 40%, rgba(255,99,34,0.35) 100%)',
      },
    },
  },
  plugins: [],
};
