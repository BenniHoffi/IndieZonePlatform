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
                outer: "$reset pb-4",
                wrapper: "$reset",
                inner: "$reset",
            },
            "family:button": {
                input: "bg-primary text-white rounded-lg px-6 py-3",
            },
        }),
    },
}

export default config
