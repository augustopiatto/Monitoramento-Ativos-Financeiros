/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lb1: "#E9F1F4",
        lb2: "#3BA8D7",
        b1: "#2E55DD",
        b2: "#193EC2",
        bw: "#C0AD9B",
        g1: "#8D999E",
      },
      height: {
        assetslist: "calc(100vh - 30%)",
      },
    },
  },
  plugins: [],
};
