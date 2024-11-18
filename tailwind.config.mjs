import { fontFamily } from "tailwindcss/defaultTheme";
import containerQueryPlugin from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Sporting Grotesk", fontFamily.sans],
      },
    },
  },
  plugins: [containerQueryPlugin],
};
