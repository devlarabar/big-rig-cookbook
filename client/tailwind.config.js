const config = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'xs': '450px',
		},
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
				"primary": "#56ce44",
				"secondary": "#94a2e0",
				"accent": "#3ec9d8",
				"neutral": "#1d232b",
				"base-100": "#eef2f6",
				"info": "#94a0e1",
				"success": "#3be39a",
				"warning": "#d7b20f",
				"error": "#e85e7a",
			},
		}, {
			dark: {
				...require("daisyui/src/theming/themes")["[data-theme=night]"],
			}
		}],
	},
}
export default config
