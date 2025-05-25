# Full Stack: Assignment 2

Files are arranged in a monorepo structure. Please find a `README.md` at the root of each package or app.

## Set up

1. Install deps (automatically enables git hooks)
2. Disable tracking for `apps/server-user/.env`

```shell
npm i ; git update-index --skip-worktree apps/server-user/.env
```

## Starting development server

> [!NOTE]  
> Fill out your database details in advance at `apps/server-user/.env`

### Windows systems

You must start each development server in a different window by either:

- Change into each directory under `app/` in a different window and run `npm run dev` in that directory
- Use `npm run dev -w <directory name>` such as `npm run dev -w server-admin`

### UNIX systems

```shell
: # web-user now at http://localhost:3000 and watching for changes
: # server-user now at http://localhost:3001 and watching for changes
: # @repo/database now watching for changes
npm run dev
```

## Linting and type checking

```shell
npm run lint ; npm run type-check
```
