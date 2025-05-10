# Full Stack: Assignment 2

Files are arranged in a monorepo structure. Please find a `README.md` at the root of each package.

## How to run and format the project!

#### To set up the project for evaluation and development

```shell
npm run i
```

#### To start all the development servers at the same time use:

```shell
: # user-web now at http://localhost:3000
npm run dev --workspaces --if-present 
```

#### To format the project and check for issues use:

Please run this before every commit and fix any issues!!

```shell
: # all code will now conform to the shared standard
npm run lint --workspaces --if-present -- --fix 
```
