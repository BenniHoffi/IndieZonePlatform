import type { DefaultConfigOptions } from '@formkit/vue'
import { primeInputs } from '@sfxcode/formkit-primevue'
import { de } from '@formkit/i18n'

const config: DefaultConfigOptions = {
  inputs: primeInputs,
  locales: { de },
  locale: "de"
}

export default config