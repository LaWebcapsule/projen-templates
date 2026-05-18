# @wbce/projen-d9-extension

Projen constructs for authoring [d9](https://github.com/LaWebcapsule/d9) (Directus 9) extensions. It provides:

- `ExtensionFolder` — a pnpm workspace that holds extension packages
- `D9ExtensionProject` — a TypeScript project for a single extension or a bundle of related extensions
- `D9ExtensionType` — enum of supported extension kinds

This package is typically consumed via [`@wbce/projen-d9`](../directus), which wires up an `ExtensionFolder` automatically and exposes `project.addExtension(...)`.

## Usage

In a `D9Project`:

```js
import { D9Project } from '@wbce/projen-d9';
import { D9ExtensionType } from '@wbce/projen-d9-extension';

const project = new D9Project({
  name: 'my-d9',
  defaultReleaseBranch: 'main',
});

// Single-type extension
project.addExtension('my-hook', [D9ExtensionType.HOOK]);

// Bundle: multiple types in one package
project.addExtension('my-bundle', [
  D9ExtensionType.INTERFACE,
  D9ExtensionType.DISPLAY,
]);

// Shared library (no extension type) — can be depended on by other extensions
project.addExtension('shared', []);

// Cross-extension dependency
const myHook = project.addExtension('feature', [D9ExtensionType.HOOK]);
myHook.addDeps('shared@workspace:');

project.synth();
```

## Extension types

`D9ExtensionType` values:

| Type | Kind |
| --- | --- |
| `INTERFACE` | UI |
| `DISPLAY` | UI |
| `LAYOUT` | UI |
| `MODULE` | UI |
| `PANEL` | UI |
| `ENDPOINT` | API |
| `HOOK` | API |
| `OPERATION` | API |

Passing `[]` produces a plain TypeScript library that emits `lib/` with type declarations — useful for sharing code between extensions.

## What gets generated

Per extension:

- A TypeScript project under `<extensions-folder>/<name>/`
- Sample `src/index.ts` from a template matching the chosen type(s)
- `directus:extension` field in `package.json` (single type) or a `bundle` config (multiple types)
- Build step that runs `directus-extension build` and copies `dist/` into the parent project's `extensions/` tree at the right subfolder (`hooks/<name>`, `endpoints/<name>`, …)
- Vue is added as a devDep automatically when a UI type is included

The `ExtensionFolder` itself is a pnpm workspace; running `pnpm install` + `pnpm run --recursive build` inside it builds every extension. This is what the parent `D9Project`'s `build-extensions` task does.

## Direct usage

The constructs can be used outside `D9Project` if needed:

```js
import { ExtensionFolder, D9ExtensionType } from '@wbce/projen-d9-extension';

const folder = new ExtensionFolder({ parent: someProject, name: 'plugins' });
folder.add('my-endpoint', [D9ExtensionType.ENDPOINT]);
```

## License

GPL-3.0-or-later
