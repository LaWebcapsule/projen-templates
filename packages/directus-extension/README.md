# @wbce/projen-directus-extension

Projen constructs for authoring [d9](https://github.com/LaWebcapsule/d9) (Directus 9) extensions. Provides:

- `ExtensionFolder` — a pnpm workspace that holds extension packages
- `DirectusExtensionProject` — a TypeScript project for a single extension or a bundle of related extensions
- `DirectusExtensionType` — enum of supported extension kinds

This package is typically consumed via [`@wbce/projen-directus`](../directus), which wires up an `ExtensionFolder` automatically and exposes `project.addExtension(...)`.

## Usage

In a `DirectusProject`:

```js
import { DirectusProject } from '@wbce/projen-directus';
import { DirectusExtensionType } from '@wbce/projen-directus-extension';

const project = new DirectusProject({
  name: 'my-d9',
  defaultReleaseBranch: 'main',
});

// Single-type extension
project.addExtension('my-hook', [DirectusExtensionType.HOOK]);

// Bundle: multiple types in one package
project.addExtension('my-bundle', [
  DirectusExtensionType.INTERFACE,
  DirectusExtensionType.DISPLAY,
]);

// Shared library (no extension type) — can be depended on by other extensions
project.addExtension('shared', []);

// Cross-extension dependency
const myHook = project.addExtension('feature', [DirectusExtensionType.HOOK]);
myHook.addDeps('shared@workspace:');

project.synth();
```

## Extension types

`DirectusExtensionType` values:

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

The `ExtensionFolder` itself is a pnpm workspace; running `pnpm install` + `pnpm run --recursive build` inside it builds every extension. This is what the parent `DirectusProject`'s `build-extensions` task does.

## Direct usage

The constructs can be used outside `DirectusProject` if needed:

```js
import { ExtensionFolder, DirectusExtensionType } from '@wbce/projen-directus-extension';

const folder = new ExtensionFolder({ parent: someProject, name: 'plugins' });
folder.add('my-endpoint', [DirectusExtensionType.ENDPOINT]);
```

## License

GPL-3.0-or-later
