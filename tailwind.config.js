/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  },
  theme: {
    extend: {
      screens: {
        xs: "430px",  // Custom breakpoint at 430px
      },
      colors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        light: "var(--text-light)",
        sale: "var(--text-sale)",
        white: "var(--text-white)",

        button: "var(--color-button)",
        hover: "var(--color-hover)",

        b: {
          "01": "var(--color-border01)",
          "02": "var(--color-border02)",
          "03": "var(--color-border03)",
        },
        bg: {
          "01": "var(--color-bg01)",
          "02": "var(--color-bg02)",
          "03": "var(--color-bg03)",
          "04": "var(--color-bg04)",
        },
      },
    },
  },
  plugins: [],
};
