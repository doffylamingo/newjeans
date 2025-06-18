import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config({
  ignores: ["dist", ".cache", "public", "node_modules", "*.esm.js"],
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    js.configs.recommended,
    react.configs.flat.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...react.configs.recommended.rules,
    "react/jsx-key": "error",
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "no-console": "warn",
    "react/prop-types": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/self-closing-comp": "warn",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
  },
});
