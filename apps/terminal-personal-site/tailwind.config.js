/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#0B0F10",
				foreground: "#E6F1FF",
				muted: "#6B7D86",
				accent: "#00FFA8",
			},
			fontFamily: {
				mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
};


