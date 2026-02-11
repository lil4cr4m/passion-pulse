/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#FFFFFF",
        ink: "#000000",
        yellow: "#FFD100", // Cyber Yellow
        violet: "#A358FF", // Electric Violet
        green: "#00FF85", // Neon Green
        pink: "#FF3BFF", // Hot Pink
        cyan: "#00E0FF", // Cyan Blue
      },
      boxShadow: {
        brutal: "5px 5px 0px 0px #000000",
        "brutal-lg": "8px 8px 0px 0px #000000",
        "brutal-sm": "3px 3px 0px 0px #000000",
      },
      borderWidth: { 3: "3px" },
    },
  },
};
