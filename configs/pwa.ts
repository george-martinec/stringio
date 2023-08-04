import { ModuleOptions } from "@vite-pwa/nuxt";
import { brand } from './brand';

// https://vite-pwa-org.netlify.app/frameworks/nuxt.html
export const pwa: ModuleOptions = {
    mode: 'production',
    scope: '/',
    registerType: 'autoUpdate',
    includeAssets: [
        'favicon.ico',
        'apple-180x180.png',
        'maskable-512x512.svg',
    ],
    manifest: {
        name: brand.name,
        short_name: brand.shortName,
        theme_color: '#ffffff',
        background_color: '#ffffff',
        id: '/',
        start_url: '/',
        icons: [
            {
                src: '64x64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                src: '192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: 'maskable-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    },
    workbox: {
        mode: 'production',
        navigateFallback: null,
        globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
    },
    client: {
        registerPlugin: true,
        periodicSyncForUpdates: 60,
        installPrompt: true,
    },
}