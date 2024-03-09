/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/pages/**/*.{ts,tsx}",
		"./src/components/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				blossom: "url(/blossom_bg_1.png)",
			},
		},
	},
	plugins: [],
};
