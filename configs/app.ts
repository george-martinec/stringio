import { NuxtAppConfig } from "@nuxt/schema";

// @ts-ignore
export const app: NuxtAppConfig = {
    head: {
        charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
            script: [
            {
                src: '/assets/js/preline/preline.js',
                tagPosition: "bodyClose",
                defer: true,
            },
        ],
        meta: [
            {
                name: "theme-color",
                content: "#111827"
            }
        ],
        link: [
            {
                rel: 'icon',
                href: '/favicon.ico',
                sizes: 'any',
            },
            {
                rel: 'icon',
                href: '/favicon.svg',
                type: 'image/svg+xml',
            },
            {
                rel: 'apple-touch-icon',
                href: '/apple-180x180.png',
            },
        ],
    },
}