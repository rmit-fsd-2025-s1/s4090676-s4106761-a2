import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server-admin/Schema.graphql",
  emitLegacyCommonJSImports: true,
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
