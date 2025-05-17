import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import unusedImports from "eslint-plugin-unused-imports";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  prettierPlugin,
  ...tseslint.configs.recommended,
  {
    plugins: {},
    rules: {},
  },
  {
    plugins: {
      onlyWarn,
      "unused-imports": unusedImports,
    },
  },
  {
    ignores: ["dist/**"],
  },
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "unused-imports/no-unused-imports": "error",
    },
  },
];
