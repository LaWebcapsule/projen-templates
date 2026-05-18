# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### D9ExtensionProject <a name="D9ExtensionProject" id="@wbce/projen-d9-extension.D9ExtensionProject"></a>

#### Initializers <a name="Initializers" id="@wbce/projen-d9-extension.D9ExtensionProject.Initializer"></a>

```typescript
import { D9ExtensionProject } from '@wbce/projen-d9-extension'

new D9ExtensionProject(options: D9ExtensionProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.Initializer.parameter.options">options</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions">D9ExtensionProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@wbce/projen-d9-extension.D9ExtensionProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions">D9ExtensionProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addCompileCommand">addCompileCommand</a></code> | DEPRECATED. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.addTestCommand">addTestCommand</a></code> | DEPRECATED. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.hasScript">hasScript</a></code> | Indicates if a script by the name name is defined. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### `toString` <a name="toString" id="@wbce/projen-d9-extension.D9ExtensionProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-d9-extension.D9ExtensionProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-d9-extension.D9ExtensionProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@wbce/projen-d9-extension.D9ExtensionProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@wbce/projen-d9-extension.D9ExtensionProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@wbce/projen-d9-extension.D9ExtensionProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@wbce/projen-d9-extension.D9ExtensionProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@wbce/projen-d9-extension.D9ExtensionProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@wbce/projen-d9-extension.D9ExtensionProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### `addTask` <a name="addTask" id="@wbce/projen-d9-extension.D9ExtensionProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@wbce/projen-d9-extension.D9ExtensionProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@wbce/projen-d9-extension.D9ExtensionProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@wbce/projen-d9-extension.D9ExtensionProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@wbce/projen-d9-extension.D9ExtensionProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@wbce/projen-d9-extension.D9ExtensionProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-d9-extension.D9ExtensionProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-d9-extension.D9ExtensionProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@wbce/projen-d9-extension.D9ExtensionProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@wbce/projen-d9-extension.D9ExtensionProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `npx projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@wbce/projen-d9-extension.D9ExtensionProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@wbce/projen-d9-extension.D9ExtensionProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.D9ExtensionProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@wbce/projen-d9-extension.D9ExtensionProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.D9ExtensionProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `addBins` <a name="addBins" id="@wbce/projen-d9-extension.D9ExtensionProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@wbce/projen-d9-extension.D9ExtensionProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### `addBundledDeps` <a name="addBundledDeps" id="@wbce/projen-d9-extension.D9ExtensionProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addCompileCommand`~~ <a name="addCompileCommand" id="@wbce/projen-d9-extension.D9ExtensionProject.addCompileCommand"></a>

```typescript
public addCompileCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-d9-extension.D9ExtensionProject.addCompileCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### `addDeps` <a name="addDeps" id="@wbce/projen-d9-extension.D9ExtensionProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addDevDeps` <a name="addDevDeps" id="@wbce/projen-d9-extension.D9ExtensionProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addFields` <a name="addFields" id="@wbce/projen-d9-extension.D9ExtensionProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@wbce/projen-d9-extension.D9ExtensionProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### `addKeywords` <a name="addKeywords" id="@wbce/projen-d9-extension.D9ExtensionProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@wbce/projen-d9-extension.D9ExtensionProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### `addPeerDeps` <a name="addPeerDeps" id="@wbce/projen-d9-extension.D9ExtensionProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### `addScripts` <a name="addScripts" id="@wbce/projen-d9-extension.D9ExtensionProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@wbce/projen-d9-extension.D9ExtensionProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### ~~`addTestCommand`~~ <a name="addTestCommand" id="@wbce/projen-d9-extension.D9ExtensionProject.addTestCommand"></a>

```typescript
public addTestCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-d9-extension.D9ExtensionProject.addTestCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### ~~`hasScript`~~ <a name="hasScript" id="@wbce/projen-d9-extension.D9ExtensionProject.hasScript"></a>

```typescript
public hasScript(name: string): boolean
```

Indicates if a script by the name name is defined.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.hasScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `removeScript` <a name="removeScript" id="@wbce/projen-d9-extension.D9ExtensionProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### `renderWorkflowSetup` <a name="renderWorkflowSetup" id="@wbce/projen-d9-extension.D9ExtensionProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-d9-extension.D9ExtensionProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### `setScript` <a name="setScript" id="@wbce/projen-d9-extension.D9ExtensionProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-d9-extension.D9ExtensionProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-d9-extension.D9ExtensionProject.isConstruct"></a>

```typescript
import { D9ExtensionProject } from '@wbce/projen-d9-extension'

D9ExtensionProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.D9ExtensionProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@wbce/projen-d9-extension.D9ExtensionProject.isProject"></a>

```typescript
import { D9ExtensionProject } from '@wbce/projen-d9-extension'

D9ExtensionProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.D9ExtensionProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@wbce/projen-d9-extension.D9ExtensionProject.of"></a>

```typescript
import { D9ExtensionProject } from '@wbce/projen-d9-extension'

D9ExtensionProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@wbce/projen-d9-extension.D9ExtensionProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.manifest">manifest</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The package manager to use. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.publisher">publisher</a></code> | <code>projen.release.Publisher</code> | Package publisher. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.extensionName">extensionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.extensionTypes">extensionTypes</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-d9-extension.D9ExtensionProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.D9ExtensionProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@wbce/projen-d9-extension.D9ExtensionProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@wbce/projen-d9-extension.D9ExtensionProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@wbce/projen-d9-extension.D9ExtensionProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@wbce/projen-d9-extension.D9ExtensionProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@wbce/projen-d9-extension.D9ExtensionProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@wbce/projen-d9-extension.D9ExtensionProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@wbce/projen-d9-extension.D9ExtensionProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@wbce/projen-d9-extension.D9ExtensionProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.D9ExtensionProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@wbce/projen-d9-extension.D9ExtensionProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@wbce/projen-d9-extension.D9ExtensionProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@wbce/projen-d9-extension.D9ExtensionProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@wbce/projen-d9-extension.D9ExtensionProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.D9ExtensionProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `projectType`<sup>Required</sup> <a name="projectType" id="@wbce/projen-d9-extension.D9ExtensionProject.property.projectType"></a>

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### `autoApprove`<sup>Optional</sup> <a name="autoApprove" id="@wbce/projen-d9-extension.D9ExtensionProject.property.autoApprove"></a>

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@wbce/projen-d9-extension.D9ExtensionProject.property.devContainer"></a>

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### `github`<sup>Optional</sup> <a name="github" id="@wbce/projen-d9-extension.D9ExtensionProject.property.github"></a>

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@wbce/projen-d9-extension.D9ExtensionProject.property.gitpod"></a>

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@wbce/projen-d9-extension.D9ExtensionProject.property.vscode"></a>

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### ~~`allowLibraryDependencies`~~<sup>Required</sup> <a name="allowLibraryDependencies" id="@wbce/projen-d9-extension.D9ExtensionProject.property.allowLibraryDependencies"></a>

- *Deprecated:* use `package.allowLibraryDependencies`

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean

---

##### `artifactsDirectory`<sup>Required</sup> <a name="artifactsDirectory" id="@wbce/projen-d9-extension.D9ExtensionProject.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### `artifactsJavascriptDirectory`<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@wbce/projen-d9-extension.D9ExtensionProject.property.artifactsJavascriptDirectory"></a>

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### `bundler`<sup>Required</sup> <a name="bundler" id="@wbce/projen-d9-extension.D9ExtensionProject.property.bundler"></a>

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### ~~`entrypoint`~~<sup>Required</sup> <a name="entrypoint" id="@wbce/projen-d9-extension.D9ExtensionProject.property.entrypoint"></a>

- *Deprecated:* use `package.entrypoint`

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---

##### ~~`manifest`~~<sup>Required</sup> <a name="manifest" id="@wbce/projen-d9-extension.D9ExtensionProject.property.manifest"></a>

- *Deprecated:* use `package.addField(x, y)`

```typescript
public readonly manifest: any;
```

- *Type:* any

---

##### `npmrc`<sup>Required</sup> <a name="npmrc" id="@wbce/projen-d9-extension.D9ExtensionProject.property.npmrc"></a>

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### `package`<sup>Required</sup> <a name="package" id="@wbce/projen-d9-extension.D9ExtensionProject.property.package"></a>

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### ~~`packageManager`~~<sup>Required</sup> <a name="packageManager" id="@wbce/projen-d9-extension.D9ExtensionProject.property.packageManager"></a>

- *Deprecated:* use `package.packageManager`

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager

The package manager to use.

---

##### `runScriptCommand`<sup>Required</sup> <a name="runScriptCommand" id="@wbce/projen-d9-extension.D9ExtensionProject.property.runScriptCommand"></a>

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@wbce/projen-d9-extension.D9ExtensionProject.property.autoMerge"></a>

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@wbce/projen-d9-extension.D9ExtensionProject.property.biome"></a>

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@wbce/projen-d9-extension.D9ExtensionProject.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### `buildWorkflowJobId`<sup>Optional</sup> <a name="buildWorkflowJobId" id="@wbce/projen-d9-extension.D9ExtensionProject.property.buildWorkflowJobId"></a>

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@wbce/projen-d9-extension.D9ExtensionProject.property.jest"></a>

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@wbce/projen-d9-extension.D9ExtensionProject.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@wbce/projen-d9-extension.D9ExtensionProject.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### `npmignore`<sup>Optional</sup> <a name="npmignore" id="@wbce/projen-d9-extension.D9ExtensionProject.property.npmignore"></a>

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@wbce/projen-d9-extension.D9ExtensionProject.property.prettier"></a>

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### ~~`publisher`~~<sup>Optional</sup> <a name="publisher" id="@wbce/projen-d9-extension.D9ExtensionProject.property.publisher"></a>

- *Deprecated:* use `release.publisher`.

```typescript
public readonly publisher: Publisher;
```

- *Type:* projen.release.Publisher

Package publisher.

This will be `undefined` if the project does not have a
release workflow.

---

##### `release`<sup>Optional</sup> <a name="release" id="@wbce/projen-d9-extension.D9ExtensionProject.property.release"></a>

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### `upgradeWorkflow`<sup>Optional</sup> <a name="upgradeWorkflow" id="@wbce/projen-d9-extension.D9ExtensionProject.property.upgradeWorkflow"></a>

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### `docsDirectory`<sup>Required</sup> <a name="docsDirectory" id="@wbce/projen-d9-extension.D9ExtensionProject.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### `libdir`<sup>Required</sup> <a name="libdir" id="@wbce/projen-d9-extension.D9ExtensionProject.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### `srcdir`<sup>Required</sup> <a name="srcdir" id="@wbce/projen-d9-extension.D9ExtensionProject.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### `testdir`<sup>Required</sup> <a name="testdir" id="@wbce/projen-d9-extension.D9ExtensionProject.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### `tsconfigDev`<sup>Required</sup> <a name="tsconfigDev" id="@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### `watchTask`<sup>Required</sup> <a name="watchTask" id="@wbce/projen-d9-extension.D9ExtensionProject.property.watchTask"></a>

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@wbce/projen-d9-extension.D9ExtensionProject.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@wbce/projen-d9-extension.D9ExtensionProject.property.eslint"></a>

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `tsconfigEslint`<sup>Optional</sup> <a name="tsconfigEslint" id="@wbce/projen-d9-extension.D9ExtensionProject.property.tsconfigEslint"></a>

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### `extensionName`<sup>Required</sup> <a name="extensionName" id="@wbce/projen-d9-extension.D9ExtensionProject.property.extensionName"></a>

```typescript
public readonly extensionName: string;
```

- *Type:* string

---

##### `extensionTypes`<sup>Required</sup> <a name="extensionTypes" id="@wbce/projen-d9-extension.D9ExtensionProject.property.extensionTypes"></a>

```typescript
public readonly extensionTypes: D9ExtensionType[];
```

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@wbce/projen-d9-extension.D9ExtensionProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### `DEFAULT_TS_JEST_TRANFORM_PATTERN`<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@wbce/projen-d9-extension.D9ExtensionProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

### DirectusExtensionProject <a name="DirectusExtensionProject" id="@wbce/projen-d9-extension.DirectusExtensionProject"></a>

#### Initializers <a name="Initializers" id="@wbce/projen-d9-extension.DirectusExtensionProject.Initializer"></a>

```typescript
import { DirectusExtensionProject } from '@wbce/projen-d9-extension'

new DirectusExtensionProject(options: D9ExtensionProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.Initializer.parameter.options">options</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions">D9ExtensionProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@wbce/projen-d9-extension.DirectusExtensionProject.Initializer.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions">D9ExtensionProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addPackageIgnore">addPackageIgnore</a></code> | Adds patterns to be ignored by npm. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.annotateGenerated">annotateGenerated</a></code> | Marks the provided file(s) as being generated. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addBins">addBins</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addBundledDeps">addBundledDeps</a></code> | Defines bundled dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addCompileCommand">addCompileCommand</a></code> | DEPRECATED. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addDeps">addDeps</a></code> | Defines normal dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addDevDeps">addDevDeps</a></code> | Defines development/test dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addFields">addFields</a></code> | Directly set fields in `package.json`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addKeywords">addKeywords</a></code> | Adds keywords to package.json (deduplicated). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addPeerDeps">addPeerDeps</a></code> | Defines peer dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addScripts">addScripts</a></code> | Replaces the contents of multiple npm package.json scripts. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.addTestCommand">addTestCommand</a></code> | DEPRECATED. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.hasScript">hasScript</a></code> | Indicates if a script by the name name is defined. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.removeScript">removeScript</a></code> | Removes the npm script (always successful). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.renderWorkflowSetup">renderWorkflowSetup</a></code> | Returns the set of workflow steps which should be executed to bootstrap a workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.setScript">setScript</a></code> | Replaces the contents of an npm package.json script. |

---

##### ~~`toString`~~ <a name="toString" id="@wbce/projen-d9-extension.DirectusExtensionProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### ~~`with`~~ <a name="with" id="@wbce/projen-d9-extension.DirectusExtensionProject.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-d9-extension.DirectusExtensionProject.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### ~~`addExcludeFromCleanup`~~ <a name="addExcludeFromCleanup" id="@wbce/projen-d9-extension.DirectusExtensionProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@wbce/projen-d9-extension.DirectusExtensionProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### ~~`addGitIgnore`~~ <a name="addGitIgnore" id="@wbce/projen-d9-extension.DirectusExtensionProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@wbce/projen-d9-extension.DirectusExtensionProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### ~~`addPackageIgnore`~~ <a name="addPackageIgnore" id="@wbce/projen-d9-extension.DirectusExtensionProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(pattern: string): void
```

Adds patterns to be ignored by npm.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@wbce/projen-d9-extension.DirectusExtensionProject.addPackageIgnore.parameter.pattern"></a>

- *Type:* string

The pattern to ignore.

---

##### ~~`addTask`~~ <a name="addTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### ~~`annotateGenerated`~~ <a name="annotateGenerated" id="@wbce/projen-d9-extension.DirectusExtensionProject.annotateGenerated"></a>

```typescript
public annotateGenerated(glob: string): void
```

Marks the provided file(s) as being generated.

This is achieved using the
github-linguist attributes. Generated files do not count against the
repository statistics and language breakdown.

> [https://github.com/github/linguist/blob/master/docs/overrides.md](https://github.com/github/linguist/blob/master/docs/overrides.md)

###### `glob`<sup>Required</sup> <a name="glob" id="@wbce/projen-d9-extension.DirectusExtensionProject.annotateGenerated.parameter.glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### ~~`postSynthesize`~~ <a name="postSynthesize" id="@wbce/projen-d9-extension.DirectusExtensionProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### ~~`preSynthesize`~~ <a name="preSynthesize" id="@wbce/projen-d9-extension.DirectusExtensionProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### ~~`removeTask`~~ <a name="removeTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### ~~`runTaskCommand`~~ <a name="runTaskCommand" id="@wbce/projen-d9-extension.DirectusExtensionProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

This will
typically be `npx projen TASK`.

###### `task`<sup>Required</sup> <a name="task" id="@wbce/projen-d9-extension.DirectusExtensionProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### ~~`synth`~~ <a name="synth" id="@wbce/projen-d9-extension.DirectusExtensionProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### ~~`tryFindFile`~~ <a name="tryFindFile" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### ~~`tryFindObjectFile`~~ <a name="tryFindObjectFile" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### ~~`tryRemoveFile`~~ <a name="tryRemoveFile" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.DirectusExtensionProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### ~~`addBins`~~ <a name="addBins" id="@wbce/projen-d9-extension.DirectusExtensionProject.addBins"></a>

```typescript
public addBins(bins: {[ key: string ]: string}): void
```

###### `bins`<sup>Required</sup> <a name="bins" id="@wbce/projen-d9-extension.DirectusExtensionProject.addBins.parameter.bins"></a>

- *Type:* {[ key: string ]: string}

---

##### ~~`addBundledDeps`~~ <a name="addBundledDeps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addBundledDeps"></a>

```typescript
public addBundledDeps(deps: ...string[]): void
```

Defines bundled dependencies.

Bundled dependencies will be added as normal dependencies as well as to the
`bundledDependencies` section of your `package.json`.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addBundledDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addCompileCommand`~~ <a name="addCompileCommand" id="@wbce/projen-d9-extension.DirectusExtensionProject.addCompileCommand"></a>

```typescript
public addCompileCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-d9-extension.DirectusExtensionProject.addCompileCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### ~~`addDeps`~~ <a name="addDeps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addDeps"></a>

```typescript
public addDeps(deps: ...string[]): void
```

Defines normal dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addDevDeps`~~ <a name="addDevDeps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addDevDeps"></a>

```typescript
public addDevDeps(deps: ...string[]): void
```

Defines development/test dependencies.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addDevDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addFields`~~ <a name="addFields" id="@wbce/projen-d9-extension.DirectusExtensionProject.addFields"></a>

```typescript
public addFields(fields: {[ key: string ]: any}): void
```

Directly set fields in `package.json`.

###### `fields`<sup>Required</sup> <a name="fields" id="@wbce/projen-d9-extension.DirectusExtensionProject.addFields.parameter.fields"></a>

- *Type:* {[ key: string ]: any}

The fields to set.

---

##### ~~`addKeywords`~~ <a name="addKeywords" id="@wbce/projen-d9-extension.DirectusExtensionProject.addKeywords"></a>

```typescript
public addKeywords(keywords: ...string[]): void
```

Adds keywords to package.json (deduplicated).

###### `keywords`<sup>Required</sup> <a name="keywords" id="@wbce/projen-d9-extension.DirectusExtensionProject.addKeywords.parameter.keywords"></a>

- *Type:* ...string[]

The keywords to add.

---

##### ~~`addPeerDeps`~~ <a name="addPeerDeps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addPeerDeps"></a>

```typescript
public addPeerDeps(deps: ...string[]): void
```

Defines peer dependencies.

When adding peer dependencies, a devDependency will also be added on the
pinned version of the declared peer. This will ensure that you are testing
your code against the minimum version required from your consumers.

###### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProject.addPeerDeps.parameter.deps"></a>

- *Type:* ...string[]

Names modules to install.

By default, the the dependency will
be installed in the next `npx projen` run and the version will be recorded
in your `package.json` file. You can upgrade manually or using `yarn
add/upgrade`. If you wish to specify a version range use this syntax:
`module@^7`.

---

##### ~~`addScripts`~~ <a name="addScripts" id="@wbce/projen-d9-extension.DirectusExtensionProject.addScripts"></a>

```typescript
public addScripts(scripts: {[ key: string ]: string}): void
```

Replaces the contents of multiple npm package.json scripts.

###### `scripts`<sup>Required</sup> <a name="scripts" id="@wbce/projen-d9-extension.DirectusExtensionProject.addScripts.parameter.scripts"></a>

- *Type:* {[ key: string ]: string}

The scripts to set.

---

##### ~~`addTestCommand`~~ <a name="addTestCommand" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTestCommand"></a>

```typescript
public addTestCommand(commands: ...string[]): void
```

DEPRECATED.

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-d9-extension.DirectusExtensionProject.addTestCommand.parameter.commands"></a>

- *Type:* ...string[]

---

##### ~~`hasScript`~~ <a name="hasScript" id="@wbce/projen-d9-extension.DirectusExtensionProject.hasScript"></a>

```typescript
public hasScript(name: string): boolean
```

Indicates if a script by the name name is defined.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.hasScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### ~~`removeScript`~~ <a name="removeScript" id="@wbce/projen-d9-extension.DirectusExtensionProject.removeScript"></a>

```typescript
public removeScript(name: string): void
```

Removes the npm script (always successful).

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.removeScript.parameter.name"></a>

- *Type:* string

The name of the script.

---

##### ~~`renderWorkflowSetup`~~ <a name="renderWorkflowSetup" id="@wbce/projen-d9-extension.DirectusExtensionProject.renderWorkflowSetup"></a>

```typescript
public renderWorkflowSetup(options?: RenderWorkflowSetupOptions): JobStep[]
```

Returns the set of workflow steps which should be executed to bootstrap a workflow.

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-d9-extension.DirectusExtensionProject.renderWorkflowSetup.parameter.options"></a>

- *Type:* projen.javascript.RenderWorkflowSetupOptions

Options.

---

##### ~~`setScript`~~ <a name="setScript" id="@wbce/projen-d9-extension.DirectusExtensionProject.setScript"></a>

```typescript
public setScript(name: string, command: string): void
```

Replaces the contents of an npm package.json script.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.setScript.parameter.name"></a>

- *Type:* string

The script name.

---

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-d9-extension.DirectusExtensionProject.setScript.parameter.command"></a>

- *Type:* string

The command to execute.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@wbce/projen-d9-extension.DirectusExtensionProject.isConstruct"></a>

```typescript
import { DirectusExtensionProject } from '@wbce/projen-d9-extension'

DirectusExtensionProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.DirectusExtensionProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### ~~`isProject`~~ <a name="isProject" id="@wbce/projen-d9-extension.DirectusExtensionProject.isProject"></a>

```typescript
import { DirectusExtensionProject } from '@wbce/projen-d9-extension'

DirectusExtensionProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.DirectusExtensionProject.isProject.parameter.x"></a>

- *Type:* any

---

##### ~~`of`~~ <a name="of" id="@wbce/projen-d9-extension.DirectusExtensionProject.of"></a>

```typescript
import { DirectusExtensionProject } from '@wbce/projen-d9-extension'

DirectusExtensionProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@wbce/projen-d9-extension.DirectusExtensionProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.autoApprove">autoApprove</a></code> | <code>projen.github.AutoApprove</code> | Auto approve set up for this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.devContainer">devContainer</a></code> | <code>projen.vscode.DevContainer</code> | Access for .devcontainer.json (used for GitHub Codespaces). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.github">github</a></code> | <code>projen.github.GitHub</code> | Access all github components. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.gitpod">gitpod</a></code> | <code>projen.Gitpod</code> | Access for Gitpod. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.vscode">vscode</a></code> | <code>projen.vscode.VsCode</code> | Access all VSCode components. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | The build output directory. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.artifactsJavascriptDirectory">artifactsJavascriptDirectory</a></code> | <code>string</code> | The location of the npm tarball after build (`${artifactsDirectory}/js`). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.bundler">bundler</a></code> | <code>projen.javascript.Bundler</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.entrypoint">entrypoint</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.manifest">manifest</a></code> | <code>any</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.npmrc">npmrc</a></code> | <code>projen.javascript.NpmConfig</code> | The .npmrc file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.package">package</a></code> | <code>projen.javascript.NodePackage</code> | API for managing the node package. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The package manager to use. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.runScriptCommand">runScriptCommand</a></code> | <code>string</code> | The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.autoMerge">autoMerge</a></code> | <code>projen.github.AutoMerge</code> | Component that sets up mergify for merging approved pull requests. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.biome">biome</a></code> | <code>projen.javascript.Biome</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.buildWorkflow">buildWorkflow</a></code> | <code>projen.build.BuildWorkflow</code> | The PR build GitHub workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.buildWorkflowJobId">buildWorkflowJobId</a></code> | <code>string</code> | The job ID of the build workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.jest">jest</a></code> | <code>projen.javascript.Jest</code> | The Jest configuration (if enabled). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | Maximum node version supported by this package. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.npmignore">npmignore</a></code> | <code>projen.IgnoreFile</code> | The .npmignore file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.prettier">prettier</a></code> | <code>projen.javascript.Prettier</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.publisher">publisher</a></code> | <code>projen.release.Publisher</code> | Package publisher. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.release">release</a></code> | <code>projen.release.Release</code> | Release management. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.upgradeWorkflow">upgradeWorkflow</a></code> | <code>projen.javascript.UpgradeDependencies</code> | The upgrade workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.libdir">libdir</a></code> | <code>string</code> | The directory in which compiled .js files reside. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.srcdir">srcdir</a></code> | <code>string</code> | The directory in which the .ts sources reside. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.testdir">testdir</a></code> | <code>string</code> | The directory in which tests reside. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfig</code> | A typescript configuration file which covers all files (sources, tests, projen). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.watchTask">watchTask</a></code> | <code>projen.Task</code> | The "watch" task. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.docgen">docgen</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.eslint">eslint</a></code> | <code>projen.javascript.Eslint</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfigEslint">tsconfigEslint</a></code> | <code>projen.javascript.TypescriptConfig</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.extensionName">extensionName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.extensionTypes">extensionTypes</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]</code> | *No description.* |

---

##### ~~`node`~~<sup>Required</sup> <a name="node" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.node"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### ~~`buildTask`~~<sup>Required</sup> <a name="buildTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.buildTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### ~~`commitGenerated`~~<sup>Required</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.commitGenerated"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### ~~`compileTask`~~<sup>Required</sup> <a name="compileTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.compileTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### ~~`components`~~<sup>Required</sup> <a name="components" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.components"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### ~~`deps`~~<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.deps"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### ~~`ejected`~~<sup>Required</sup> <a name="ejected" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.ejected"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### ~~`files`~~<sup>Required</sup> <a name="files" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.files"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### ~~`gitattributes`~~<sup>Required</sup> <a name="gitattributes" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.gitattributes"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### ~~`gitignore`~~<sup>Required</sup> <a name="gitignore" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.gitignore"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### ~~`logger`~~<sup>Required</sup> <a name="logger" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.logger"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### ~~`name`~~<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.name"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### ~~`outdir`~~<sup>Required</sup> <a name="outdir" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.outdir"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### ~~`packageTask`~~<sup>Required</sup> <a name="packageTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.packageTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### ~~`postCompileTask`~~<sup>Required</sup> <a name="postCompileTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.postCompileTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### ~~`preCompileTask`~~<sup>Required</sup> <a name="preCompileTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.preCompileTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### ~~`projectBuild`~~<sup>Required</sup> <a name="projectBuild" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.projectBuild"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### ~~`projenCommand`~~<sup>Required</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.projenCommand"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### ~~`root`~~<sup>Required</sup> <a name="root" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.root"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### ~~`subprojects`~~<sup>Required</sup> <a name="subprojects" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.subprojects"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### ~~`tasks`~~<sup>Required</sup> <a name="tasks" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.tasks"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### ~~`testTask`~~<sup>Required</sup> <a name="testTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.testTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### ~~`defaultTask`~~<sup>Optional</sup> <a name="defaultTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.defaultTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### ~~`initProject`~~<sup>Optional</sup> <a name="initProject" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.initProject"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### ~~`parent`~~<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.parent"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### ~~`projectType`~~<sup>Required</sup> <a name="projectType" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.projectType"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType

---

##### ~~`autoApprove`~~<sup>Optional</sup> <a name="autoApprove" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.autoApprove"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoApprove: AutoApprove;
```

- *Type:* projen.github.AutoApprove

Auto approve set up for this project.

---

##### ~~`devContainer`~~<sup>Optional</sup> <a name="devContainer" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.devContainer"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly devContainer: DevContainer;
```

- *Type:* projen.vscode.DevContainer

Access for .devcontainer.json (used for GitHub Codespaces).

This will be `undefined` if devContainer boolean is false

---

##### ~~`github`~~<sup>Optional</sup> <a name="github" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.github"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly github: GitHub;
```

- *Type:* projen.github.GitHub

Access all github components.

This will be `undefined` for subprojects.

---

##### ~~`gitpod`~~<sup>Optional</sup> <a name="gitpod" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.gitpod"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitpod: Gitpod;
```

- *Type:* projen.Gitpod

Access for Gitpod.

This will be `undefined` if gitpod boolean is false

---

##### ~~`vscode`~~<sup>Optional</sup> <a name="vscode" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.vscode"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly vscode: VsCode;
```

- *Type:* projen.vscode.VsCode

Access all VSCode components.

This will be `undefined` for subprojects.

---

##### ~~`allowLibraryDependencies`~~<sup>Required</sup> <a name="allowLibraryDependencies" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.allowLibraryDependencies"></a>

- *Deprecated:* use `package.allowLibraryDependencies`

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean

---

##### ~~`artifactsDirectory`~~<sup>Required</sup> <a name="artifactsDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.artifactsDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string

The build output directory.

An npm tarball will be created under the `js`
subdirectory. For example, if this is set to `dist` (the default), the npm
tarball will be placed under `dist/js/boom-boom-1.2.3.tg`.

---

##### ~~`artifactsJavascriptDirectory`~~<sup>Required</sup> <a name="artifactsJavascriptDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.artifactsJavascriptDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly artifactsJavascriptDirectory: string;
```

- *Type:* string

The location of the npm tarball after build (`${artifactsDirectory}/js`).

---

##### ~~`bundler`~~<sup>Required</sup> <a name="bundler" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.bundler"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bundler: Bundler;
```

- *Type:* projen.javascript.Bundler

---

##### ~~`entrypoint`~~<sup>Required</sup> <a name="entrypoint" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.entrypoint"></a>

- *Deprecated:* use `package.entrypoint`

```typescript
public readonly entrypoint: string;
```

- *Type:* string

---

##### ~~`manifest`~~<sup>Required</sup> <a name="manifest" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.manifest"></a>

- *Deprecated:* use `package.addField(x, y)`

```typescript
public readonly manifest: any;
```

- *Type:* any

---

##### ~~`npmrc`~~<sup>Required</sup> <a name="npmrc" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.npmrc"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmrc: NpmConfig;
```

- *Type:* projen.javascript.NpmConfig

The .npmrc file.

---

##### ~~`package`~~<sup>Required</sup> <a name="package" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.package"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly package: NodePackage;
```

- *Type:* projen.javascript.NodePackage

API for managing the node package.

---

##### ~~`packageManager`~~<sup>Required</sup> <a name="packageManager" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.packageManager"></a>

- *Deprecated:* use `package.packageManager`

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager

The package manager to use.

---

##### ~~`runScriptCommand`~~<sup>Required</sup> <a name="runScriptCommand" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.runScriptCommand"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly runScriptCommand: string;
```

- *Type:* string

The command to use to run scripts (e.g. `yarn run` or `npm run` depends on the package manager).

---

##### ~~`autoMerge`~~<sup>Optional</sup> <a name="autoMerge" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.autoMerge"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoMerge: AutoMerge;
```

- *Type:* projen.github.AutoMerge

Component that sets up mergify for merging approved pull requests.

---

##### ~~`biome`~~<sup>Optional</sup> <a name="biome" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.biome"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly biome: Biome;
```

- *Type:* projen.javascript.Biome

---

##### ~~`buildWorkflow`~~<sup>Optional</sup> <a name="buildWorkflow" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.buildWorkflow"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly buildWorkflow: BuildWorkflow;
```

- *Type:* projen.build.BuildWorkflow

The PR build GitHub workflow.

`undefined` if `buildWorkflow` is disabled.

---

##### ~~`buildWorkflowJobId`~~<sup>Optional</sup> <a name="buildWorkflowJobId" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.buildWorkflowJobId"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly buildWorkflowJobId: string;
```

- *Type:* string

The job ID of the build workflow.

---

##### ~~`jest`~~<sup>Optional</sup> <a name="jest" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.jest"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly jest: Jest;
```

- *Type:* projen.javascript.Jest

The Jest configuration (if enabled).

---

##### ~~`maxNodeVersion`~~<sup>Optional</sup> <a name="maxNodeVersion" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.maxNodeVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string

Maximum node version supported by this package.

The value indicates the package is incompatible with newer versions.

---

##### ~~`minNodeVersion`~~<sup>Optional</sup> <a name="minNodeVersion" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.minNodeVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string

The minimum node version required by this package to function.

This value indicates the package is incompatible with older versions.

---

##### ~~`npmignore`~~<sup>Optional</sup> <a name="npmignore" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.npmignore"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

The .npmignore file.

---

##### ~~`prettier`~~<sup>Optional</sup> <a name="prettier" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.prettier"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly prettier: Prettier;
```

- *Type:* projen.javascript.Prettier

---

##### ~~`publisher`~~<sup>Optional</sup> <a name="publisher" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.publisher"></a>

- *Deprecated:* use `release.publisher`.

```typescript
public readonly publisher: Publisher;
```

- *Type:* projen.release.Publisher

Package publisher.

This will be `undefined` if the project does not have a
release workflow.

---

##### ~~`release`~~<sup>Optional</sup> <a name="release" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.release"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly release: Release;
```

- *Type:* projen.release.Release

Release management.

---

##### ~~`upgradeWorkflow`~~<sup>Optional</sup> <a name="upgradeWorkflow" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.upgradeWorkflow"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly upgradeWorkflow: UpgradeDependencies;
```

- *Type:* projen.javascript.UpgradeDependencies

The upgrade workflow.

---

##### ~~`docsDirectory`~~<sup>Required</sup> <a name="docsDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.docsDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly docsDirectory: string;
```

- *Type:* string

---

##### ~~`libdir`~~<sup>Required</sup> <a name="libdir" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.libdir"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly libdir: string;
```

- *Type:* string

The directory in which compiled .js files reside.

---

##### ~~`srcdir`~~<sup>Required</sup> <a name="srcdir" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.srcdir"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly srcdir: string;
```

- *Type:* string

The directory in which the .ts sources reside.

---

##### ~~`testdir`~~<sup>Required</sup> <a name="testdir" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.testdir"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly testdir: string;
```

- *Type:* string

The directory in which tests reside.

---

##### ~~`tsconfigDev`~~<sup>Required</sup> <a name="tsconfigDev" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfigDev"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfigDev: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

A typescript configuration file which covers all files (sources, tests, projen).

---

##### ~~`watchTask`~~<sup>Required</sup> <a name="watchTask" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.watchTask"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly watchTask: Task;
```

- *Type:* projen.Task

The "watch" task.

---

##### ~~`docgen`~~<sup>Optional</sup> <a name="docgen" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.docgen"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean

---

##### ~~`eslint`~~<sup>Optional</sup> <a name="eslint" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.eslint"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly eslint: Eslint;
```

- *Type:* projen.javascript.Eslint

---

##### ~~`tsconfig`~~<sup>Optional</sup> <a name="tsconfig" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfig"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfig: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### ~~`tsconfigEslint`~~<sup>Optional</sup> <a name="tsconfigEslint" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.tsconfigEslint"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfigEslint: TypescriptConfig;
```

- *Type:* projen.javascript.TypescriptConfig

---

##### ~~`extensionName`~~<sup>Required</sup> <a name="extensionName" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.extensionName"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly extensionName: string;
```

- *Type:* string

---

##### ~~`extensionTypes`~~<sup>Required</sup> <a name="extensionTypes" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.extensionTypes"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly extensionTypes: D9ExtensionType[];
```

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN">DEFAULT_TS_JEST_TRANFORM_PATTERN</a></code> | <code>string</code> | *No description.* |

---

##### ~~`DEFAULT_TASK`~~<sup>Required</sup> <a name="DEFAULT_TASK" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.DEFAULT_TASK"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

##### ~~`DEFAULT_TS_JEST_TRANFORM_PATTERN`~~<sup>Required</sup> <a name="DEFAULT_TS_JEST_TRANFORM_PATTERN" id="@wbce/projen-d9-extension.DirectusExtensionProject.property.DEFAULT_TS_JEST_TRANFORM_PATTERN"></a>

- *Deprecated:* Use {@link D9ExtensionProject } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly DEFAULT_TS_JEST_TRANFORM_PATTERN: string;
```

- *Type:* string

---

### ExtensionFolder <a name="ExtensionFolder" id="@wbce/projen-d9-extension.ExtensionFolder"></a>

A folder that acts as a pnpm workspace containing Directus extensions.

Extensions can be added programmatically via addExtension() or
declared in extensions.json and loaded automatically.

*Example*

```typescript
const project = new D9Project({ name: 'my-app', defaultReleaseBranch: 'main' });
project.extensions.addExtension('my-hook', D9ExtensionType.HOOK);
```


#### Initializers <a name="Initializers" id="@wbce/projen-d9-extension.ExtensionFolder.Initializer"></a>

```typescript
import { ExtensionFolder } from '@wbce/projen-d9-extension'

new ExtensionFolder(options: ExtensionFolderOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.Initializer.parameter.options">options</a></code> | <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions">ExtensionFolderOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="@wbce/projen-d9-extension.ExtensionFolder.Initializer.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-d9-extension.ExtensionFolderOptions">ExtensionFolderOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.annotateGenerated">annotateGenerated</a></code> | Consider a set of files as "generated". |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.add">add</a></code> | Add a Directus extension to this folder. |

---

##### `toString` <a name="toString" id="@wbce/projen-d9-extension.ExtensionFolder.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-d9-extension.ExtensionFolder.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-d9-extension.ExtensionFolder.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="@wbce/projen-d9-extension.ExtensionFolder.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="@wbce/projen-d9-extension.ExtensionFolder.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="@wbce/projen-d9-extension.ExtensionFolder.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="@wbce/projen-d9-extension.ExtensionFolder.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="@wbce/projen-d9-extension.ExtensionFolder.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="@wbce/projen-d9-extension.ExtensionFolder.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="@wbce/projen-d9-extension.ExtensionFolder.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.ExtensionFolder.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="@wbce/projen-d9-extension.ExtensionFolder.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="@wbce/projen-d9-extension.ExtensionFolder.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="@wbce/projen-d9-extension.ExtensionFolder.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="@wbce/projen-d9-extension.ExtensionFolder.annotateGenerated"></a>

```typescript
public annotateGenerated(_glob: string): void
```

Consider a set of files as "generated".

This method is implemented by
derived classes and used for example, to add git attributes to tell GitHub
that certain files are generated.

###### `_glob`<sup>Required</sup> <a name="_glob" id="@wbce/projen-d9-extension.ExtensionFolder.annotateGenerated.parameter._glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-d9-extension.ExtensionFolder.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-d9-extension.ExtensionFolder.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="@wbce/projen-d9-extension.ExtensionFolder.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.ExtensionFolder.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="@wbce/projen-d9-extension.ExtensionFolder.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="@wbce/projen-d9-extension.ExtensionFolder.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="@wbce/projen-d9-extension.ExtensionFolder.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.ExtensionFolder.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="@wbce/projen-d9-extension.ExtensionFolder.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="@wbce/projen-d9-extension.ExtensionFolder.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

##### `add` <a name="add" id="@wbce/projen-d9-extension.ExtensionFolder.add"></a>

```typescript
public add(name: string, extensionTypes: D9ExtensionType[], options?: AddExtensionOptions): D9ExtensionProject
```

Add a Directus extension to this folder.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.ExtensionFolder.add.parameter.name"></a>

- *Type:* string

---

###### `extensionTypes`<sup>Required</sup> <a name="extensionTypes" id="@wbce/projen-d9-extension.ExtensionFolder.add.parameter.extensionTypes"></a>

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-d9-extension.ExtensionFolder.add.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-d9-extension.AddExtensionOptions">AddExtensionOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-d9-extension.ExtensionFolder.isConstruct"></a>

```typescript
import { ExtensionFolder } from '@wbce/projen-d9-extension'

ExtensionFolder.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.ExtensionFolder.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="@wbce/projen-d9-extension.ExtensionFolder.isProject"></a>

```typescript
import { ExtensionFolder } from '@wbce/projen-d9-extension'

ExtensionFolder.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-d9-extension.ExtensionFolder.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@wbce/projen-d9-extension.ExtensionFolder.of"></a>

```typescript
import { ExtensionFolder } from '@wbce/projen-d9-extension'

ExtensionFolder.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="@wbce/projen-d9-extension.ExtensionFolder.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.workspace">workspace</a></code> | <code>@wbce/projen-shared.PnpmWorkspace</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-d9-extension.ExtensionFolder.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.ExtensionFolder.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="@wbce/projen-d9-extension.ExtensionFolder.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="@wbce/projen-d9-extension.ExtensionFolder.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="@wbce/projen-d9-extension.ExtensionFolder.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="@wbce/projen-d9-extension.ExtensionFolder.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="@wbce/projen-d9-extension.ExtensionFolder.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="@wbce/projen-d9-extension.ExtensionFolder.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="@wbce/projen-d9-extension.ExtensionFolder.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.ExtensionFolder.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="@wbce/projen-d9-extension.ExtensionFolder.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="@wbce/projen-d9-extension.ExtensionFolder.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.ExtensionFolder.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="@wbce/projen-d9-extension.ExtensionFolder.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="@wbce/projen-d9-extension.ExtensionFolder.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="@wbce/projen-d9-extension.ExtensionFolder.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="@wbce/projen-d9-extension.ExtensionFolder.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="@wbce/projen-d9-extension.ExtensionFolder.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.ExtensionFolder.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

##### `workspace`<sup>Required</sup> <a name="workspace" id="@wbce/projen-d9-extension.ExtensionFolder.property.workspace"></a>

```typescript
public readonly workspace: PnpmWorkspace;
```

- *Type:* @wbce/projen-shared.PnpmWorkspace

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolder.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="@wbce/projen-d9-extension.ExtensionFolder.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

## Structs <a name="Structs" id="Structs"></a>

### AddExtensionOptions <a name="AddExtensionOptions" id="@wbce/projen-d9-extension.AddExtensionOptions"></a>

Options passed to addExtension.

#### Initializer <a name="Initializer" id="@wbce/projen-d9-extension.AddExtensionOptions.Initializer"></a>

```typescript
import { AddExtensionOptions } from '@wbce/projen-d9-extension'

const addExtensionOptions: AddExtensionOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.AddExtensionOptions.property.deps">deps</a></code> | <code>string[]</code> | Additional dependencies. |
| <code><a href="#@wbce/projen-d9-extension.AddExtensionOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Additional dev dependencies. |

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@wbce/projen-d9-extension.AddExtensionOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]

Additional dependencies.

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@wbce/projen-d9-extension.AddExtensionOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]

Additional dev dependencies.

---

### D9ExtensionProjectOptions <a name="D9ExtensionProjectOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions"></a>

#### Initializer <a name="Initializer" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.Initializer"></a>

```typescript
import { D9ExtensionProjectOptions } from '@wbce/projen-d9-extension'

const d9ExtensionProjectOptions: D9ExtensionProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bunVersion">bunVersion</a></code> | <code>string</code> | The version of Bun to use if using Bun as a package manager. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | The maximum node version supported by this package. Most projects should not use this option. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. Most projects should not use this option. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmRegistry">npmRegistry</a></code> | <code>string</code> | The host name of the npm registry to publish to. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmTrustedPublishing">npmTrustedPublishing</a></code> | <code>boolean</code> | Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.scripts">scripts</a></code> | <code>{[ key: string ]: string}</code> | npm scripts to include. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bumpPackage">bumpPackage</a></code> | <code>string</code> | The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.nextVersionCommand">nextVersionCommand</a></code> | <code>string</code> | A shell command to control the next version to release. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseEnvironment">releaseEnvironment</a></code> | <code>string</code> | The GitHub Actions environment used for the release. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseEveryCommit">releaseEveryCommit</a></code> | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseSchedule">releaseSchedule</a></code> | <code>string</code> | CRON schedule to trigger new releases. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowEnv">releaseWorkflowEnv</a></code> | <code>{[ key: string ]: string}</code> | Build environment variables for release workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.defaultReleaseBranch">defaultReleaseBranch</a></code> | <code>string</code> | The name of the main release branch. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.auditDeps">auditDeps</a></code> | <code>boolean</code> | Run security audit on dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.auditDepsOptions">auditDepsOptions</a></code> | <code>projen.javascript.AuditOptions</code> | Security audit options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.biome">biome</a></code> | <code>boolean</code> | Setup Biome. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.biomeOptions">biomeOptions</a></code> | <code>projen.javascript.BiomeOptions</code> | Biome options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflowOptions">buildWorkflowOptions</a></code> | <code>projen.javascript.BuildWorkflowOptions</code> | Options for PR build workflow. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflowTriggers">buildWorkflowTriggers</a></code> | <code>projen.github.workflows.Triggers</code> | Build workflow triggers. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mutableBuild">mutableBuild</a></code> | <code>boolean</code> | Automatically update files modified during builds to pull-request branches. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmignore">npmignore</a></code> | <code>string[]</code> | Additional entries to .npmignore. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflow">releaseWorkflow</a></code> | <code>boolean</code> | DEPRECATED: renamed to `release`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version used in GitHub Actions workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.disableTsconfig">disableTsconfig</a></code> | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.disableTsconfigDev">disableTsconfigDev</a></code> | <code>boolean</code> | Do not generate a `tsconfig.dev.json` file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.docgen">docgen</a></code> | <code>boolean</code> | Docgen by Typedoc. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | Docs directory. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.entrypointTypes">entrypointTypes</a></code> | <code>string</code> | The .d.ts file that includes the type declarations for this module. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.eslint">eslint</a></code> | <code>boolean</code> | Setup eslint. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.eslintOptions">eslintOptions</a></code> | <code>projen.javascript.EslintOptions</code> | Eslint options. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.libdir">libdir</a></code> | <code>string</code> | Typescript  artifacts output directory. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcOptions</code> | Options for .projenrc.ts. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.srcdir">srcdir</a></code> | <code>string</code> | Typescript sources directory. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.testdir">testdir</a></code> | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom TSConfig. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfigDevFile">tsconfigDevFile</a></code> | <code>string</code> | The name of the development tsconfig.json file. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsJestOptions">tsJestOptions</a></code> | <code>projen.typescript.TsJestOptions</code> | Options for ts-jest. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.typescriptVersion">typescriptVersion</a></code> | <code>string</code> | TypeScript version to use. |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.extensionTypes">extensionTypes</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]</code> | The type of Directus extension. |

---

##### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### `autoApproveOptions`<sup>Optional</sup> <a name="autoApproveOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoApproveOptions"></a>

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### `autoMerge`<sup>Optional</sup> <a name="autoMerge" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoMerge"></a>

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### `autoMergeOptions`<sup>Optional</sup> <a name="autoMergeOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoMergeOptions"></a>

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### `clobber`<sup>Optional</sup> <a name="clobber" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.clobber"></a>

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### `devContainer`<sup>Optional</sup> <a name="devContainer" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.devContainer"></a>

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### `github`<sup>Optional</sup> <a name="github" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.github"></a>

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `githubOptions`<sup>Optional</sup> <a name="githubOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.githubOptions"></a>

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### `gitpod`<sup>Optional</sup> <a name="gitpod" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitpod"></a>

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenTokenSecret"></a>

- *Deprecated:* use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### `readme`<sup>Optional</sup> <a name="readme" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.readme"></a>

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### `stale`<sup>Optional</sup> <a name="stale" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.stale"></a>

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### `staleOptions`<sup>Optional</sup> <a name="staleOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.staleOptions"></a>

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### `vscode`<sup>Optional</sup> <a name="vscode" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.vscode"></a>

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### `allowLibraryDependencies`<sup>Optional</sup> <a name="allowLibraryDependencies" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.allowLibraryDependencies"></a>

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### `authorEmail`<sup>Optional</sup> <a name="authorEmail" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorEmail"></a>

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### `authorName`<sup>Optional</sup> <a name="authorName" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorName"></a>

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### `authorOrganization`<sup>Optional</sup> <a name="authorOrganization" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorOrganization"></a>

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### `authorUrl`<sup>Optional</sup> <a name="authorUrl" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.authorUrl"></a>

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### `autoDetectBin`<sup>Optional</sup> <a name="autoDetectBin" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoDetectBin"></a>

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### `bin`<sup>Optional</sup> <a name="bin" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bin"></a>

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### `bugsEmail`<sup>Optional</sup> <a name="bugsEmail" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bugsEmail"></a>

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### `bugsUrl`<sup>Optional</sup> <a name="bugsUrl" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bugsUrl"></a>

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### `bundledDeps`<sup>Optional</sup> <a name="bundledDeps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bundledDeps"></a>

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

##### `bunVersion`<sup>Optional</sup> <a name="bunVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bunVersion"></a>

```typescript
public readonly bunVersion: string;
```

- *Type:* string
- *Default:* "latest"

The version of Bun to use if using Bun as a package manager.

---

##### `codeArtifactOptions`<sup>Optional</sup> <a name="codeArtifactOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeArtifactOptions"></a>

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### `deps`<sup>Optional</sup> <a name="deps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.deps"></a>

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'express', 'lodash', 'foo@^2' ]
```


##### `description`<sup>Optional</sup> <a name="description" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### `devDeps`<sup>Optional</sup> <a name="devDeps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.devDeps"></a>

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'typescript', '@types/express' ]
```


##### `entrypoint`<sup>Optional</sup> <a name="entrypoint" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.entrypoint"></a>

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`).

Set to an empty string to not include `main` in your package.json

---

##### `homepage`<sup>Optional</sup> <a name="homepage" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.homepage"></a>

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### `keywords`<sup>Optional</sup> <a name="keywords" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.keywords"></a>

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### `license`<sup>Optional</sup> <a name="license" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.license"></a>

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### `licensed`<sup>Optional</sup> <a name="licensed" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.licensed"></a>

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### `maxNodeVersion`<sup>Optional</sup> <a name="maxNodeVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.maxNodeVersion"></a>

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no maximum version is enforced

The maximum node version supported by this package. Most projects should not use this option.

The value indicates that the package is incompatible with any newer versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option.
Consider this option only if your package is known to not function with newer versions of node.

---

##### `minNodeVersion`<sup>Optional</sup> <a name="minNodeVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.minNodeVersion"></a>

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no minimum version is enforced

The minimum node version required by this package to function. Most projects should not use this option.

The value indicates that the package is incompatible with any older versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option, even if your package is incompatible with EOL versions of node.
Consider this option only if your package depends on a specific feature, that is not available in other LTS versions.
Setting this option has very high impact on the consumers of your package,
as package managers will actively prevent usage with node versions you have marked as incompatible.

To change the node version of your CI/CD workflows, use `workflowNodeVersion`.

---

##### `npmAccess`<sup>Optional</sup> <a name="npmAccess" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmAccess"></a>

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### `npmProvenance`<sup>Optional</sup> <a name="npmProvenance" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmProvenance"></a>

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### ~~`npmRegistry`~~<sup>Optional</sup> <a name="npmRegistry" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmRegistry"></a>

- *Deprecated:* use `npmRegistryUrl` instead

```typescript
public readonly npmRegistry: string;
```

- *Type:* string

The host name of the npm registry to publish to.

Cannot be set together with `npmRegistryUrl`.

---

##### `npmRegistryUrl`<sup>Optional</sup> <a name="npmRegistryUrl" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmRegistryUrl"></a>

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### `npmTokenSecret`<sup>Optional</sup> <a name="npmTokenSecret" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmTokenSecret"></a>

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### `npmTrustedPublishing`<sup>Optional</sup> <a name="npmTrustedPublishing" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmTrustedPublishing"></a>

```typescript
public readonly npmTrustedPublishing: boolean;
```

- *Type:* boolean
- *Default:* false

Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work.

---

##### `packageManager`<sup>Optional</sup> <a name="packageManager" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.packageManager"></a>

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* NodePackageManager.YARN_CLASSIC

The Node Package Manager used to execute scripts.

---

##### `packageName`<sup>Optional</sup> <a name="packageName" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.packageName"></a>

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### `peerDependencyOptions`<sup>Optional</sup> <a name="peerDependencyOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.peerDependencyOptions"></a>

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### `peerDeps`<sup>Optional</sup> <a name="peerDeps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.peerDeps"></a>

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### `pnpmVersion`<sup>Optional</sup> <a name="pnpmVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pnpmVersion"></a>

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "9"

The version of PNPM to use if using PNPM as a package manager.

---

##### `repository`<sup>Optional</sup> <a name="repository" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.repository"></a>

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### `repositoryDirectory`<sup>Optional</sup> <a name="repositoryDirectory" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.repositoryDirectory"></a>

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### `scopedPackagesOptions`<sup>Optional</sup> <a name="scopedPackagesOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.scopedPackagesOptions"></a>

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### ~~`scripts`~~<sup>Optional</sup> <a name="scripts" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.scripts"></a>

- *Deprecated:* use `project.addTask()` or `package.setScript()`

```typescript
public readonly scripts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

npm scripts to include.

If a script has the same name as a standard script,
the standard script will be overwritten.
Also adds the script as a task.

---

##### `stability`<sup>Optional</sup> <a name="stability" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.stability"></a>

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### `yarnBerryOptions`<sup>Optional</sup> <a name="yarnBerryOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.yarnBerryOptions"></a>

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

##### `bumpPackage`<sup>Optional</sup> <a name="bumpPackage" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bumpPackage"></a>

```typescript
public readonly bumpPackage: string;
```

- *Type:* string
- *Default:* A recent version of "commit-and-tag-version"

The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.

This can be any compatible package version, including the deprecated `standard-version@9`.

---

##### `jsiiReleaseVersion`<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jsiiReleaseVersion"></a>

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### `minMajorVersion`<sup>Optional</sup> <a name="minMajorVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.minMajorVersion"></a>

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### `nextVersionCommand`<sup>Optional</sup> <a name="nextVersionCommand" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.nextVersionCommand"></a>

```typescript
public readonly nextVersionCommand: string;
```

- *Type:* string
- *Default:* The next version will be determined based on the commit history and project settings.

A shell command to control the next version to release.

If present, this shell command will be run before the bump is executed, and
it determines what version to release. It will be executed in the following
environment:

- Working directory: the project directory.
- `$VERSION`: the current version. Looks like `1.2.3`.
- `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
- `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.

The command should print one of the following to `stdout`:

- Nothing: the next version number will be determined based on commit history.
- `x.y.z`: the next version number will be `x.y.z`.
- `major|minor|patch`: the next version number will be the current version number
  with the indicated component bumped.

This setting cannot be specified together with `minMajorVersion`; the invoked
script can be used to achieve the effects of `minMajorVersion`.

---

##### `npmDistTag`<sup>Optional</sup> <a name="npmDistTag" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmDistTag"></a>

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### `prerelease`<sup>Optional</sup> <a name="prerelease" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prerelease"></a>

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### `publishDryRun`<sup>Optional</sup> <a name="publishDryRun" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.publishDryRun"></a>

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### `publishTasks`<sup>Optional</sup> <a name="publishTasks" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.publishTasks"></a>

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### `releasableCommits`<sup>Optional</sup> <a name="releasableCommits" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releasableCommits"></a>

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### `releaseBranches`<sup>Optional</sup> <a name="releaseBranches" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseBranches"></a>

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### `releaseEnvironment`<sup>Optional</sup> <a name="releaseEnvironment" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseEnvironment"></a>

```typescript
public readonly releaseEnvironment: string;
```

- *Type:* string
- *Default:* no environment used, unless set at the artifact level

The GitHub Actions environment used for the release.

This can be used to add an explicit approval step to the release
or limit who can initiate a release through environment protection rules.

When multiple artifacts are released, the environment can be overwritten
on a per artifact basis.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="releaseEveryCommit" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseEveryCommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### `releaseFailureIssue`<sup>Optional</sup> <a name="releaseFailureIssue" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseFailureIssue"></a>

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### `releaseFailureIssueLabel`<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseFailureIssueLabel"></a>

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="releaseSchedule" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseSchedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* string
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### `releaseTagPrefix`<sup>Optional</sup> <a name="releaseTagPrefix" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseTagPrefix"></a>

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### `releaseTrigger`<sup>Optional</sup> <a name="releaseTrigger" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseTrigger"></a>

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### `releaseWorkflowEnv`<sup>Optional</sup> <a name="releaseWorkflowEnv" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowEnv"></a>

```typescript
public readonly releaseWorkflowEnv: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Build environment variables for release workflows.

---

##### `releaseWorkflowName`<sup>Optional</sup> <a name="releaseWorkflowName" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowName"></a>

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### `releaseWorkflowSetupSteps`<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflowSetupSteps"></a>

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### `versionrcOptions`<sup>Optional</sup> <a name="versionrcOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.versionrcOptions"></a>

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### `workflowContainerImage`<sup>Optional</sup> <a name="workflowContainerImage" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowContainerImage"></a>

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### `workflowRunsOn`<sup>Optional</sup> <a name="workflowRunsOn" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowRunsOn"></a>

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### `workflowRunsOnGroup`<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowRunsOnGroup"></a>

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### `defaultReleaseBranch`<sup>Required</sup> <a name="defaultReleaseBranch" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.defaultReleaseBranch"></a>

```typescript
public readonly defaultReleaseBranch: string;
```

- *Type:* string
- *Default:* "main"

The name of the main release branch.

---

##### `artifactsDirectory`<sup>Optional</sup> <a name="artifactsDirectory" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.artifactsDirectory"></a>

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### `auditDeps`<sup>Optional</sup> <a name="auditDeps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.auditDeps"></a>

```typescript
public readonly auditDeps: boolean;
```

- *Type:* boolean
- *Default:* false

Run security audit on dependencies.

When enabled, creates an "audit" task that checks for known security vulnerabilities
in dependencies. By default, runs during every build and checks for "high" severity
vulnerabilities or above in all dependencies (including dev dependencies).

---

##### `auditDepsOptions`<sup>Optional</sup> <a name="auditDepsOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.auditDepsOptions"></a>

```typescript
public readonly auditDepsOptions: AuditOptions;
```

- *Type:* projen.javascript.AuditOptions
- *Default:* default options

Security audit options.

---

##### `autoApproveUpgrades`<sup>Optional</sup> <a name="autoApproveUpgrades" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.autoApproveUpgrades"></a>

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### `biome`<sup>Optional</sup> <a name="biome" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.biome"></a>

```typescript
public readonly biome: boolean;
```

- *Type:* boolean
- *Default:* false

Setup Biome.

---

##### `biomeOptions`<sup>Optional</sup> <a name="biomeOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.biomeOptions"></a>

```typescript
public readonly biomeOptions: BiomeOptions;
```

- *Type:* projen.javascript.BiomeOptions
- *Default:* default options

Biome options.

---

##### `buildWorkflow`<sup>Optional</sup> <a name="buildWorkflow" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflow"></a>

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### `buildWorkflowOptions`<sup>Optional</sup> <a name="buildWorkflowOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflowOptions"></a>

```typescript
public readonly buildWorkflowOptions: BuildWorkflowOptions;
```

- *Type:* projen.javascript.BuildWorkflowOptions

Options for PR build workflow.

---

##### ~~`buildWorkflowTriggers`~~<sup>Optional</sup> <a name="buildWorkflowTriggers" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.buildWorkflowTriggers"></a>

- *Deprecated:* - Use `buildWorkflowOptions.workflowTriggers`

```typescript
public readonly buildWorkflowTriggers: Triggers;
```

- *Type:* projen.github.workflows.Triggers
- *Default:* "{ pullRequest: {}, workflowDispatch: {} }"

Build workflow triggers.

---

##### `bundlerOptions`<sup>Optional</sup> <a name="bundlerOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.bundlerOptions"></a>

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### `checkLicenses`<sup>Optional</sup> <a name="checkLicenses" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.checkLicenses"></a>

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### `codeCov`<sup>Optional</sup> <a name="codeCov" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeCov"></a>

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`.

---

##### `codeCovTokenSecret`<sup>Optional</sup> <a name="codeCovTokenSecret" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.codeCovTokenSecret"></a>

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* OIDC auth is used

Define the secret name for a specified https://codecov.io/ token.

---

##### `copyrightOwner`<sup>Optional</sup> <a name="copyrightOwner" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.copyrightOwner"></a>

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### `copyrightPeriod`<sup>Optional</sup> <a name="copyrightPeriod" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.copyrightPeriod"></a>

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### `dependabotOptions`<sup>Optional</sup> <a name="dependabotOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.dependabotOptions"></a>

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### `depsUpgrade`<sup>Optional</sup> <a name="depsUpgrade" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.depsUpgrade"></a>

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* `true` for root projects, `false` for subprojects

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### `depsUpgradeOptions`<sup>Optional</sup> <a name="depsUpgradeOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.depsUpgradeOptions"></a>

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### `gitignore`<sup>Optional</sup> <a name="gitignore" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.gitignore"></a>

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### `jest`<sup>Optional</sup> <a name="jest" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jest"></a>

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### `jestOptions`<sup>Optional</sup> <a name="jestOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.jestOptions"></a>

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### ~~`mutableBuild`~~<sup>Optional</sup> <a name="mutableBuild" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.mutableBuild"></a>

- *Deprecated:* - Use `buildWorkflowOptions.mutableBuild`

```typescript
public readonly mutableBuild: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically update files modified during builds to pull-request branches.

This means
that any files synthesized by projen or e.g. test snapshots will always be up-to-date
before a PR is merged.

Implies that PR builds do not have anti-tamper checks.

---

##### ~~`npmignore`~~<sup>Optional</sup> <a name="npmignore" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmignore"></a>

- *Deprecated:* - use `project.addPackageIgnore`

```typescript
public readonly npmignore: string[];
```

- *Type:* string[]

Additional entries to .npmignore.

---

##### `npmignoreEnabled`<sup>Optional</sup> <a name="npmignoreEnabled" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmignoreEnabled"></a>

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### `npmIgnoreOptions`<sup>Optional</sup> <a name="npmIgnoreOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.npmIgnoreOptions"></a>

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### `package`<sup>Optional</sup> <a name="package" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.package"></a>

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### `prettier`<sup>Optional</sup> <a name="prettier" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prettier"></a>

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### `prettierOptions`<sup>Optional</sup> <a name="prettierOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.prettierOptions"></a>

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### `projenDevDependency`<sup>Optional</sup> <a name="projenDevDependency" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenDevDependency"></a>

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Indicates of "projen" should be installed as a devDependency.

---

##### `projenrcJs`<sup>Optional</sup> <a name="projenrcJs" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJs"></a>

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### `projenrcJsOptions`<sup>Optional</sup> <a name="projenrcJsOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcJsOptions"></a>

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### `projenVersion`<sup>Optional</sup> <a name="projenVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenVersion"></a>

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### `pullRequestTemplateContents`<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.pullRequestTemplateContents"></a>

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### `release`<sup>Optional</sup> <a name="release" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.release"></a>

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### `releaseToNpm`<sup>Optional</sup> <a name="releaseToNpm" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseToNpm"></a>

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### ~~`releaseWorkflow`~~<sup>Optional</sup> <a name="releaseWorkflow" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.releaseWorkflow"></a>

- *Deprecated:* see `release`.

```typescript
public readonly releaseWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

DEPRECATED: renamed to `release`.

---

##### `workflowBootstrapSteps`<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowBootstrapSteps"></a>

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### `workflowGitIdentity`<sup>Optional</sup> <a name="workflowGitIdentity" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowGitIdentity"></a>

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* default GitHub Actions user

The git identity to use in workflows.

---

##### `workflowNodeVersion`<sup>Optional</sup> <a name="workflowNodeVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowNodeVersion"></a>

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* `minNodeVersion` if set, otherwise `lts/*`.

The node version used in GitHub Actions workflows.

Always use this option if your GitHub Actions workflows require a specific to run.

---

##### `workflowPackageCache`<sup>Optional</sup> <a name="workflowPackageCache" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.workflowPackageCache"></a>

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### `disableTsconfig`<sup>Optional</sup> <a name="disableTsconfig" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.disableTsconfig"></a>

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### `disableTsconfigDev`<sup>Optional</sup> <a name="disableTsconfigDev" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.disableTsconfigDev"></a>

```typescript
public readonly disableTsconfigDev: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.dev.json` file.

---

##### `docgen`<sup>Optional</sup> <a name="docgen" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.docgen"></a>

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean
- *Default:* false

Docgen by Typedoc.

---

##### `docsDirectory`<sup>Optional</sup> <a name="docsDirectory" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.docsDirectory"></a>

```typescript
public readonly docsDirectory: string;
```

- *Type:* string
- *Default:* "docs"

Docs directory.

---

##### `entrypointTypes`<sup>Optional</sup> <a name="entrypointTypes" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.entrypointTypes"></a>

```typescript
public readonly entrypointTypes: string;
```

- *Type:* string
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### `eslint`<sup>Optional</sup> <a name="eslint" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.eslint"></a>

```typescript
public readonly eslint: boolean;
```

- *Type:* boolean
- *Default:* true, unless biome is enabled

Setup eslint.

---

##### `eslintOptions`<sup>Optional</sup> <a name="eslintOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.eslintOptions"></a>

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* projen.javascript.EslintOptions
- *Default:* opinionated default options

Eslint options.

---

##### `libdir`<sup>Optional</sup> <a name="libdir" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.libdir"></a>

```typescript
public readonly libdir: string;
```

- *Type:* string
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### `projenrcTs`<sup>Optional</sup> <a name="projenrcTs" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcTs"></a>

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### `projenrcTsOptions`<sup>Optional</sup> <a name="projenrcTsOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.projenrcTsOptions"></a>

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* projen.typescript.ProjenrcOptions

Options for .projenrc.ts.

---

##### `sampleCode`<sup>Optional</sup> <a name="sampleCode" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.sampleCode"></a>

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### `srcdir`<sup>Optional</sup> <a name="srcdir" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.srcdir"></a>

```typescript
public readonly srcdir: string;
```

- *Type:* string
- *Default:* "src"

Typescript sources directory.

---

##### `testdir`<sup>Optional</sup> <a name="testdir" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.testdir"></a>

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "test"

Jest tests directory. Tests files should be named `xxx.test.ts`.

If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
then tests are going to be compiled into `lib/` and executed as javascript.
If the test directory is outside of `src`, then we configure jest to
compile the code in-memory.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* default options

Custom TSConfig.

---

##### `tsconfigDev`<sup>Optional</sup> <a name="tsconfigDev" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfigDev"></a>

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### `tsconfigDevFile`<sup>Optional</sup> <a name="tsconfigDevFile" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsconfigDevFile"></a>

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* string
- *Default:* "tsconfig.dev.json"

The name of the development tsconfig.json file.

---

##### `tsJestOptions`<sup>Optional</sup> <a name="tsJestOptions" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.tsJestOptions"></a>

```typescript
public readonly tsJestOptions: TsJestOptions;
```

- *Type:* projen.typescript.TsJestOptions

Options for ts-jest.

---

##### `typescriptVersion`<sup>Optional</sup> <a name="typescriptVersion" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.typescriptVersion"></a>

```typescript
public readonly typescriptVersion: string;
```

- *Type:* string
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the
same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### `extensionTypes`<sup>Required</sup> <a name="extensionTypes" id="@wbce/projen-d9-extension.D9ExtensionProjectOptions.property.extensionTypes"></a>

```typescript
public readonly extensionTypes: D9ExtensionType[];
```

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]

The type of Directus extension.

---

### DirectusExtensionProjectOptions <a name="DirectusExtensionProjectOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions"></a>

#### Initializer <a name="Initializer" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.Initializer"></a>

```typescript
import { DirectusExtensionProjectOptions } from '@wbce/projen-d9-extension'

const directusExtensionProjectOptions: DirectusExtensionProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoApproveOptions">autoApproveOptions</a></code> | <code>projen.github.AutoApproveOptions</code> | Enable and configure the 'auto approve' workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoMerge">autoMerge</a></code> | <code>boolean</code> | Enable automatic merging on GitHub. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoMergeOptions">autoMergeOptions</a></code> | <code>projen.github.AutoMergeOptions</code> | Configure options for automatic merging on GitHub. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.clobber">clobber</a></code> | <code>boolean</code> | Add a `clobber` task which resets the repo to origin. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.devContainer">devContainer</a></code> | <code>boolean</code> | Add a VSCode development environment (used for GitHub Codespaces). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.github">github</a></code> | <code>boolean</code> | Enable GitHub integration. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.githubOptions">githubOptions</a></code> | <code>projen.github.GitHubOptions</code> | Options for GitHub integration. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitpod">gitpod</a></code> | <code>boolean</code> | Add a Gitpod development environment. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for mergify. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projectType">projectType</a></code> | <code>projen.ProjectType</code> | Which type of project this is (library/app). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.readme">readme</a></code> | <code>projen.SampleReadmeProps</code> | The README setup. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.stale">stale</a></code> | <code>boolean</code> | Auto-close of stale issues and pull request. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.staleOptions">staleOptions</a></code> | <code>projen.github.StaleOptions</code> | Auto-close stale issues and pull requests. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.vscode">vscode</a></code> | <code>boolean</code> | Enable VSCode integration. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.allowLibraryDependencies">allowLibraryDependencies</a></code> | <code>boolean</code> | Allow the project to include `peerDependencies` and `bundledDependencies`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorEmail">authorEmail</a></code> | <code>string</code> | Author's e-mail. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorName">authorName</a></code> | <code>string</code> | Author's name. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorOrganization">authorOrganization</a></code> | <code>boolean</code> | Is the author an organization. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorUrl">authorUrl</a></code> | <code>string</code> | Author's URL / Website. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoDetectBin">autoDetectBin</a></code> | <code>boolean</code> | Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bin">bin</a></code> | <code>{[ key: string ]: string}</code> | Binary programs vended with your module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bugsEmail">bugsEmail</a></code> | <code>string</code> | The email address to which issues should be reported. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bugsUrl">bugsUrl</a></code> | <code>string</code> | The url to your project's issue tracker. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bundledDeps">bundledDeps</a></code> | <code>string[]</code> | List of dependencies to bundle into this module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bunVersion">bunVersion</a></code> | <code>string</code> | The version of Bun to use if using Bun as a package manager. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeArtifactOptions">codeArtifactOptions</a></code> | <code>projen.javascript.CodeArtifactOptions</code> | Options for npm packages using AWS CodeArtifact. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.deps">deps</a></code> | <code>string[]</code> | Runtime dependencies of this module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.description">description</a></code> | <code>string</code> | The description is just a string that helps people understand the purpose of the package. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.devDeps">devDeps</a></code> | <code>string[]</code> | Build dependencies for this module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.entrypoint">entrypoint</a></code> | <code>string</code> | Module entrypoint (`main` in `package.json`). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.homepage">homepage</a></code> | <code>string</code> | Package's Homepage / Website. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.keywords">keywords</a></code> | <code>string[]</code> | Keywords to include in `package.json`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.license">license</a></code> | <code>string</code> | License's SPDX identifier. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.licensed">licensed</a></code> | <code>boolean</code> | Indicates if a license should be added. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.maxNodeVersion">maxNodeVersion</a></code> | <code>string</code> | The maximum node version supported by this package. Most projects should not use this option. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.minNodeVersion">minNodeVersion</a></code> | <code>string</code> | The minimum node version required by this package to function. Most projects should not use this option. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmAccess">npmAccess</a></code> | <code>projen.javascript.NpmAccess</code> | Access level of the npm package. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmProvenance">npmProvenance</a></code> | <code>boolean</code> | Should provenance statements be generated when the package is published. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmRegistry">npmRegistry</a></code> | <code>string</code> | The host name of the npm registry to publish to. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmRegistryUrl">npmRegistryUrl</a></code> | <code>string</code> | The base URL of the npm package registry. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmTokenSecret">npmTokenSecret</a></code> | <code>string</code> | GitHub secret which contains the NPM token to use when publishing packages. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmTrustedPublishing">npmTrustedPublishing</a></code> | <code>boolean</code> | Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.packageManager">packageManager</a></code> | <code>projen.javascript.NodePackageManager</code> | The Node Package Manager used to execute scripts. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.packageName">packageName</a></code> | <code>string</code> | The "name" in package.json. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.peerDependencyOptions">peerDependencyOptions</a></code> | <code>projen.javascript.PeerDependencyOptions</code> | Options for `peerDeps`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.peerDeps">peerDeps</a></code> | <code>string[]</code> | Peer dependencies for this module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pnpmVersion">pnpmVersion</a></code> | <code>string</code> | The version of PNPM to use if using PNPM as a package manager. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.repository">repository</a></code> | <code>string</code> | The repository is the location where the actual code for your package lives. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.repositoryDirectory">repositoryDirectory</a></code> | <code>string</code> | If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.scopedPackagesOptions">scopedPackagesOptions</a></code> | <code>projen.javascript.ScopedPackagesOptions[]</code> | Options for privately hosted scoped packages. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.scripts">scripts</a></code> | <code>{[ key: string ]: string}</code> | npm scripts to include. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.stability">stability</a></code> | <code>string</code> | Package's Stability. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.yarnBerryOptions">yarnBerryOptions</a></code> | <code>projen.javascript.YarnBerryOptions</code> | Options for Yarn Berry. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bumpPackage">bumpPackage</a></code> | <code>string</code> | The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jsiiReleaseVersion">jsiiReleaseVersion</a></code> | <code>string</code> | Version requirement of `publib` which is used to publish modules to npm. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | Major version to release from the default branch. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.minMajorVersion">minMajorVersion</a></code> | <code>number</code> | Minimal Major version to release. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.nextVersionCommand">nextVersionCommand</a></code> | <code>string</code> | A shell command to control the next version to release. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmDistTag">npmDistTag</a></code> | <code>string</code> | The npmDistTag to use when publishing from the default branch. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.postBuildSteps">postBuildSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Steps to execute after build as part of the release workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prerelease">prerelease</a></code> | <code>string</code> | Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre"). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.publishDryRun">publishDryRun</a></code> | <code>boolean</code> | Instead of actually publishing to package managers, just print the publishing command. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.publishTasks">publishTasks</a></code> | <code>boolean</code> | Define publishing tasks that can be executed manually as well as workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releasableCommits">releasableCommits</a></code> | <code>projen.ReleasableCommits</code> | Find commits that should be considered releasable Used to decide if a release is required. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseBranches">releaseBranches</a></code> | <code>{[ key: string ]: projen.release.BranchOptions}</code> | Defines additional release branches. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseEnvironment">releaseEnvironment</a></code> | <code>string</code> | The GitHub Actions environment used for the release. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseEveryCommit">releaseEveryCommit</a></code> | <code>boolean</code> | Automatically release new versions every commit to one of branches in `releaseBranches`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseFailureIssue">releaseFailureIssue</a></code> | <code>boolean</code> | Create a github issue on every failed publishing task. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseFailureIssueLabel">releaseFailureIssueLabel</a></code> | <code>string</code> | The label to apply to issues indicating publish failures. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseSchedule">releaseSchedule</a></code> | <code>string</code> | CRON schedule to trigger new releases. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseTagPrefix">releaseTagPrefix</a></code> | <code>string</code> | Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseTrigger">releaseTrigger</a></code> | <code>projen.release.ReleaseTrigger</code> | The release trigger to use. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowEnv">releaseWorkflowEnv</a></code> | <code>{[ key: string ]: string}</code> | Build environment variables for release workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowName">releaseWorkflowName</a></code> | <code>string</code> | The name of the default release workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowSetupSteps">releaseWorkflowSetupSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | A set of workflow steps to execute in order to setup the workflow container. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.versionrcOptions">versionrcOptions</a></code> | <code>{[ key: string ]: any}</code> | Custom configuration used when creating changelog with commit-and-tag-version package. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowContainerImage">workflowContainerImage</a></code> | <code>string</code> | Container image to use for GitHub workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowRunsOn">workflowRunsOn</a></code> | <code>string[]</code> | Github Runner selection labels. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowRunsOnGroup">workflowRunsOnGroup</a></code> | <code>projen.GroupRunnerOptions</code> | Github Runner Group selection options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.defaultReleaseBranch">defaultReleaseBranch</a></code> | <code>string</code> | The name of the main release branch. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.artifactsDirectory">artifactsDirectory</a></code> | <code>string</code> | A directory which will contain build artifacts. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.auditDeps">auditDeps</a></code> | <code>boolean</code> | Run security audit on dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.auditDepsOptions">auditDepsOptions</a></code> | <code>projen.javascript.AuditOptions</code> | Security audit options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoApproveUpgrades">autoApproveUpgrades</a></code> | <code>boolean</code> | Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.biome">biome</a></code> | <code>boolean</code> | Setup Biome. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.biomeOptions">biomeOptions</a></code> | <code>projen.javascript.BiomeOptions</code> | Biome options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflow">buildWorkflow</a></code> | <code>boolean</code> | Define a GitHub workflow for building PRs. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflowOptions">buildWorkflowOptions</a></code> | <code>projen.javascript.BuildWorkflowOptions</code> | Options for PR build workflow. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflowTriggers">buildWorkflowTriggers</a></code> | <code>projen.github.workflows.Triggers</code> | Build workflow triggers. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bundlerOptions">bundlerOptions</a></code> | <code>projen.javascript.BundlerOptions</code> | Options for `Bundler`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.checkLicenses">checkLicenses</a></code> | <code>projen.javascript.LicenseCheckerOptions</code> | Configure which licenses should be deemed acceptable for use by dependencies. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeCov">codeCov</a></code> | <code>boolean</code> | Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeCovTokenSecret">codeCovTokenSecret</a></code> | <code>string</code> | Define the secret name for a specified https://codecov.io/ token. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.copyrightOwner">copyrightOwner</a></code> | <code>string</code> | License copyright owner. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.copyrightPeriod">copyrightPeriod</a></code> | <code>string</code> | The copyright years to put in the LICENSE file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.dependabot">dependabot</a></code> | <code>boolean</code> | Use dependabot to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.dependabotOptions">dependabotOptions</a></code> | <code>projen.github.DependabotOptions</code> | Options for dependabot. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.depsUpgrade">depsUpgrade</a></code> | <code>boolean</code> | Use tasks and github workflows to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.depsUpgradeOptions">depsUpgradeOptions</a></code> | <code>projen.javascript.UpgradeDependenciesOptions</code> | Options for `UpgradeDependencies`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitignore">gitignore</a></code> | <code>string[]</code> | Additional entries to .gitignore. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jest">jest</a></code> | <code>boolean</code> | Setup jest unit tests. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jestOptions">jestOptions</a></code> | <code>projen.javascript.JestOptions</code> | Jest options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mutableBuild">mutableBuild</a></code> | <code>boolean</code> | Automatically update files modified during builds to pull-request branches. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmignore">npmignore</a></code> | <code>string[]</code> | Additional entries to .npmignore. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmignoreEnabled">npmignoreEnabled</a></code> | <code>boolean</code> | Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmIgnoreOptions">npmIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .npmignore file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.package">package</a></code> | <code>boolean</code> | Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prettier">prettier</a></code> | <code>boolean</code> | Setup prettier. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prettierOptions">prettierOptions</a></code> | <code>projen.javascript.PrettierOptions</code> | Prettier options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenDevDependency">projenDevDependency</a></code> | <code>boolean</code> | Indicates of "projen" should be installed as a devDependency. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJs">projenrcJs</a></code> | <code>boolean</code> | Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJsOptions">projenrcJsOptions</a></code> | <code>projen.javascript.ProjenrcOptions</code> | Options for .projenrc.js. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenVersion">projenVersion</a></code> | <code>string</code> | Version of projen to install. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Include a GitHub pull request template. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pullRequestTemplateContents">pullRequestTemplateContents</a></code> | <code>string[]</code> | The contents of the pull request template. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.release">release</a></code> | <code>boolean</code> | Add release management to this project. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseToNpm">releaseToNpm</a></code> | <code>boolean</code> | Automatically release to npm when new versions are introduced. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflow">releaseWorkflow</a></code> | <code>boolean</code> | DEPRECATED: renamed to `release`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowBootstrapSteps">workflowBootstrapSteps</a></code> | <code>projen.github.workflows.JobStep[]</code> | Workflow steps to use in order to bootstrap this repo. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowGitIdentity">workflowGitIdentity</a></code> | <code>projen.github.GitIdentity</code> | The git identity to use in workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowNodeVersion">workflowNodeVersion</a></code> | <code>string</code> | The node version used in GitHub Actions workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowPackageCache">workflowPackageCache</a></code> | <code>boolean</code> | Enable Node.js package cache in GitHub workflows. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.disableTsconfig">disableTsconfig</a></code> | <code>boolean</code> | Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.disableTsconfigDev">disableTsconfigDev</a></code> | <code>boolean</code> | Do not generate a `tsconfig.dev.json` file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.docgen">docgen</a></code> | <code>boolean</code> | Docgen by Typedoc. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.docsDirectory">docsDirectory</a></code> | <code>string</code> | Docs directory. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.entrypointTypes">entrypointTypes</a></code> | <code>string</code> | The .d.ts file that includes the type declarations for this module. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.eslint">eslint</a></code> | <code>boolean</code> | Setup eslint. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.eslintOptions">eslintOptions</a></code> | <code>projen.javascript.EslintOptions</code> | Eslint options. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.libdir">libdir</a></code> | <code>string</code> | Typescript  artifacts output directory. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcTs">projenrcTs</a></code> | <code>boolean</code> | Use TypeScript for your projenrc file (`.projenrc.ts`). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcTsOptions">projenrcTsOptions</a></code> | <code>projen.typescript.ProjenrcOptions</code> | Options for .projenrc.ts. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.sampleCode">sampleCode</a></code> | <code>boolean</code> | Generate one-time sample in `src/` and `test/` if there are no files there. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.srcdir">srcdir</a></code> | <code>string</code> | Typescript sources directory. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.testdir">testdir</a></code> | <code>string</code> | Jest tests directory. Tests files should be named `xxx.test.ts`. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfig">tsconfig</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom TSConfig. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfigDev">tsconfigDev</a></code> | <code>projen.javascript.TypescriptConfigOptions</code> | Custom tsconfig options for the development tsconfig.json file (used for testing). |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfigDevFile">tsconfigDevFile</a></code> | <code>string</code> | The name of the development tsconfig.json file. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsJestOptions">tsJestOptions</a></code> | <code>projen.typescript.TsJestOptions</code> | Options for ts-jest. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.typescriptVersion">typescriptVersion</a></code> | <code>string</code> | TypeScript version to use. |
| <code><a href="#@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.extensionTypes">extensionTypes</a></code> | <code><a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]</code> | The type of Directus extension. |

---

##### ~~`name`~~<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.name"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### ~~`commitGenerated`~~<sup>Optional</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.commitGenerated"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### ~~`gitIgnoreOptions`~~<sup>Optional</sup> <a name="gitIgnoreOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitIgnoreOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### ~~`gitOptions`~~<sup>Optional</sup> <a name="gitOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### ~~`logging`~~<sup>Optional</sup> <a name="logging" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.logging"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### ~~`outdir`~~<sup>Optional</sup> <a name="outdir" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.outdir"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### ~~`parent`~~<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.parent"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### ~~`projectTree`~~<sup>Optional</sup> <a name="projectTree" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projectTree"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### ~~`projenCommand`~~<sup>Optional</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenCommand"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### ~~`projenrcJson`~~<sup>Optional</sup> <a name="projenrcJson" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJson"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### ~~`projenrcJsonOptions`~~<sup>Optional</sup> <a name="projenrcJsonOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJsonOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### ~~`renovatebot`~~<sup>Optional</sup> <a name="renovatebot" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.renovatebot"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### ~~`renovatebotOptions`~~<sup>Optional</sup> <a name="renovatebotOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.renovatebotOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---

##### ~~`autoApproveOptions`~~<sup>Optional</sup> <a name="autoApproveOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoApproveOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoApproveOptions: AutoApproveOptions;
```

- *Type:* projen.github.AutoApproveOptions
- *Default:* auto approve is disabled

Enable and configure the 'auto approve' workflow.

---

##### ~~`autoMerge`~~<sup>Optional</sup> <a name="autoMerge" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoMerge"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoMerge: boolean;
```

- *Type:* boolean
- *Default:* true

Enable automatic merging on GitHub.

Has no effect if `github.mergify`
is set to false.

---

##### ~~`autoMergeOptions`~~<sup>Optional</sup> <a name="autoMergeOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoMergeOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoMergeOptions: AutoMergeOptions;
```

- *Type:* projen.github.AutoMergeOptions
- *Default:* see defaults in `AutoMergeOptions`

Configure options for automatic merging on GitHub.

Has no effect if
`github.mergify` or `autoMerge` is set to false.

---

##### ~~`clobber`~~<sup>Optional</sup> <a name="clobber" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.clobber"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly clobber: boolean;
```

- *Type:* boolean
- *Default:* true, but false for subprojects

Add a `clobber` task which resets the repo to origin.

---

##### ~~`devContainer`~~<sup>Optional</sup> <a name="devContainer" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.devContainer"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly devContainer: boolean;
```

- *Type:* boolean
- *Default:* false

Add a VSCode development environment (used for GitHub Codespaces).

---

##### ~~`github`~~<sup>Optional</sup> <a name="github" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.github"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly github: boolean;
```

- *Type:* boolean
- *Default:* true

Enable GitHub integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### ~~`githubOptions`~~<sup>Optional</sup> <a name="githubOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.githubOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly githubOptions: GitHubOptions;
```

- *Type:* projen.github.GitHubOptions
- *Default:* see GitHubOptions

Options for GitHub integration.

---

##### ~~`gitpod`~~<sup>Optional</sup> <a name="gitpod" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitpod"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitpod: boolean;
```

- *Type:* boolean
- *Default:* false

Add a Gitpod development environment.

---

##### ~~`mergify`~~<sup>Optional</sup> <a name="mergify" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mergify"></a>

- *Deprecated:* use `githubOptions.mergify` instead

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### ~~`mergifyOptions`~~<sup>Optional</sup> <a name="mergifyOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mergifyOptions"></a>

- *Deprecated:* use `githubOptions.mergifyOptions` instead

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for mergify.

---

##### ~~`projectType`~~<sup>Optional</sup> <a name="projectType" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projectType"></a>

- *Deprecated:* no longer supported at the base project level

```typescript
public readonly projectType: ProjectType;
```

- *Type:* projen.ProjectType
- *Default:* ProjectType.UNKNOWN

Which type of project this is (library/app).

---

##### ~~`projenCredentials`~~<sup>Optional</sup> <a name="projenCredentials" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenCredentials"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenTokenSecret"></a>

- *Deprecated:* use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### ~~`readme`~~<sup>Optional</sup> <a name="readme" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.readme"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly readme: SampleReadmeProps;
```

- *Type:* projen.SampleReadmeProps
- *Default:* { filename: 'README.md', contents: '# replace this' }

The README setup.

---

*Example*

```typescript
"{ filename: 'readme.md', contents: '# title' }"
```


##### ~~`stale`~~<sup>Optional</sup> <a name="stale" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.stale"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly stale: boolean;
```

- *Type:* boolean
- *Default:* false

Auto-close of stale issues and pull request.

See `staleOptions` for options.

---

##### ~~`staleOptions`~~<sup>Optional</sup> <a name="staleOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.staleOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly staleOptions: StaleOptions;
```

- *Type:* projen.github.StaleOptions
- *Default:* see defaults in `StaleOptions`

Auto-close stale issues and pull requests.

To disable set `stale` to `false`.

---

##### ~~`vscode`~~<sup>Optional</sup> <a name="vscode" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.vscode"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly vscode: boolean;
```

- *Type:* boolean
- *Default:* true

Enable VSCode integration.

Enabled by default for root projects. Disabled for non-root projects.

---

##### ~~`allowLibraryDependencies`~~<sup>Optional</sup> <a name="allowLibraryDependencies" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.allowLibraryDependencies"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly allowLibraryDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Allow the project to include `peerDependencies` and `bundledDependencies`.

This is normally only allowed for libraries. For apps, there's no meaning
for specifying these.

---

##### ~~`authorEmail`~~<sup>Optional</sup> <a name="authorEmail" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorEmail"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly authorEmail: string;
```

- *Type:* string

Author's e-mail.

---

##### ~~`authorName`~~<sup>Optional</sup> <a name="authorName" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorName"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly authorName: string;
```

- *Type:* string

Author's name.

---

##### ~~`authorOrganization`~~<sup>Optional</sup> <a name="authorOrganization" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorOrganization"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly authorOrganization: boolean;
```

- *Type:* boolean

Is the author an organization.

---

##### ~~`authorUrl`~~<sup>Optional</sup> <a name="authorUrl" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.authorUrl"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly authorUrl: string;
```

- *Type:* string

Author's URL / Website.

---

##### ~~`autoDetectBin`~~<sup>Optional</sup> <a name="autoDetectBin" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoDetectBin"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoDetectBin: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically add all executables under the `bin` directory to your `package.json` file under the `bin` section.

---

##### ~~`bin`~~<sup>Optional</sup> <a name="bin" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bin"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bin: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Binary programs vended with your module.

You can use this option to add/customize how binaries are represented in
your `package.json`, but unless `autoDetectBin` is `false`, every
executable file under `bin` will automatically be added to this section.

---

##### ~~`bugsEmail`~~<sup>Optional</sup> <a name="bugsEmail" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bugsEmail"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bugsEmail: string;
```

- *Type:* string

The email address to which issues should be reported.

---

##### ~~`bugsUrl`~~<sup>Optional</sup> <a name="bugsUrl" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bugsUrl"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bugsUrl: string;
```

- *Type:* string

The url to your project's issue tracker.

---

##### ~~`bundledDeps`~~<sup>Optional</sup> <a name="bundledDeps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bundledDeps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bundledDeps: string[];
```

- *Type:* string[]

List of dependencies to bundle into this module.

These modules will be
added both to the `dependencies` section and `bundledDependencies` section of
your `package.json`.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

##### ~~`bunVersion`~~<sup>Optional</sup> <a name="bunVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bunVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bunVersion: string;
```

- *Type:* string
- *Default:* "latest"

The version of Bun to use if using Bun as a package manager.

---

##### ~~`codeArtifactOptions`~~<sup>Optional</sup> <a name="codeArtifactOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeArtifactOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly codeArtifactOptions: CodeArtifactOptions;
```

- *Type:* projen.javascript.CodeArtifactOptions
- *Default:* undefined

Options for npm packages using AWS CodeArtifact.

This is required if publishing packages to, or installing scoped packages from AWS CodeArtifact

---

##### ~~`deps`~~<sup>Optional</sup> <a name="deps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.deps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly deps: string[];
```

- *Type:* string[]
- *Default:* []

Runtime dependencies of this module.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'express', 'lodash', 'foo@^2' ]
```


##### ~~`description`~~<sup>Optional</sup> <a name="description" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.description"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly description: string;
```

- *Type:* string

The description is just a string that helps people understand the purpose of the package.

It can be used when searching for packages in a package manager as well.
See https://classic.yarnpkg.com/en/docs/package-json/#toc-description

---

##### ~~`devDeps`~~<sup>Optional</sup> <a name="devDeps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.devDeps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly devDeps: string[];
```

- *Type:* string[]
- *Default:* []

Build dependencies for this module.

These dependencies will only be
available in your build environment but will not be fetched when this
module is consumed.

The recommendation is to only specify the module name here (e.g.
`express`). This will behave similar to `yarn add` or `npm install` in the
sense that it will add the module as a dependency to your `package.json`
file with the latest version (`^`). You can specify semver requirements in
the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
this will be what you `package.json` will eventually include.

---

*Example*

```typescript
[ 'typescript', '@types/express' ]
```


##### ~~`entrypoint`~~<sup>Optional</sup> <a name="entrypoint" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.entrypoint"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly entrypoint: string;
```

- *Type:* string
- *Default:* "lib/index.js"

Module entrypoint (`main` in `package.json`).

Set to an empty string to not include `main` in your package.json

---

##### ~~`homepage`~~<sup>Optional</sup> <a name="homepage" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.homepage"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly homepage: string;
```

- *Type:* string

Package's Homepage / Website.

---

##### ~~`keywords`~~<sup>Optional</sup> <a name="keywords" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.keywords"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly keywords: string[];
```

- *Type:* string[]

Keywords to include in `package.json`.

---

##### ~~`license`~~<sup>Optional</sup> <a name="license" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.license"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly license: string;
```

- *Type:* string
- *Default:* "Apache-2.0"

License's SPDX identifier.

See https://github.com/projen/projen/tree/main/license-text for a list of supported licenses.
Use the `licensed` option if you want to no license to be specified.

---

##### ~~`licensed`~~<sup>Optional</sup> <a name="licensed" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.licensed"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly licensed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates if a license should be added.

---

##### ~~`maxNodeVersion`~~<sup>Optional</sup> <a name="maxNodeVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.maxNodeVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly maxNodeVersion: string;
```

- *Type:* string
- *Default:* no maximum version is enforced

The maximum node version supported by this package. Most projects should not use this option.

The value indicates that the package is incompatible with any newer versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option.
Consider this option only if your package is known to not function with newer versions of node.

---

##### ~~`minNodeVersion`~~<sup>Optional</sup> <a name="minNodeVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.minNodeVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly minNodeVersion: string;
```

- *Type:* string
- *Default:* no minimum version is enforced

The minimum node version required by this package to function. Most projects should not use this option.

The value indicates that the package is incompatible with any older versions of node.
This requirement is enforced via the engines field.

You will normally not need to set this option, even if your package is incompatible with EOL versions of node.
Consider this option only if your package depends on a specific feature, that is not available in other LTS versions.
Setting this option has very high impact on the consumers of your package,
as package managers will actively prevent usage with node versions you have marked as incompatible.

To change the node version of your CI/CD workflows, use `workflowNodeVersion`.

---

##### ~~`npmAccess`~~<sup>Optional</sup> <a name="npmAccess" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmAccess"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmAccess: NpmAccess;
```

- *Type:* projen.javascript.NpmAccess
- *Default:* for scoped packages (e.g. `foo@bar`), the default is `NpmAccess.RESTRICTED`, for non-scoped packages, the default is `NpmAccess.PUBLIC`.

Access level of the npm package.

---

##### ~~`npmProvenance`~~<sup>Optional</sup> <a name="npmProvenance" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmProvenance"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmProvenance: boolean;
```

- *Type:* boolean
- *Default:* true for public packages, false otherwise

Should provenance statements be generated when the package is published.

A supported package manager is required to publish a package with npm provenance statements and
you will need to use a supported CI/CD provider.

Note that the projen `Release` and `Publisher` components are using `publib` to publish packages,
which is using npm internally and supports provenance statements independently of the package manager used.

> [https://docs.npmjs.com/generating-provenance-statements](https://docs.npmjs.com/generating-provenance-statements)

---

##### ~~`npmRegistry`~~<sup>Optional</sup> <a name="npmRegistry" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmRegistry"></a>

- *Deprecated:* use `npmRegistryUrl` instead

```typescript
public readonly npmRegistry: string;
```

- *Type:* string

The host name of the npm registry to publish to.

Cannot be set together with `npmRegistryUrl`.

---

##### ~~`npmRegistryUrl`~~<sup>Optional</sup> <a name="npmRegistryUrl" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmRegistryUrl"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmRegistryUrl: string;
```

- *Type:* string
- *Default:* "https://registry.npmjs.org"

The base URL of the npm package registry.

Must be a URL (e.g. start with "https://" or "http://")

---

##### ~~`npmTokenSecret`~~<sup>Optional</sup> <a name="npmTokenSecret" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmTokenSecret"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmTokenSecret: string;
```

- *Type:* string
- *Default:* "NPM_TOKEN"

GitHub secret which contains the NPM token to use when publishing packages.

---

##### ~~`npmTrustedPublishing`~~<sup>Optional</sup> <a name="npmTrustedPublishing" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmTrustedPublishing"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmTrustedPublishing: boolean;
```

- *Type:* boolean
- *Default:* false

Use trusted publishing for publishing to npmjs.com Needs to be pre-configured on npm.js to work.

---

##### ~~`packageManager`~~<sup>Optional</sup> <a name="packageManager" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.packageManager"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly packageManager: NodePackageManager;
```

- *Type:* projen.javascript.NodePackageManager
- *Default:* NodePackageManager.YARN_CLASSIC

The Node Package Manager used to execute scripts.

---

##### ~~`packageName`~~<sup>Optional</sup> <a name="packageName" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.packageName"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly packageName: string;
```

- *Type:* string
- *Default:* defaults to project name

The "name" in package.json.

---

##### ~~`peerDependencyOptions`~~<sup>Optional</sup> <a name="peerDependencyOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.peerDependencyOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly peerDependencyOptions: PeerDependencyOptions;
```

- *Type:* projen.javascript.PeerDependencyOptions

Options for `peerDeps`.

---

##### ~~`peerDeps`~~<sup>Optional</sup> <a name="peerDeps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.peerDeps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly peerDeps: string[];
```

- *Type:* string[]
- *Default:* []

Peer dependencies for this module.

Dependencies listed here are required to
be installed (and satisfied) by the _consumer_ of this library. Using peer
dependencies allows you to ensure that only a single module of a certain
library exists in the `node_modules` tree of your consumers.

Note that prior to npm@7, peer dependencies are _not_ automatically
installed, which means that adding peer dependencies to a library will be a
breaking change for your customers.

Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
enabled by default), projen will automatically add a dev dependency with a
pinned version for each peer dependency. This will ensure that you build &
test your module against the lowest peer version required.

---

##### ~~`pnpmVersion`~~<sup>Optional</sup> <a name="pnpmVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pnpmVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly pnpmVersion: string;
```

- *Type:* string
- *Default:* "9"

The version of PNPM to use if using PNPM as a package manager.

---

##### ~~`repository`~~<sup>Optional</sup> <a name="repository" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.repository"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly repository: string;
```

- *Type:* string

The repository is the location where the actual code for your package lives.

See https://classic.yarnpkg.com/en/docs/package-json/#toc-repository

---

##### ~~`repositoryDirectory`~~<sup>Optional</sup> <a name="repositoryDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.repositoryDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly repositoryDirectory: string;
```

- *Type:* string

If the package.json for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives.

---

##### ~~`scopedPackagesOptions`~~<sup>Optional</sup> <a name="scopedPackagesOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.scopedPackagesOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly scopedPackagesOptions: ScopedPackagesOptions[];
```

- *Type:* projen.javascript.ScopedPackagesOptions[]
- *Default:* fetch all scoped packages from the public npm registry

Options for privately hosted scoped packages.

---

##### ~~`scripts`~~<sup>Optional</sup> <a name="scripts" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.scripts"></a>

- *Deprecated:* use `project.addTask()` or `package.setScript()`

```typescript
public readonly scripts: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

npm scripts to include.

If a script has the same name as a standard script,
the standard script will be overwritten.
Also adds the script as a task.

---

##### ~~`stability`~~<sup>Optional</sup> <a name="stability" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.stability"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly stability: string;
```

- *Type:* string

Package's Stability.

---

##### ~~`yarnBerryOptions`~~<sup>Optional</sup> <a name="yarnBerryOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.yarnBerryOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly yarnBerryOptions: YarnBerryOptions;
```

- *Type:* projen.javascript.YarnBerryOptions
- *Default:* Yarn Berry v4 with all default options

Options for Yarn Berry.

---

##### ~~`bumpPackage`~~<sup>Optional</sup> <a name="bumpPackage" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bumpPackage"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bumpPackage: string;
```

- *Type:* string
- *Default:* A recent version of "commit-and-tag-version"

The `commit-and-tag-version` compatible package used to bump the package version, as a dependency string.

This can be any compatible package version, including the deprecated `standard-version@9`.

---

##### ~~`jsiiReleaseVersion`~~<sup>Optional</sup> <a name="jsiiReleaseVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jsiiReleaseVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly jsiiReleaseVersion: string;
```

- *Type:* string
- *Default:* "latest"

Version requirement of `publib` which is used to publish modules to npm.

---

##### ~~`majorVersion`~~<sup>Optional</sup> <a name="majorVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.majorVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* Major version is not enforced.

Major version to release from the default branch.

If this is specified, we bump the latest version of this major version line.
If not specified, we bump the global latest version.

---

##### ~~`minMajorVersion`~~<sup>Optional</sup> <a name="minMajorVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.minMajorVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly minMajorVersion: number;
```

- *Type:* number
- *Default:* No minimum version is being enforced

Minimal Major version to release.

This can be useful to set to 1, as breaking changes before the 1.x major
release are not incrementing the major version number.

Can not be set together with `majorVersion`.

---

##### ~~`nextVersionCommand`~~<sup>Optional</sup> <a name="nextVersionCommand" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.nextVersionCommand"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly nextVersionCommand: string;
```

- *Type:* string
- *Default:* The next version will be determined based on the commit history and project settings.

A shell command to control the next version to release.

If present, this shell command will be run before the bump is executed, and
it determines what version to release. It will be executed in the following
environment:

- Working directory: the project directory.
- `$VERSION`: the current version. Looks like `1.2.3`.
- `$LATEST_TAG`: the most recent tag. Looks like `prefix-v1.2.3`, or may be unset.
- `$SUGGESTED_BUMP`: the suggested bump action based on commits. One of `major|minor|patch|none`.

The command should print one of the following to `stdout`:

- Nothing: the next version number will be determined based on commit history.
- `x.y.z`: the next version number will be `x.y.z`.
- `major|minor|patch`: the next version number will be the current version number
  with the indicated component bumped.

This setting cannot be specified together with `minMajorVersion`; the invoked
script can be used to achieve the effects of `minMajorVersion`.

---

##### ~~`npmDistTag`~~<sup>Optional</sup> <a name="npmDistTag" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmDistTag"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmDistTag: string;
```

- *Type:* string
- *Default:* "latest"

The npmDistTag to use when publishing from the default branch.

To set the npm dist-tag for release branches, set the `npmDistTag` property
for each branch.

---

##### ~~`postBuildSteps`~~<sup>Optional</sup> <a name="postBuildSteps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.postBuildSteps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* []

Steps to execute after build as part of the release workflow.

---

##### ~~`prerelease`~~<sup>Optional</sup> <a name="prerelease" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prerelease"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly prerelease: string;
```

- *Type:* string
- *Default:* normal semantic versions

Bump versions from the default branch as pre-releases (e.g. "beta", "alpha", "pre").

---

##### ~~`publishDryRun`~~<sup>Optional</sup> <a name="publishDryRun" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.publishDryRun"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly publishDryRun: boolean;
```

- *Type:* boolean
- *Default:* false

Instead of actually publishing to package managers, just print the publishing command.

---

##### ~~`publishTasks`~~<sup>Optional</sup> <a name="publishTasks" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.publishTasks"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly publishTasks: boolean;
```

- *Type:* boolean
- *Default:* false

Define publishing tasks that can be executed manually as well as workflows.

Normally, publishing only happens within automated workflows. Enable this
in order to create a publishing task for each publishing activity.

---

##### ~~`releasableCommits`~~<sup>Optional</sup> <a name="releasableCommits" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releasableCommits"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releasableCommits: ReleasableCommits;
```

- *Type:* projen.ReleasableCommits
- *Default:* ReleasableCommits.everyCommit()

Find commits that should be considered releasable Used to decide if a release is required.

---

##### ~~`releaseBranches`~~<sup>Optional</sup> <a name="releaseBranches" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseBranches"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseBranches: {[ key: string ]: BranchOptions};
```

- *Type:* {[ key: string ]: projen.release.BranchOptions}
- *Default:* no additional branches are used for release. you can use `addBranch()` to add additional branches.

Defines additional release branches.

A workflow will be created for each
release branch which will publish releases from commits in this branch.
Each release branch _must_ be assigned a major version number which is used
to enforce that versions published from that branch always use that major
version. If multiple branches are used, the `majorVersion` field must also
be provided for the default branch.

---

##### ~~`releaseEnvironment`~~<sup>Optional</sup> <a name="releaseEnvironment" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseEnvironment"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseEnvironment: string;
```

- *Type:* string
- *Default:* no environment used, unless set at the artifact level

The GitHub Actions environment used for the release.

This can be used to add an explicit approval step to the release
or limit who can initiate a release through environment protection rules.

When multiple artifacts are released, the environment can be overwritten
on a per artifact basis.

---

##### ~~`releaseEveryCommit`~~<sup>Optional</sup> <a name="releaseEveryCommit" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseEveryCommit"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.continuous()` instead

```typescript
public readonly releaseEveryCommit: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically release new versions every commit to one of branches in `releaseBranches`.

---

##### ~~`releaseFailureIssue`~~<sup>Optional</sup> <a name="releaseFailureIssue" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseFailureIssue"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseFailureIssue: boolean;
```

- *Type:* boolean
- *Default:* false

Create a github issue on every failed publishing task.

---

##### ~~`releaseFailureIssueLabel`~~<sup>Optional</sup> <a name="releaseFailureIssueLabel" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseFailureIssueLabel"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseFailureIssueLabel: string;
```

- *Type:* string
- *Default:* "failed-release"

The label to apply to issues indicating publish failures.

Only applies if `releaseFailureIssue` is true.

---

##### ~~`releaseSchedule`~~<sup>Optional</sup> <a name="releaseSchedule" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseSchedule"></a>

- *Deprecated:* Use `releaseTrigger: ReleaseTrigger.scheduled()` instead

```typescript
public readonly releaseSchedule: string;
```

- *Type:* string
- *Default:* no scheduled releases

CRON schedule to trigger new releases.

---

##### ~~`releaseTagPrefix`~~<sup>Optional</sup> <a name="releaseTagPrefix" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseTagPrefix"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseTagPrefix: string;
```

- *Type:* string
- *Default:* "v"

Automatically add the given prefix to release tags. Useful if you are releasing on multiple branches with overlapping version numbers.

Note: this prefix is used to detect the latest tagged version
when bumping, so if you change this on a project with an existing version
history, you may need to manually tag your latest release
with the new prefix.

---

##### ~~`releaseTrigger`~~<sup>Optional</sup> <a name="releaseTrigger" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseTrigger"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseTrigger: ReleaseTrigger;
```

- *Type:* projen.release.ReleaseTrigger
- *Default:* Continuous releases (`ReleaseTrigger.continuous()`)

The release trigger to use.

---

##### ~~`releaseWorkflowEnv`~~<sup>Optional</sup> <a name="releaseWorkflowEnv" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowEnv"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseWorkflowEnv: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* {}

Build environment variables for release workflows.

---

##### ~~`releaseWorkflowName`~~<sup>Optional</sup> <a name="releaseWorkflowName" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowName"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseWorkflowName: string;
```

- *Type:* string
- *Default:* "release"

The name of the default release workflow.

---

##### ~~`releaseWorkflowSetupSteps`~~<sup>Optional</sup> <a name="releaseWorkflowSetupSteps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflowSetupSteps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseWorkflowSetupSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]

A set of workflow steps to execute in order to setup the workflow container.

---

##### ~~`versionrcOptions`~~<sup>Optional</sup> <a name="versionrcOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.versionrcOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly versionrcOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}
- *Default:* standard configuration applicable for GitHub repositories

Custom configuration used when creating changelog with commit-and-tag-version package.

Given values either append to default configuration or overwrite values in it.

---

##### ~~`workflowContainerImage`~~<sup>Optional</sup> <a name="workflowContainerImage" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowContainerImage"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowContainerImage: string;
```

- *Type:* string
- *Default:* default image

Container image to use for GitHub workflows.

---

##### ~~`workflowRunsOn`~~<sup>Optional</sup> <a name="workflowRunsOn" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowRunsOn"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowRunsOn: string[];
```

- *Type:* string[]
- *Default:* ["ubuntu-latest"]

Github Runner selection labels.

---

##### ~~`workflowRunsOnGroup`~~<sup>Optional</sup> <a name="workflowRunsOnGroup" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowRunsOnGroup"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowRunsOnGroup: GroupRunnerOptions;
```

- *Type:* projen.GroupRunnerOptions

Github Runner Group selection options.

---

##### ~~`defaultReleaseBranch`~~<sup>Required</sup> <a name="defaultReleaseBranch" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.defaultReleaseBranch"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly defaultReleaseBranch: string;
```

- *Type:* string
- *Default:* "main"

The name of the main release branch.

---

##### ~~`artifactsDirectory`~~<sup>Optional</sup> <a name="artifactsDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.artifactsDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly artifactsDirectory: string;
```

- *Type:* string
- *Default:* "dist"

A directory which will contain build artifacts.

---

##### ~~`auditDeps`~~<sup>Optional</sup> <a name="auditDeps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.auditDeps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly auditDeps: boolean;
```

- *Type:* boolean
- *Default:* false

Run security audit on dependencies.

When enabled, creates an "audit" task that checks for known security vulnerabilities
in dependencies. By default, runs during every build and checks for "high" severity
vulnerabilities or above in all dependencies (including dev dependencies).

---

##### ~~`auditDepsOptions`~~<sup>Optional</sup> <a name="auditDepsOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.auditDepsOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly auditDepsOptions: AuditOptions;
```

- *Type:* projen.javascript.AuditOptions
- *Default:* default options

Security audit options.

---

##### ~~`autoApproveUpgrades`~~<sup>Optional</sup> <a name="autoApproveUpgrades" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.autoApproveUpgrades"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly autoApproveUpgrades: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically approve deps upgrade PRs, allowing them to be merged by mergify (if configured).

Throw if set to true but `autoApproveOptions` are not defined.

---

##### ~~`biome`~~<sup>Optional</sup> <a name="biome" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.biome"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly biome: boolean;
```

- *Type:* boolean
- *Default:* false

Setup Biome.

---

##### ~~`biomeOptions`~~<sup>Optional</sup> <a name="biomeOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.biomeOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly biomeOptions: BiomeOptions;
```

- *Type:* projen.javascript.BiomeOptions
- *Default:* default options

Biome options.

---

##### ~~`buildWorkflow`~~<sup>Optional</sup> <a name="buildWorkflow" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflow"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly buildWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Define a GitHub workflow for building PRs.

---

##### ~~`buildWorkflowOptions`~~<sup>Optional</sup> <a name="buildWorkflowOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflowOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly buildWorkflowOptions: BuildWorkflowOptions;
```

- *Type:* projen.javascript.BuildWorkflowOptions

Options for PR build workflow.

---

##### ~~`buildWorkflowTriggers`~~<sup>Optional</sup> <a name="buildWorkflowTriggers" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.buildWorkflowTriggers"></a>

- *Deprecated:* - Use `buildWorkflowOptions.workflowTriggers`

```typescript
public readonly buildWorkflowTriggers: Triggers;
```

- *Type:* projen.github.workflows.Triggers
- *Default:* "{ pullRequest: {}, workflowDispatch: {} }"

Build workflow triggers.

---

##### ~~`bundlerOptions`~~<sup>Optional</sup> <a name="bundlerOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.bundlerOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly bundlerOptions: BundlerOptions;
```

- *Type:* projen.javascript.BundlerOptions

Options for `Bundler`.

---

##### ~~`checkLicenses`~~<sup>Optional</sup> <a name="checkLicenses" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.checkLicenses"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly checkLicenses: LicenseCheckerOptions;
```

- *Type:* projen.javascript.LicenseCheckerOptions
- *Default:* no license checks are run during the build and all licenses will be accepted

Configure which licenses should be deemed acceptable for use by dependencies.

This setting will cause the build to fail, if any prohibited or not allowed licenses ares encountered.

---

##### ~~`codeCov`~~<sup>Optional</sup> <a name="codeCov" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeCov"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly codeCov: boolean;
```

- *Type:* boolean
- *Default:* false

Define a GitHub workflow step for sending code coverage metrics to https://codecov.io/ Uses codecov/codecov-action@v5 By default, OIDC auth is used. Alternatively a token can be provided via `codeCovTokenSecret`.

---

##### ~~`codeCovTokenSecret`~~<sup>Optional</sup> <a name="codeCovTokenSecret" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.codeCovTokenSecret"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly codeCovTokenSecret: string;
```

- *Type:* string
- *Default:* OIDC auth is used

Define the secret name for a specified https://codecov.io/ token.

---

##### ~~`copyrightOwner`~~<sup>Optional</sup> <a name="copyrightOwner" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.copyrightOwner"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly copyrightOwner: string;
```

- *Type:* string
- *Default:* defaults to the value of authorName or "" if `authorName` is undefined.

License copyright owner.

---

##### ~~`copyrightPeriod`~~<sup>Optional</sup> <a name="copyrightPeriod" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.copyrightPeriod"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly copyrightPeriod: string;
```

- *Type:* string
- *Default:* current year

The copyright years to put in the LICENSE file.

---

##### ~~`dependabot`~~<sup>Optional</sup> <a name="dependabot" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.dependabot"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly dependabot: boolean;
```

- *Type:* boolean
- *Default:* false

Use dependabot to handle dependency upgrades.

Cannot be used in conjunction with `depsUpgrade`.

---

##### ~~`dependabotOptions`~~<sup>Optional</sup> <a name="dependabotOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.dependabotOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly dependabotOptions: DependabotOptions;
```

- *Type:* projen.github.DependabotOptions
- *Default:* default options

Options for dependabot.

---

##### ~~`depsUpgrade`~~<sup>Optional</sup> <a name="depsUpgrade" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.depsUpgrade"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly depsUpgrade: boolean;
```

- *Type:* boolean
- *Default:* `true` for root projects, `false` for subprojects

Use tasks and github workflows to handle dependency upgrades.

Cannot be used in conjunction with `dependabot`.

---

##### ~~`depsUpgradeOptions`~~<sup>Optional</sup> <a name="depsUpgradeOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.depsUpgradeOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly depsUpgradeOptions: UpgradeDependenciesOptions;
```

- *Type:* projen.javascript.UpgradeDependenciesOptions
- *Default:* default options

Options for `UpgradeDependencies`.

---

##### ~~`gitignore`~~<sup>Optional</sup> <a name="gitignore" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.gitignore"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly gitignore: string[];
```

- *Type:* string[]

Additional entries to .gitignore.

---

##### ~~`jest`~~<sup>Optional</sup> <a name="jest" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jest"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly jest: boolean;
```

- *Type:* boolean
- *Default:* true

Setup jest unit tests.

---

##### ~~`jestOptions`~~<sup>Optional</sup> <a name="jestOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.jestOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly jestOptions: JestOptions;
```

- *Type:* projen.javascript.JestOptions
- *Default:* default options

Jest options.

---

##### ~~`mutableBuild`~~<sup>Optional</sup> <a name="mutableBuild" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.mutableBuild"></a>

- *Deprecated:* - Use `buildWorkflowOptions.mutableBuild`

```typescript
public readonly mutableBuild: boolean;
```

- *Type:* boolean
- *Default:* true

Automatically update files modified during builds to pull-request branches.

This means
that any files synthesized by projen or e.g. test snapshots will always be up-to-date
before a PR is merged.

Implies that PR builds do not have anti-tamper checks.

---

##### ~~`npmignore`~~<sup>Optional</sup> <a name="npmignore" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmignore"></a>

- *Deprecated:* - use `project.addPackageIgnore`

```typescript
public readonly npmignore: string[];
```

- *Type:* string[]

Additional entries to .npmignore.

---

##### ~~`npmignoreEnabled`~~<sup>Optional</sup> <a name="npmignoreEnabled" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmignoreEnabled"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmignoreEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Defines an .npmignore file. Normally this is only needed for libraries that are packaged as tarballs.

---

##### ~~`npmIgnoreOptions`~~<sup>Optional</sup> <a name="npmIgnoreOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.npmIgnoreOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly npmIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .npmignore file.

---

##### ~~`package`~~<sup>Optional</sup> <a name="package" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.package"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly package: boolean;
```

- *Type:* boolean
- *Default:* true

Defines a `package` task that will produce an npm tarball under the artifacts directory (e.g. `dist`).

---

##### ~~`prettier`~~<sup>Optional</sup> <a name="prettier" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prettier"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly prettier: boolean;
```

- *Type:* boolean
- *Default:* false

Setup prettier.

---

##### ~~`prettierOptions`~~<sup>Optional</sup> <a name="prettierOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.prettierOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly prettierOptions: PrettierOptions;
```

- *Type:* projen.javascript.PrettierOptions
- *Default:* default options

Prettier options.

---

##### ~~`projenDevDependency`~~<sup>Optional</sup> <a name="projenDevDependency" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenDevDependency"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenDevDependency: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

Indicates of "projen" should be installed as a devDependency.

---

##### ~~`projenrcJs`~~<sup>Optional</sup> <a name="projenrcJs" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJs"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcJs: boolean;
```

- *Type:* boolean
- *Default:* true if projenrcJson is false

Generate (once) .projenrc.js (in JavaScript). Set to `false` in order to disable .projenrc.js generation.

---

##### ~~`projenrcJsOptions`~~<sup>Optional</sup> <a name="projenrcJsOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcJsOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcJsOptions: ProjenrcOptions;
```

- *Type:* projen.javascript.ProjenrcOptions
- *Default:* default options

Options for .projenrc.js.

---

##### ~~`projenVersion`~~<sup>Optional</sup> <a name="projenVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenVersion: string;
```

- *Type:* string
- *Default:* Defaults to the latest version.

Version of projen to install.

---

##### ~~`pullRequestTemplate`~~<sup>Optional</sup> <a name="pullRequestTemplate" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pullRequestTemplate"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Include a GitHub pull request template.

---

##### ~~`pullRequestTemplateContents`~~<sup>Optional</sup> <a name="pullRequestTemplateContents" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.pullRequestTemplateContents"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly pullRequestTemplateContents: string[];
```

- *Type:* string[]
- *Default:* default content

The contents of the pull request template.

---

##### ~~`release`~~<sup>Optional</sup> <a name="release" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.release"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly release: boolean;
```

- *Type:* boolean
- *Default:* true (false for subprojects)

Add release management to this project.

---

##### ~~`releaseToNpm`~~<sup>Optional</sup> <a name="releaseToNpm" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseToNpm"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly releaseToNpm: boolean;
```

- *Type:* boolean
- *Default:* false

Automatically release to npm when new versions are introduced.

---

##### ~~`releaseWorkflow`~~<sup>Optional</sup> <a name="releaseWorkflow" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.releaseWorkflow"></a>

- *Deprecated:* see `release`.

```typescript
public readonly releaseWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true if not a subproject

DEPRECATED: renamed to `release`.

---

##### ~~`workflowBootstrapSteps`~~<sup>Optional</sup> <a name="workflowBootstrapSteps" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowBootstrapSteps"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowBootstrapSteps: JobStep[];
```

- *Type:* projen.github.workflows.JobStep[]
- *Default:* "yarn install --frozen-lockfile && yarn projen"

Workflow steps to use in order to bootstrap this repo.

---

##### ~~`workflowGitIdentity`~~<sup>Optional</sup> <a name="workflowGitIdentity" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowGitIdentity"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowGitIdentity: GitIdentity;
```

- *Type:* projen.github.GitIdentity
- *Default:* default GitHub Actions user

The git identity to use in workflows.

---

##### ~~`workflowNodeVersion`~~<sup>Optional</sup> <a name="workflowNodeVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowNodeVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowNodeVersion: string;
```

- *Type:* string
- *Default:* `minNodeVersion` if set, otherwise `lts/*`.

The node version used in GitHub Actions workflows.

Always use this option if your GitHub Actions workflows require a specific to run.

---

##### ~~`workflowPackageCache`~~<sup>Optional</sup> <a name="workflowPackageCache" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.workflowPackageCache"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly workflowPackageCache: boolean;
```

- *Type:* boolean
- *Default:* false

Enable Node.js package cache in GitHub workflows.

---

##### ~~`disableTsconfig`~~<sup>Optional</sup> <a name="disableTsconfig" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.disableTsconfig"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly disableTsconfig: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.json` file (used by jsii projects since tsconfig.json is generated by the jsii compiler).

---

##### ~~`disableTsconfigDev`~~<sup>Optional</sup> <a name="disableTsconfigDev" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.disableTsconfigDev"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly disableTsconfigDev: boolean;
```

- *Type:* boolean
- *Default:* false

Do not generate a `tsconfig.dev.json` file.

---

##### ~~`docgen`~~<sup>Optional</sup> <a name="docgen" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.docgen"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly docgen: boolean;
```

- *Type:* boolean
- *Default:* false

Docgen by Typedoc.

---

##### ~~`docsDirectory`~~<sup>Optional</sup> <a name="docsDirectory" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.docsDirectory"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly docsDirectory: string;
```

- *Type:* string
- *Default:* "docs"

Docs directory.

---

##### ~~`entrypointTypes`~~<sup>Optional</sup> <a name="entrypointTypes" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.entrypointTypes"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly entrypointTypes: string;
```

- *Type:* string
- *Default:* .d.ts file derived from the project's entrypoint (usually lib/index.d.ts)

The .d.ts file that includes the type declarations for this module.

---

##### ~~`eslint`~~<sup>Optional</sup> <a name="eslint" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.eslint"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly eslint: boolean;
```

- *Type:* boolean
- *Default:* true, unless biome is enabled

Setup eslint.

---

##### ~~`eslintOptions`~~<sup>Optional</sup> <a name="eslintOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.eslintOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly eslintOptions: EslintOptions;
```

- *Type:* projen.javascript.EslintOptions
- *Default:* opinionated default options

Eslint options.

---

##### ~~`libdir`~~<sup>Optional</sup> <a name="libdir" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.libdir"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly libdir: string;
```

- *Type:* string
- *Default:* "lib"

Typescript  artifacts output directory.

---

##### ~~`projenrcTs`~~<sup>Optional</sup> <a name="projenrcTs" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcTs"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcTs: boolean;
```

- *Type:* boolean
- *Default:* false

Use TypeScript for your projenrc file (`.projenrc.ts`).

---

##### ~~`projenrcTsOptions`~~<sup>Optional</sup> <a name="projenrcTsOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.projenrcTsOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly projenrcTsOptions: ProjenrcOptions;
```

- *Type:* projen.typescript.ProjenrcOptions

Options for .projenrc.ts.

---

##### ~~`sampleCode`~~<sup>Optional</sup> <a name="sampleCode" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.sampleCode"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly sampleCode: boolean;
```

- *Type:* boolean
- *Default:* true

Generate one-time sample in `src/` and `test/` if there are no files there.

---

##### ~~`srcdir`~~<sup>Optional</sup> <a name="srcdir" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.srcdir"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly srcdir: string;
```

- *Type:* string
- *Default:* "src"

Typescript sources directory.

---

##### ~~`testdir`~~<sup>Optional</sup> <a name="testdir" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.testdir"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly testdir: string;
```

- *Type:* string
- *Default:* "test"

Jest tests directory. Tests files should be named `xxx.test.ts`.

If this directory is under `srcdir` (e.g. `src/test`, `src/__tests__`),
then tests are going to be compiled into `lib/` and executed as javascript.
If the test directory is outside of `src`, then we configure jest to
compile the code in-memory.

---

##### ~~`tsconfig`~~<sup>Optional</sup> <a name="tsconfig" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfig"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfig: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* default options

Custom TSConfig.

---

##### ~~`tsconfigDev`~~<sup>Optional</sup> <a name="tsconfigDev" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfigDev"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfigDev: TypescriptConfigOptions;
```

- *Type:* projen.javascript.TypescriptConfigOptions
- *Default:* use the production tsconfig options

Custom tsconfig options for the development tsconfig.json file (used for testing).

---

##### ~~`tsconfigDevFile`~~<sup>Optional</sup> <a name="tsconfigDevFile" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsconfigDevFile"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsconfigDevFile: string;
```

- *Type:* string
- *Default:* "tsconfig.dev.json"

The name of the development tsconfig.json file.

---

##### ~~`tsJestOptions`~~<sup>Optional</sup> <a name="tsJestOptions" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.tsJestOptions"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly tsJestOptions: TsJestOptions;
```

- *Type:* projen.typescript.TsJestOptions

Options for ts-jest.

---

##### ~~`typescriptVersion`~~<sup>Optional</sup> <a name="typescriptVersion" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.typescriptVersion"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly typescriptVersion: string;
```

- *Type:* string
- *Default:* "latest"

TypeScript version to use.

NOTE: Typescript is not semantically versioned and should remain on the
same minor, so we recommend using a `~` dependency (e.g. `~1.2.3`).

---

##### ~~`extensionTypes`~~<sup>Required</sup> <a name="extensionTypes" id="@wbce/projen-d9-extension.DirectusExtensionProjectOptions.property.extensionTypes"></a>

- *Deprecated:* Use {@link D9ExtensionProjectOptions } instead. The package was renamed to `@wbce/projen-d9-extension`.

```typescript
public readonly extensionTypes: D9ExtensionType[];
```

- *Type:* <a href="#@wbce/projen-d9-extension.D9ExtensionType">D9ExtensionType</a>[]

The type of Directus extension.

---

### ExtensionFolderOptions <a name="ExtensionFolderOptions" id="@wbce/projen-d9-extension.ExtensionFolderOptions"></a>

Options for the ExtensionFolder.

#### Initializer <a name="Initializer" id="@wbce/projen-d9-extension.ExtensionFolderOptions.Initializer"></a>

```typescript
import { ExtensionFolderOptions } from '@wbce/projen-d9-extension'

const extensionFolderOptions: ExtensionFolderOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.name">name</a></code> | <code>string</code> | This is the name of your project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.gitIgnoreOptions">gitIgnoreOptions</a></code> | <code>projen.IgnoreFileOptions</code> | Configuration options for .gitignore file. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.gitOptions">gitOptions</a></code> | <code>projen.GitOptions</code> | Configuration options for git. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.logging">logging</a></code> | <code>projen.LoggerOptions</code> | Configure logging options such as verbosity. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.outdir">outdir</a></code> | <code>string</code> | The root directory of the project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.parent">parent</a></code> | <code>projen.Project</code> | The parent project, if this project is part of a bigger project. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.projectTree">projectTree</a></code> | <code>boolean</code> | Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenCommand">projenCommand</a></code> | <code>string</code> | The shell command to use in order to run the projen CLI. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenrcJson">projenrcJson</a></code> | <code>boolean</code> | Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenrcJsonOptions">projenrcJsonOptions</a></code> | <code>projen.ProjenrcJsonOptions</code> | Options for .projenrc.json. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.renovatebot">renovatebot</a></code> | <code>boolean</code> | Use renovatebot to handle dependency upgrades. |
| <code><a href="#@wbce/projen-d9-extension.ExtensionFolderOptions.property.renovatebotOptions">renovatebotOptions</a></code> | <code>projen.RenovatebotOptions</code> | Options for renovatebot. |

---

##### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string
- *Default:* $BASEDIR

This is the name of your project.

---

##### `commitGenerated`<sup>Optional</sup> <a name="commitGenerated" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to commit the managed files by default.

---

##### `gitIgnoreOptions`<sup>Optional</sup> <a name="gitIgnoreOptions" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.gitIgnoreOptions"></a>

```typescript
public readonly gitIgnoreOptions: IgnoreFileOptions;
```

- *Type:* projen.IgnoreFileOptions

Configuration options for .gitignore file.

---

##### `gitOptions`<sup>Optional</sup> <a name="gitOptions" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.gitOptions"></a>

```typescript
public readonly gitOptions: GitOptions;
```

- *Type:* projen.GitOptions

Configuration options for git.

---

##### `logging`<sup>Optional</sup> <a name="logging" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.logging"></a>

```typescript
public readonly logging: LoggerOptions;
```

- *Type:* projen.LoggerOptions
- *Default:* {}

Configure logging options such as verbosity.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string
- *Default:* "."

The root directory of the project.

Relative to this directory, all files are synthesized.

If this project has a parent, this directory is relative to the parent
directory and it cannot be the same as the parent or any of it's other
subprojects.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

The parent project, if this project is part of a bigger project.

---

##### `projectTree`<sup>Optional</sup> <a name="projectTree" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.projectTree"></a>

```typescript
public readonly projectTree: boolean;
```

- *Type:* boolean
- *Default:* false

Generate a project tree file (`.projen/tree.json`) that shows all components and their relationships. Useful for understanding your project structure and debugging.

---

##### `projenCommand`<sup>Optional</sup> <a name="projenCommand" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string
- *Default:* "npx projen"

The shell command to use in order to run the projen CLI.

Can be used to customize in special environments.

---

##### `projenrcJson`<sup>Optional</sup> <a name="projenrcJson" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenrcJson"></a>

```typescript
public readonly projenrcJson: boolean;
```

- *Type:* boolean
- *Default:* false

Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable .projenrc.json generation.

---

##### `projenrcJsonOptions`<sup>Optional</sup> <a name="projenrcJsonOptions" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.projenrcJsonOptions"></a>

```typescript
public readonly projenrcJsonOptions: ProjenrcJsonOptions;
```

- *Type:* projen.ProjenrcJsonOptions
- *Default:* default options

Options for .projenrc.json.

---

##### `renovatebot`<sup>Optional</sup> <a name="renovatebot" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.renovatebot"></a>

```typescript
public readonly renovatebot: boolean;
```

- *Type:* boolean
- *Default:* false

Use renovatebot to handle dependency upgrades.

---

##### `renovatebotOptions`<sup>Optional</sup> <a name="renovatebotOptions" id="@wbce/projen-d9-extension.ExtensionFolderOptions.property.renovatebotOptions"></a>

```typescript
public readonly renovatebotOptions: RenovatebotOptions;
```

- *Type:* projen.RenovatebotOptions
- *Default:* default options

Options for renovatebot.

---



## Enums <a name="Enums" id="Enums"></a>

### D9ExtensionType <a name="D9ExtensionType" id="@wbce/projen-d9-extension.D9ExtensionType"></a>

Supported Directus v9 extension types.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.INTERFACE">INTERFACE</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.DISPLAY">DISPLAY</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.LAYOUT">LAYOUT</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.MODULE">MODULE</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.PANEL">PANEL</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.ENDPOINT">ENDPOINT</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.HOOK">HOOK</a></code> | *No description.* |
| <code><a href="#@wbce/projen-d9-extension.D9ExtensionType.OPERATION">OPERATION</a></code> | *No description.* |

---

##### `INTERFACE` <a name="INTERFACE" id="@wbce/projen-d9-extension.D9ExtensionType.INTERFACE"></a>

---


##### `DISPLAY` <a name="DISPLAY" id="@wbce/projen-d9-extension.D9ExtensionType.DISPLAY"></a>

---


##### `LAYOUT` <a name="LAYOUT" id="@wbce/projen-d9-extension.D9ExtensionType.LAYOUT"></a>

---


##### `MODULE` <a name="MODULE" id="@wbce/projen-d9-extension.D9ExtensionType.MODULE"></a>

---


##### `PANEL` <a name="PANEL" id="@wbce/projen-d9-extension.D9ExtensionType.PANEL"></a>

---


##### `ENDPOINT` <a name="ENDPOINT" id="@wbce/projen-d9-extension.D9ExtensionType.ENDPOINT"></a>

---


##### `HOOK` <a name="HOOK" id="@wbce/projen-d9-extension.D9ExtensionType.HOOK"></a>

---


##### `OPERATION` <a name="OPERATION" id="@wbce/projen-d9-extension.D9ExtensionType.OPERATION"></a>

---

