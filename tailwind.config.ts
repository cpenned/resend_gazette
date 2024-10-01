import fluid, { extract, screens } from "fluid-tailwind";
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    screens,
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        overlay: "hsl(var(--overlay) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
      },
    },
  },
  plugins: [tailwindcssAnimate, fluid],
};
export default config;
