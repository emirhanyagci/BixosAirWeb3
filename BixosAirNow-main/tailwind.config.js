module.exports = {
  content: ["./**/*.html"],
  theme: {
    screens: {
      '2xl': {'max': '1535px'}, 
      'xl': {'max': '1279px'},
      'lg': {'max': '1200px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      '2sm': {'max': '480px'},
      
    },
    extend: {
      fontFamily: {
        digital: ['Fjalla One', 'sans-serif']
      }
    },
  },
  plugins: [],
}
