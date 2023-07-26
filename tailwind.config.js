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
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('preline/plugin'),
    ],
}
