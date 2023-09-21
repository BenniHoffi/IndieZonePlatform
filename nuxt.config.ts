// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@formkit/nuxt", "@sfxcode/nuxt-primevue"],
    components: ["~/components", ...scanComponentsDir(path.join(__dirname, "pages"))],
    imports: {
        dirs: ["pages/**/composables"],
    },
    build: {
        transpile: ["primevue"],
    },
    css: [
        "~/assets/google/fonts.css",
        "primevue/resources/themes/md-light-indigo/theme.css",
        "primeicons/primeicons.css",
        "@sfxcode/formkit-primevue/dist/sass/formkit-prime-inputs.scss",
        "@sfxcode/formkit-primevue/dist/sass/formkit-primevue.scss",
    ],
    googleFonts: {
        families: {
            Montserrat: [400, 500, 600, 700],
            "Material Symbols Outlined": true,
        },
        fontsDir: "fonts",
        stylePath: "google/fonts.css",
        subsets: "latin",
        outputDir: "assets",
    },
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
