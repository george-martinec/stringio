import { NuxtI18nOptions } from "@nuxtjs/i18n/dist/module";
import pages from "../i18n/pages.json";

// https://i18n.nuxtjs.org/
export const i18n: NuxtI18nOptions = {
    defaultLocale: 'en-US',
    strategy: 'prefix',
    lazy: true,
    langDir: './i18n',
    customRoutes: 'config',
    pages: pages,
    detectBrowserLanguage: {
        alwaysRedirect: true,
        cookieCrossOrigin: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
        useCookie: true,
    },
    skipSettingLocaleOnNavigate: true,
    locales: [
        {
            code: 'en-US',
            iso: 'en-US',
            file: 'en-US.json',
            name: 'English (United States)',
            dir: "ltr",
            flag: 'us',
        },
        {
            code: 'cs-CZ',
            iso: 'cs-CZ',
            file: 'cs-CZ.json',
            name: 'Čeština',
            dir: "ltr",
            flag: 'cz',
        },
    ],
}