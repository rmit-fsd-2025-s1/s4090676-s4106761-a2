import { config } from "@repo/lint-config/base"

const conf = [
  ...config,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]
export default conf
