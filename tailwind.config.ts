import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import formKitTailwind from "@formkit/themes/tailwindcss"

export default <Partial<Config>>{
    plugins: [formKitTailwind],
    content: [`./formkit-tailwind-theme.ts`, `./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}`, `presets/**/*.{js,vue,ts}`],
    important: true,
    theme: {
        screens: {
            xxs: "385px",
            xs: "400px",
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            },
            fontSize: {
                "display-large": ["57px", { lineHeight: "64px" }],
                "display-medium": ["45px", { lineHeight: "52px" }],
                "display-small": ["36px", { lineHeight: "44px" }],
                "headline-large": ["32px", { lineHeight: "40px" }],
                "headline-medium": ["28px", { lineHeight: "36px" }],
                "headline-small": ["24px", { lineHeight: "32px" }],
                "title-large": ["22px", { lineHeight: "28px" }],
                "title-medium": ["16px", { lineHeight: "24px" }],
                "title-small": ["14px", { lineHeight: "20px" }],
                "label-large": ["14px", { lineHeight: "20px" }],
                "label-medium": ["12px", { lineHeight: "16px" }],
                "label-small": ["11px", { lineHeight: "14px" }],
                "body-large": ["16px", { lineHeight: "24px" }],
                "body-medium": ["14px", { lineHeight: "20px" }],
                "body-small": ["12px", { lineHeight: "16px" }],
            },
            boxShadow: {
                "inner-lg": "inset 6px 6px 6px #40412D29",
            },
            colors: {
                primary: "#1A2933",
                "primary-100": "#0D141A",
                "primary-200": "#1A2933",
                "primary-300": "#273E4D",
                "primary-400": "#345266",
                "primary-500": "#416780",
                "primary-600": "#547D99",
                "primary-700": "#749AB2",
                "primary-800": "#95B6CC",
                "primary-900": "#B8D3E5",
                "primary-hover": "#273E4D",
                secondary: "#99D100",
                "secondary-10": "#131A00",
                "secondary-20": "#253300",
                "secondary-30": "#415900",
                "secondary-40": "#5D8000",
                "secondary-50": "#79A600",
                "secondary-60": "#99D100",
                "secondary-70": "#AAD92B",
                "secondary-80": "#BDE550",
                "secondary-90": "#CDE58A",
                error: "#B3261E",
                "error-10": "#410E0B",
                "error-20": "#601410",
                "error-30": "#601410",
                "error-40": "#B3261E",
                "error-50": "#DC362E",
                "error-60": "#E46962",
                "error-70": "#EC928E",
                "error-80": "#F2B8B5",
                "error-90": "#F9DEDC",
                "neutral-10": "#1B1E20",
                "neutral-20": "#464A4D",
                "neutral-30": "#464A4D",
                "neutral-40": "#5D6164",
                "neutral-50": "#767A7D",
                "neutral-60": "#8F9396",
                "neutral-70": "#A9AEB1",
                "neutral-80": "#C5CACD",
                "neutral-90": "#E0E5E9",
                surface: "#F8FAFC",
                "surface-bright": "#F8FAFC",
                "surface-dim": "#D5DADE",
                "container-light": "#F2F7FA",
                "container-dark": "#E0E7EC",
                "surface-container-highest": "#E0E5E9",
                "surface-container-high": "#E3E9ED",
                "surface-container": "#E8EEF2",
                "surface-container-low": "#F2F7FA",
                "on-surface": "#20221A",
                "on-surface-variant": "#4C4F45",
                outline: "#7B7E74",
                "outline-variant": "#CDD0C4",
                "user-surface-dim": "#DCDED5",
                "user-surface": "#F9FAF5",
                "user-surface-container": "#EEF0E9",
                "user-surface-container-low": "#F3F5ED",
                "user-surface-container-high": "#E8EBE1",
                "user-surface-container-highest": "#E3E5DA",
                tertiary: "#998763",
            },
        },
    },
}
