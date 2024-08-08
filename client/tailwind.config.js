/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        darkBackgroundFiller: "#000000",
        darkBackgroundBase: "#121212",
        darkBackgroundElevatedBase: "#1F1F1F",
        darkBackgroundHighlight: "#1F1F1F",
        darkTextBase: "#FFFFFF",
        darkTextSubdued: "#B3B3B3",
        darkAccentColor: "#9E4FFF",
        darkAccentColorSubdued: "#7606FF",
        lightBackgroundFiller: "#FFFFFF",
        lightBackgroundBase: "#F3F3F3",
        lightBackgroundElevatedBase: "#DDDDDD",
        lightBackgroundHighlight: "#DDDDDD",
        lightTextBase: "#000000",
        lightTextSubdued: "#3F3F3F",
        lightAccentColor: "#9E4FFF",
        lightAccentColorSubdued: "#7606FF",
      },
      fontFamily: {
        fBlack: "FBlack",
        fBold: "FBold",
        fExtraBold: "FExtraBold",
        fExtraLight: "FExtraLight",
        fHair: "FHair",
        fLight: "FLight",
        fRegular: "FRegular",
        fSemiBold: "FSemiBold",
        fSemiLight: "FSemiLight",
      },
    },
  },
  plugins: [],
};
