// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [],
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
        },
    },
    components: scanComponentsDir(path.join(__dirname, "pages")),
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
