// https://nuxt.com/docs/api/configuration/nuxt-config
import { brand } from './configs/brand'
import { app } from './configs/app'
import { i18n } from './configs/i18n'
import { pwa } from './configs/pwa'
import { googleFonts } from './configs/googleFonts'

export default defineNuxtConfig({
    devtools: {
        enabled: false,
    },
    experimental: {
        payloadExtraction: false,
    },
    imports: {
        autoImport: true,
    },
    devServer: {
        host: process.env.HOST ?? 'localhost',
        port: parseInt(process.env.PORT ?? (process.env.SSL === 'true' ? '443' : '80')),
        https: Boolean(process.env.SSL === 'true')
            ? {
                key: process.env.SSL_KEY ?? 'ssl/output/local.key',
                cert: process.env.SSL_CRT ?? 'ssl/output/local.crt',
            }
            : false,
    },
    app,
    css: [
        '~/assets/css/main.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            brand,
            transitions: {
                time: 350
            },
            i18n: {
                baseUrl: (process.env.SSL === 'true' ? 'https://' : 'http://') + (process.env.HOST !== undefined ? process.env.HOST : process.env.VERCEL_URL),
            }
        },
    },
    routeRules: {
        '/manifest.webmanifest': {
            headers: {
                'Content-Type': 'application/manifest+json',
                'Cache-Control': 'public, max-age=0, must-revalidate',
            },
        },
    },
    modules: [
        '@nuxtjs/i18n',
        '@vite-pwa/nuxt',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
    ],
    plugins: [
        {
            src: '~/plugins/vercel.ts',
            mode: 'client',
        }
    ],
    i18n,
    pwa,
    googleFonts,
});
