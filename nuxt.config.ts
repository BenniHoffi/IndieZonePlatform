// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/supabase",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@formkit/nuxt",
        "@sfxcode/nuxt-primevue",
        "@vueuse/nuxt",
        "@nuxtjs/turnstile",
        "@nuxt/image",
        "@vite-pwa/nuxt",
        "nuxt-icon",
    ],
    plugins: [],
    components: ["~/components", ...scanComponentsDir(path.join(__dirname, "pages"))],
    imports: {
        dirs: ["pages/**/composables"],
    },
    build: {
        transpile: ["primevue"],
    },
    css: [
        "/assets/google-fonts/css/google-fonts.css",
        "/assets/css/primevue-theme.css",
        "@sfxcode/formkit-primevue/dist/sass/formkit-prime-inputs.scss",
        "@sfxcode/formkit-primevue/dist/sass/formkit-primevue.scss",
    ],
    pwa: {},
    primevue: {
        components: {
            include: [
                { name: "Button", global: true },
                { name: "Password", global: true },
                { name: "InputText", global: true },
                { name: "InputNumber", global: true },
                { name: "InputMask", global: true },
                { name: "InputSwitch", global: true },
                { name: "Rating", global: true },
                { name: "Textarea", global: true },
                { name: "Calendar", global: true },
                { name: "Dropdown", global: true },
                { name: "Checkbox", global: true },
                { name: "Textarea", global: true },
                { name: "MultiSelect", global: true },
                { name: "Chips", global: true },
                { name: "Slider", global: true },
                { name: "Knob", global: true },

                "DataTable",
                "FileUpload",
                "Sidebar",
                "ConfirmDialog",
                "ConfirmPopup",
                "Toast",
                "Message",
            ],
        },
        useFormkit: true,
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
import { NuxtPage } from "nuxt/schema"

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
