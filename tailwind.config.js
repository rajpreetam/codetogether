/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'bg-l': 'rgb(240, 240, 240)',
                'bg-d': 'rgb(30, 30, 30)',
                'text-l': 'rgb(70, 70, 70)',
                'text-d': 'rgb(200, 200, 200)',
                'card-l': 'rgb(200, 200, 200)',
                'card-ll': 'rgb(220, 220, 220)',
                'card-d': 'rgb(60, 60, 60)',
                'card-dl': 'rgb(40, 40, 40)',
            }

        },
    },
    plugins: [],
}
