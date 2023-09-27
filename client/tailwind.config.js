const config = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ['Satoshi', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				'primary-orange': '#FF5722',
			}
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [{
			light: {
				...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
				"base-100": "#F1F1FF",
				"neutral": "#BFC0D4",
				"base-200": "#CBDBF1",
				"base-300": "#D7E3F3",
			}
		}, {
			dark: {
				...require("daisyui/src/theming/themes")["[data-theme=night]"],
			}
		}],
	},
}
export default config
