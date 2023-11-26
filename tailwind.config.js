/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'app': {
                    100: '#1C3144',
                    200: '#008DD5',
                    300: '#32936F',
                    400: '#26A96C',
                    500: '#E956F9',
                    600: '#683cc0'
                }
            },
            fontFamily: {
                'epi': ['Epilogue','sans-serif']
            }
        },
    },
    plugins: [require("daisyui")],
}

