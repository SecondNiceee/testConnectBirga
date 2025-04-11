module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Или если используете директорию `src`:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        "sf-compact-rounded" : ['Sf Compact Rounded' , 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
