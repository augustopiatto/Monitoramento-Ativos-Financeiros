/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lb1: "#E9F1F4",
        lb2: "#E2F0F6",
        b1: "#2E55DD",
        b2: "#193EC2",
        g1: "#ABB7BC",
        g2: "#717779",
      },
      height: {
        assetslist: "calc(100vh - 30%)",
      },
      boxShadow: {
        focused: "0px 0px 10px 1000px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
