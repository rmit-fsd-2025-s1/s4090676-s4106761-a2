# Full Stack: Assignment 2

https://github.com/rmit-fsd-2025-s1/s4090676-s4106761-a2

Files are arranged in a monorepo structure. Please find a `README.md` at the root of each package or app.

## Set up

This is a monorepo. No need to run more than once.

```shell
npm i
```

## Starting development server

```shell
: # All dev servers will come online concurrently
: # See the admin app on http://localhost:3001
: # See the tutor/lecturer app on http://localhost:3000
npm run dev
```

## Test accounts

julian@example.com and password111 as tutor
julia@example.com and password111 as tutor

```shell
: # To reset the database and load test data
npm run load-fixtures -w @repo/database
```

## Linting and type checking

```shell
npm run lint ; npm run type-check
```

## Build

```shell
: # builds anything that can. For review use the dev servers instead - `npm run dev`
npm run build
```

## References

https://stackoverflow.com/questions/5452760/how-to-truncate-a-foreign-key-constrained-table
https://orkhan.gitbook.io/typeorm/docs/
https://typeorm.io/
https://stackoverflow.com/questions/58779347/jest-typeorm-purge-database-after-all-tests
https://expressjs.com/
https://docs.npmjs.com/cli/v11/using-npm/workspaces
https://leticia-mirelly.medium.com/a-comprehensive-guide-to-npm-workspaces-and-monorepos-ce0cdfe1c625
https://earthly.dev/blog/npm-workspaces-monorepo/
https://docs.npmjs.com/cli/v11/using-npm/scripts
https://www.typescriptlang.org/docs/handbook/compiler-options.html
https://tsx.is/
https://stackoverflow.com/questions/62096269/unknown-file-extension-ts-for-a-typescript-file
https://github.com/TypeStrong/ts-node?tab=readme-ov-file#esm
https://github.com/TypeStrong/ts-node/discussions/1811
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
https://prettier.io/docs/precommit
https://github.com/okonet/lint-staged
https://github.com/toplenboren/simple-git-hooks
https://github.com/prettier/pretty-quick
https://prettier.io/docs/integrating-with-linters
https://github.com/eslint/eslint/discussions/16960
https://gregory-gerard.dev/articles/eslint-in-a-monorepo
https://turborepo.com/docs/guides/tools/eslint
https://github.com/colinhacks/zod
https://react-hook-form.com/get-started
https://eslint.org/docs/latest/rules/no-unused-vars
https://eslint.org/docs/latest/use/command-line-interface
https://eslint.org/
https://github.com/vercel/turborepo/tree/main/examples/basic/packages/eslint-config
https://react.dev/reference/react/useContext
https://react.dev/reference/react/useState#setstate
https://tanstack.com/query/latest/docs/framework/react/quick-start
https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
https://expressjs.com/en/guide/routing.html
https://github.com/typeorm/typeorm/issues/6803
https://orkhan.gitbook.io/typeorm/docs/select-query-builder#using-subqueries
https://stackoverflow.com/questions/60363353/typeorm-onetomany-causes-referenceerror-cannot-access-entity-before-initia
https://typeorm.io/docs/query-builder/select-query-builder/#adding-where-expression
https://orkhan.gitbook.io/typeorm/docs/select-query-builder
https://github.com/typeorm/typeorm/issues/3369
https://www.apollographql.com/docs/apollo-server/getting-started
https://www.apollographql.com/docs/apollo-server/workflow/generate-types
https://stackoverflow.com/questions/57040429/how-to-split-a-long-graphql-schema
https://github.com/apollographql/docs-examples/blob/e3c133e50cd1d9ce6fb54630ca9ea9395b9bfa4d/apollo-server/v4/generated-types/package.json#L12
https://www.npmjs.com/package/concurrently
https://the-guild.dev/graphql/codegen/docs/getting-started/esm-typescript-usage
https://github.com/eslint/eslint/discussions/18304
https://stackoverflow.com/questions/73888927/set-http-only-cookie-from-resolver-in-apollo-graphql
https://chakra-ui.com/docs/get-started/frameworks/next-app
https://tanstack.com/query/v5/docs/framework/solid/guides/disabling-queries
https://typeorm.io/docs/query-builder/select-query-builder/#joining-relations
https://typeorm.io/docs/query-builder/select-query-builder/#joining-any-entity-or-table
https://nivo.rocks/bar/
https://stackoverflow.com/questions/52872500/react-js-nivo-pie-chart-not-showing-up
https://chakra-ui.com/docs/charts/bar-chart
https://www.apollographql.com/docs/apollo-server/api/express-middleware
https://www.apollographql.com/docs/apollo-server/security/authentication
https://www.apollographql.com/docs/apollo-server/data/subscriptions
https://stackoverflow.com/questions/44737043/is-it-possible-to-not-return-any-data-when-using-a-graphql-mutation
https://the-guild.dev/graphql/ws/recipes
https://www.npmjs.com/package/cookie-parser
https://www.npmjs.com/package/cookie
https://www.apollographql.com/docs/react/data/subscriptions#1-install-required-libraries
https://www.apollographql.com/docs/react/data/mutations
