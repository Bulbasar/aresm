/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        bg: "var(--bg)",
        fg: "var(--fg)",
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
      },
      fontSize: {
        hero: "var(--fs-hero)",
        page: "var(--fs-page)",
        section: "var(--fs-section)",
        subheading: "var(--fs-subheading)",
        medium: "var(--fs-medium)",
        body: "var(--fs-body)",
        small: "var(--fs-small)",
        xsmall: "var(--fs-xsmall)",
      },
    },
  },
  plugins: [],
};
