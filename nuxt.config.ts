// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/supabase",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@vueuse/nuxt",
        "@nuxtjs/turnstile",
        "@nuxt/image",
        "@vite-pwa/nuxt",
        "@formkit/nuxt",
        "nuxt-primevue",
        "nuxt-icon",
        "nuxt-mapbox",
    ],
    vue: {
        defineModel: true,
        propsDestructure: true,
    },
    components: ["~/components", ...scanComponentsDir(path.join(__dirname, "pages"))],
    imports: {
        dirs: ["pages/**/composables"],
    },
    runtimeConfig: {
        public: {
            mapboxApiToken: "",
        },
    },
    build: {
        transpile: ["nuxt", "primevue", "formkit-primevue"],
    },
    css: [
        "/assets/google-fonts/css/google-fonts.css",
        "/assets/css/primevue-theme.css",
        "primeicons/primeicons.css",
        // "@sfxcode/formkit-primevue/dist/sass/formkit-prime-inputs.scss",
        "@sfxcode/formkit-primevue/dist/sass/formkit-primevue.scss",
    ],
    app: {
        head: {
            title: "IndieZone",
            link: [{ rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" }],
        },
    },
    pwa: {
        manifest: {
            name: "IndieZone",
            short_name: "IndieZone",
            description: "IndieZone - online stöbern, lokal kaufen",
            lang: "de",
            theme_color: "#99D100",
            background_color: "#ffffff",
            icons: [
                {
                    src: "/images/pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                },
                {
                    src: "/images/pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/images/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable",
                },
            ],
        },
        workbox: {
            navigateFallback: "/",
            globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        },
        client: {
            installPrompt: true,
            // you don't need to include this: only for testing purposes
            // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
            // periodicSyncForUpdates: 20,
        },
        devOptions: {
            enabled: true,
            suppressWarnings: false,
            navigateFallbackAllowlist: [/^\/$/],
            type: "module",
        },
    },
    mapbox: {
        accessToken: process.env.NUXT_PUBLIC_MAPBOX_API_TOKEN,
    },
    primevue: {
        options: {
            ripple: true,
        },
        components: {
            include: "*",
            // include: [
            //     { name: "Button", global: true },
            //     { name: "Password", global: true },
            //     { name: "InputText", global: true },
            //     { name: "InputNumber", global: true },
            //     { name: "InputMask", global: true },
            //     { name: "InputSwitch", global: true },
            //     { name: "Rating", global: true },
            //     { name: "Textarea", global: true },
            //     { name: "Calendar", global: true },
            //     { name: "Dropdown", global: true },
            //     { name: "Checkbox", global: true },
            //     { name: "Textarea", global: true },
            //     { name: "MultiSelect", global: true },
            //     { name: "Chips", global: true },
            //     { name: "Slider", global: true },
            //     { name: "Knob", global: true },
            //     "Divider",
            //     "DataTable",
            //     "FileUpload",
            //     "Sidebar",
            //     "ConfirmDialog",
            //     "ConfirmPopup",
            //     "Toast",
            //     "Message",
            //     "TabView",
            //     "TabPanel",
            //     "Tree",
            //     "Chips",
            //     "Chip",
            //     "Column",
            //     "Card",
            //     "Dialog",
            //     "ProgressSpinner",
            //     "AutoComplete",
            // ],
        },
    },
    googleFonts: {
        families: {
            Montserrat: [400, 500, 600, 700],
        },
        fontsDir: "fonts",
        stylePath: "css/google-fonts.css",
        subsets: "latin",
        outputDir: "assets/google-fonts",
    },
    supabase: {
        redirect: false,
    },
    $production: {
        hooks: {
            "pages:extend"(pages) {
                function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
                    const pagesToRemove = []
                    for (const page of pages) {
                        if (pattern.test(page.file!)) {
                            pagesToRemove.push(page)
                        } else {
                            removePagesMatching(pattern, page.children)
                        }
                    }
                    for (const page of pagesToRemove) {
                        pages.splice(pages.indexOf(page), 1)
                    }
                }
                removePagesMatching(/^.*\/components\/.*$/, pages)
                removePagesMatching(/^.*\/composables\/.*$/, pages)
            },
        },
    },
    $development: {
        hooks: {
            "pages:extend"(pages) {
                function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
                    const pagesToRemove = []
                    for (const page of pages) {
                        if (pattern.test(page.file!)) {
                            pagesToRemove.push(page)
                        } else {
                            removePagesMatching(pattern, page.children)
                        }
                    }
                    for (const page of pagesToRemove) {
                        pages.splice(pages.indexOf(page), 1)
                    }
                }
                removePagesMatching(/^.*\/composables\/.*$/, pages)
            },
        },
    },
})

import path from "path"
import fs from "fs"
import type { NuxtPage } from "nuxt/schema"

function scanComponentsDir(dir: string): string[] {
    const components: string[] = []
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            const componentsDir = path.join(filePath, "components")
            if (fs.existsSync(componentsDir)) {
                components.push(componentsDir)
            } else {
                components.push(...scanComponentsDir(filePath))
            }
        }
    })
    return components
}
