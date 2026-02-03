/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    dark: '#0b1c2d',
                    DEFAULT: '#0a3d91',
                },
                royal: {
                    blue: '#0a3d91',
                }
            },
            fontFamily: {
                arabic: ['Cairo', 'sans-serif'],
                english: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
