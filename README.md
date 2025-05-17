# Full Stack: Assignment 2

Files are arranged in a monorepo structure. Please find a `README.md` at the root of each package or app.

## Set up

1. Install deps
2. Enable git hooks for linting staged files when attempting to commit
3. Disable tracking for `apps/server-user/.env`

```shell
npm i ; npx simple-git-hooks ; git update-index --skip-worktree apps/server-user/.env
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
: # web-user now at http://localhost:3000
: # server-user now at http://localhost:3001
npm run dev
```

## Linting and type checking

```shell
npm run lint ; npm run type-check
```
