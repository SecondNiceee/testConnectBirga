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
        'sf-pro-display-400' : ["'SF Pro Display 400'"],
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        "sf-compact-rounded" : ['Sf Compact Rounded' , 'sans-serif'],
        "sf-pro-text" : ['SF Pro Text' , 'sans-serif'],
         "sf-pro-text-400" : "'SF Pro Text 400'",
         "sf-pro-display-600" : "'SF Pro Display 600'",
         "sf-pro-display-700" : "'SF Pro Display 700'"
      },
      backgroundColor : {
        'card' : '#20303F',
        'telegram' : '#2EA5FF',
      },
      borderColor : {
        'card' : '#20303F',
        'telegram' : '#2EA5FF',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
