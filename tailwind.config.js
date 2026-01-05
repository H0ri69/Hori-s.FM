/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,html}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#09090b', // Zinc 950
                surface: '#18181b',    // Zinc 900
                primary: '#7c3aed',    // Violet 600
                'primary-hover': '#6d28d9', // Violet 700
                secondary: '#a1a1aa',  // Zinc 400
                text: '#f4f4f5',       // Zinc 100
            }
        },
    },
    plugins: [],
}
