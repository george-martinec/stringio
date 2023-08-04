import { NuxtAppConfig } from "@nuxt/schema";

// @ts-ignore
export const app: NuxtAppConfig = {
    head: {
        charset: 'utf-8',
            viewport: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height',
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
                content: "#e2e8f0"
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