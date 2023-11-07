import type { DefaultConfigOptions } from "@formkit/vue"
import { primeInputs } from "@sfxcode/formkit-primevue"
import { de } from "@formkit/i18n"
import { generateClasses } from "@formkit/themes"
import { createMultiStepPlugin } from "@formkit/addons"
import myTailwindTheme from "./formkit-tailwind-theme"
import "@formkit/addons/css/multistep"

const config: DefaultConfigOptions = {
    plugins: [createMultiStepPlugin()],
    inputs: primeInputs,
    locales: { de },
    locale: "de",
    config: {
        classes: generateClasses(myTailwindTheme),
    },
}

export default config
