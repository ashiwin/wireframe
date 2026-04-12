import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					yellow: "#ffeb01",
					text: "#343433",
					btn: "#e00069",
					header: "#11326e",
				},
			},
			fontFamily: {
				display: ["var(--font-syne)", "sans-serif"],
				body: ["var(--font-figtree)", "sans-serif"],
			},
		},
	},
	plugins: [],
};

export default config;
