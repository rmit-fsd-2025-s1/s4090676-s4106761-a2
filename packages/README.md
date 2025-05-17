# Configuring packages

Each package must not define its own `tsconfig.json` aside from importing the central configuration as they
do not have an isolated build step. The `tsconfig` of the parent app will be used - it's strictly code sharing.
