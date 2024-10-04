module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#a991f7",
        secondary: "#f6d860",
        accent: "#37cdbe",
        neutral: "#3d4451",
        base100: "#ffffff",
        basecontent: "#000000",
      },
      fontFamily: {
        audiowide: ['Audiowide', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        tickerbit: ['Tickerbit Mono', 'monospace'],
        tuari: ['Tuari', 'sans-serif'],
        switzer: ['Switzer', 'sans-serif'],
        hakobi: ['Hakobi Condensed', 'sans-serif'],
        pixeloid: ['Pixeloid', 'sans-serif'],
        pixeloidsemibold: ['Pixeloid SemiBold', 'sans-serif'],
        pixeloidbold: ['Pixeloid Bold', 'sans-serif'],
        pixeloidextrabold: ['Pixeloid ExtraBold', 'sans-serif'],
        easvhs: ['easvhs', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["dark", "light", "cupcake"],
  }
}