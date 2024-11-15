# vuejs-masterclass-2024 from [VueSchool.io]

This repository contains the project I've coded while taking part of the course.
The final result will vary a little.

The live version of the project is found [here](https://vueschool-masterclass-2024.netlify.app/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm i
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Enabling alias for custom scripts

If you wonder how to use bash aliases to do the same thing that Mostafa does with npm scripts, here how you do it:

- create a `.bashrc` at the repo root.
- define your aliases, for example:

```sh
alias sp-init='supabase init'
alias sp-login='supabase login'
alias sp-link-env='source .env && echo "linking to $SUPABASE_PROJECT_ID ... using password=$SUPABASE_PROJECT_PASSWORD" && supabase link --project-ref $SUPABASE_PROJECT_ID'
alias sp-gen-types='source .env && supabase gen types --lang=typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/types/database.types.ts'
alias sp-db-migrate-new='supabase migration new "$1"'
alias sp-dbreset='supabase db reset --linked'
alias sp-dbseed='node --env-file=.env database/sedding.js'
alias sp-dbrs='sp-dbreset && node --env-file=.env database/sedding.js'
```

- run `source .bashrc` from within the terminal in the repo root.
- run any alias with it name.

To check the aliases are loaded, run `alias` in the terminal.
To reload the aliases after a change, run `source .bashrc` each time.

I've tested that in Git bash for Windows.

This repository contains a `.bashrc` file with the aliases I used on the project.
