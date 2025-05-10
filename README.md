# Full Stack: Assignment 2

Files are arranged in a monorepo structure. Please find a `README.md` at the root of each package.

## How to run, format and validate the project

> [!IMPORTANT]  
> Run these scripts from the ROOT of the project. `./package.json` has been set up with workspaces in mind
> and scripts that work with these automatically.

### To set up the project for evaluation and development

```shell
npm i && npx simple-git-hooks
```

### To start all the development servers at the same time use

```shell
: # user-web now at http://localhost:3000
npm run dev
```

### To format the project and check for formatting issues use

> [!WARNING]  
> Linting of staged files is configured as a pre-commit hook.
> As such you may choose to ignore formatting errors as they will self fix.

```shell
: # all code will now conform to the shared standard
npm run lint
```

> [!WARNING]  
> Type checking of all files is configured as a pre-commit hook.
> You probably won't be able to commit if the code has type errors.

### To check for type issues

```shell
: # all code will now conform to the shared standard
npm run type-check
```
