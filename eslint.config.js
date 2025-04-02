import { defineConfig } from "eslint/config"
import globals from "globals"
import react from "eslint-plugin-react"

export default defineConfig([
    {
        ...react.configs.flat.recommended,
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            "react-hooks/exhaustive-deps": "off",
        },
    },
])
