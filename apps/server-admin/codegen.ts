import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "Schema.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    "src/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../index#DefaultContext",
        useIndexSignature: true,
      },
    },
  },
}

export default config
