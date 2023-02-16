/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				"solgas-primary": "#0E1D5C",
				"solgas-secondary": "#122676",
			},
		},
	},
	plugins: [],
};
