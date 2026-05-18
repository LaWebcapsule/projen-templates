# test

[d9](https://github.com/LaWebcapsule/d9) extension (hook).

## Develop

Edit files under `src/`. The build step runs `directus-extension build` and copies the output into the parent project's `extensions/` folder so d9 picks it up (with `EXTENSIONS_AUTO_RELOAD=true`, no restart needed).

```sh
pnpm build      # build this extension only
```

Or from the parent project root: `npx projen build-extensions` to build every extension.