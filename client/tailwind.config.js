/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        backFiller: "var(--backFiller)",
        backBase: "var(--backBase)",
        backElevatedBase: "var(--backElevatedBase)",
        backHighlight: "var(--backHighlight)",
        textBase: "var(--textBase)",
        textSubdued: "var(--textSubdued)",
        accentColor: "var(--accentColor)",
        accentColorSubdued: "var(--accentColorSubdued)",
        headerColorForAnimation: "var(--headerColorForAnimation)",
        errorColor: "var(--errorColor)",
        errorColorEssential: "var(--errorColorEssential)",
      },
      width: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      minWidth: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      maxWidth: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      height: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      minHeight: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      maxHeight: {
        100: "25rem",
        106: "26.563rem",
        112: "28.125rem",
        118: "29.688rem",
        125: "31.25rem",
        131: "32.813rem",
        137: "34.375rem",
        143: "35.938rem",
        150: "37.5rem",
        156: "39.063rem",
        162: "40.625rem",
        168: "42.188rem",
        175: "43.75rem",
        181: "45.313rem",
        187: "46.875rem",
        193: "48.438rem",
        200: "50rem",
        206: "51.563rem",
        212: "53.125rem",
        218: "54.688rem",
        225: "56.25rem",
      },
      keyframes: {
        transparentHeader: {
          "0% ": {
            background: "rgba(0,0,0,.5)",
          },
          "100% ": {
            background: "color-mix(in srgb, var(--backBase) 100%, transparent)",
          },
        },
      },
      animation: {
        transparentHeaderOnScroll: "transparentHeader 0.4s linear forwards",
      },
    },
  },

  plugins: [],
};