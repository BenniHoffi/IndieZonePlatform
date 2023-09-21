import type { DefaultConfigOptions } from "@formkit/vue"
import { primeInputs } from "@sfxcode/formkit-primevue"
import { de } from "@formkit/i18n"
import { generateClasses } from "@formkit/themes"

const config: DefaultConfigOptions = {
    inputs: primeInputs,
    locales: { de },
    locale: "de",
    config: {
        classes: generateClasses({
            global: {
                outer: "$reset",
                wrapper: "$reset",
            },
            "family:button": {
                input: "bg-primary text-white rounded-lg px-6 py-4",
            },
        }),
    },
}

export default config
