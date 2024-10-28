module.exports = {
  content: [
    "./*.html", // All HTML files in the root
    "./about/**/*.html", // HTML files in the 'about' folder
    "./blog/**/*.html", // HTML files in the 'blog' folder
    "./contact/**/*.html", // HTML files in the 'contact' folder
    "./portfolio/**/*.html", // HTML files in the 'portfolio' folder
    "./services/**/*.html", // HTML files in the 'services' folder
    "./work/**/*.html", // HTML files in the 'work' folder
    "./src/pages/**/*.html", // Additional HTML files in src/pages
    "./src/**/*.{js,jsx,ts,tsx}", // JavaScript or TypeScript files in src
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        primary: "#a991f7",
        secondary: "#f6d860",
        accent: "#37cdbe",
        neutral: "#3d4451",
        base100: "#ffffff",
        basecontent: "#000000",
      },
      fontFamily: {
        audiowide: ["Audiowide", "sans-serif"],
        teko: ["Teko", "sans-serif"],
        tickerbit: ["Tickerbit Mono", "monospace"],
        tuari: ["Tuari", "sans-serif"],
        switzer: ["Switzer", "sans-serif"],
        hakobi: ["Hakobi Condensed", "sans-serif"],
        pixeloid: ["Pixeloid", "sans-serif"],
        pixeloidsemibold: ["Pixeloid SemiBold", "sans-serif"],
        pixeloidbold: ["Pixeloid Bold", "sans-serif"],
        pixeloidextrabold: ["Pixeloid ExtraBold", "sans-serif"],
        easvhs: ["easvhs", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "light", "cupcake"],
  },
};
