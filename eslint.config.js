import { defineConfig } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"

const allJsTsFiles = "**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"

export default defineConfig([
    {
        files: [allJsTsFiles],
        ...js.configs.recommended,
    },
    {
        files: [allJsTsFiles],
        ...react.configs.flat.recommended,
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            "react/prop-types": "off",
            "react/no-unescaped-entities": "off",
        },
    },
])
