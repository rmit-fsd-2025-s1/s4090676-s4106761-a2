import { config } from "@repo/lint-config/base"

const conf = [
  ...config,
  {
    ignores: ["**/__generated__/*"],
  },
]
export default conf
