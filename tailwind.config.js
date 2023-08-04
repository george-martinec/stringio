const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Nuxt
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        // Preline
        'node_modules/preline/dist/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    '0': 'var(--primary-color-0)',
                    '50': 'var(--primary-color-50)',
                    '100': 'var(--primary-color-100)',
                    '200': 'var(--primary-color-200)',
                    '300': 'var(--primary-color-300)',
                    '400': 'var(--primary-color-400)',
                    '500': 'var(--primary-color-500)',
                    '600': 'var(--primary-color-600)',
                    '700': 'var(--primary-color-700)',
                    '800': 'var(--primary-color-800)',
                    '900': 'var(--primary-color-900)',
                    '950': 'var(--primary-color-950)',
                    '1000': 'var(--primary-color-1000)',
                }
            },
        },
        fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('preline/plugin'),
    ],
}
