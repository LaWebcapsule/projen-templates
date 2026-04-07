# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Dockerfile <a name="Dockerfile" id="@wbce/projen-shared.Dockerfile"></a>

A projen file that generates a Dockerfile using a fluent, chainable API.

Commands are organized into named steps. Each step renders as a comment
header followed by its commands, separated by blank lines.

*Example*

```typescript
new Dockerfile(project)
  .from('node', '22-bookworm-slim')
  .step('install', 'Install dependencies')
    .copy('package*.json', '/app/')
    .workdir('/app')
    .run('npm ci')
  .step('build', 'Build application')
    .copy('.', '.')
    .run('npm run build')
  .step('start', 'Start server')
    .cmdExec(['node', 'dist/index.js']);
```


#### Initializers <a name="Initializers" id="@wbce/projen-shared.Dockerfile.Initializer"></a>

```typescript
import { Dockerfile } from '@wbce/projen-shared'

new Dockerfile(scope: Project, filePath?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.Dockerfile.Initializer.parameter.scope">scope</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.Dockerfile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wbce/projen-shared.Dockerfile.Initializer.parameter.scope"></a>

- *Type:* projen.Project

---

##### `filePath`<sup>Optional</sup> <a name="filePath" id="@wbce/projen-shared.Dockerfile.Initializer.parameter.filePath"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.Dockerfile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-shared.Dockerfile.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-shared.Dockerfile.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#@wbce/projen-shared.Dockerfile.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#@wbce/projen-shared.Dockerfile.synthesize">synthesize</a></code> | Writes the file to the project's output directory. |
| <code><a href="#@wbce/projen-shared.Dockerfile.add">add</a></code> | Adds an ADD instruction. |
| <code><a href="#@wbce/projen-shared.Dockerfile.arg">arg</a></code> | Declares a build argument that can be passed with --build-arg. |
| <code><a href="#@wbce/projen-shared.Dockerfile.blankLine">blankLine</a></code> | Adds a blank line to the Dockerfile for readability. |
| <code><a href="#@wbce/projen-shared.Dockerfile.cmd">cmd</a></code> | Sets the default command using shell form. |
| <code><a href="#@wbce/projen-shared.Dockerfile.cmdExec">cmdExec</a></code> | Sets the default command using exec form (JSON array). |
| <code><a href="#@wbce/projen-shared.Dockerfile.comment">comment</a></code> | Adds a comment line to the Dockerfile. |
| <code><a href="#@wbce/projen-shared.Dockerfile.copy">copy</a></code> | Adds a COPY instruction to copy files from the build context into the image. |
| <code><a href="#@wbce/projen-shared.Dockerfile.editFromEndOfStep">editFromEndOfStep</a></code> | Selects an existing step by id. |
| <code><a href="#@wbce/projen-shared.Dockerfile.entrypoint">entrypoint</a></code> | Sets the container entrypoint using shell form. |
| <code><a href="#@wbce/projen-shared.Dockerfile.entrypointExec">entrypointExec</a></code> | Sets the container entrypoint using exec form (JSON array). |
| <code><a href="#@wbce/projen-shared.Dockerfile.env">env</a></code> | Sets one or more environment variables. |
| <code><a href="#@wbce/projen-shared.Dockerfile.envKeyValue">envKeyValue</a></code> | Sets a single environment variable. |
| <code><a href="#@wbce/projen-shared.Dockerfile.expose">expose</a></code> | Documents that the container listens on the specified port at runtime. |
| <code><a href="#@wbce/projen-shared.Dockerfile.exposePorts">exposePorts</a></code> | Documents multiple ports the container listens on. |
| <code><a href="#@wbce/projen-shared.Dockerfile.from">from</a></code> | Adds a FROM instruction. |
| <code><a href="#@wbce/projen-shared.Dockerfile.fromAs">fromAs</a></code> | Adds a FROM ... AS instruction for multi-stage builds. Creates a step with the alias as id. |
| <code><a href="#@wbce/projen-shared.Dockerfile.fromDigest">fromDigest</a></code> | Adds a FROM instruction pinned to a specific image digest. |
| <code><a href="#@wbce/projen-shared.Dockerfile.fromPlatform">fromPlatform</a></code> | Adds a FROM instruction with an explicit --platform flag. |
| <code><a href="#@wbce/projen-shared.Dockerfile.getFrom">getFrom</a></code> | Returns the FromStatement for a given step id, allowing you to mutate it. |
| <code><a href="#@wbce/projen-shared.Dockerfile.healthcheck">healthcheck</a></code> | Configures a health check command that Docker runs periodically to verify the container is healthy. |
| <code><a href="#@wbce/projen-shared.Dockerfile.healthcheckNone">healthcheckNone</a></code> | Disables any health check inherited from the base image. |
| <code><a href="#@wbce/projen-shared.Dockerfile.label">label</a></code> | Adds metadata labels to the image. |
| <code><a href="#@wbce/projen-shared.Dockerfile.maintainer">maintainer</a></code> | Sets the maintainer field. |
| <code><a href="#@wbce/projen-shared.Dockerfile.onbuild">onbuild</a></code> | Registers a trigger instruction that runs when this image is used as a base for another build. |
| <code><a href="#@wbce/projen-shared.Dockerfile.overrideStep">overrideStep</a></code> | Clears all commands from an existing step and selects it. |
| <code><a href="#@wbce/projen-shared.Dockerfile.raw">raw</a></code> | Adds a raw line to the Dockerfile without any processing. |
| <code><a href="#@wbce/projen-shared.Dockerfile.removeStep">removeStep</a></code> | Removes a step entirely from the Dockerfile. |
| <code><a href="#@wbce/projen-shared.Dockerfile.run">run</a></code> | Adds a RUN instruction using shell form. |
| <code><a href="#@wbce/projen-shared.Dockerfile.runExec">runExec</a></code> | Adds a RUN instruction using exec form (JSON array). |
| <code><a href="#@wbce/projen-shared.Dockerfile.runMultiline">runMultiline</a></code> | Adds a RUN instruction with multiple commands joined by "&&" and line continuations. |
| <code><a href="#@wbce/projen-shared.Dockerfile.shell">shell</a></code> | Overrides the default shell used for shell-form commands. |
| <code><a href="#@wbce/projen-shared.Dockerfile.step">step</a></code> | Creates a new named step. |
| <code><a href="#@wbce/projen-shared.Dockerfile.stopsignal">stopsignal</a></code> | Sets the system call signal sent to the container to initiate a graceful stop. |
| <code><a href="#@wbce/projen-shared.Dockerfile.user">user</a></code> | Sets the user (and optionally group) for subsequent RUN, CMD, and ENTRYPOINT instructions. |
| <code><a href="#@wbce/projen-shared.Dockerfile.validate">validate</a></code> | Validates the Dockerfile and returns a list of warnings. |
| <code><a href="#@wbce/projen-shared.Dockerfile.volume">volume</a></code> | Creates a mount point for externally mounted volumes. |
| <code><a href="#@wbce/projen-shared.Dockerfile.workdir">workdir</a></code> | Sets the working directory for subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions. |

---

##### `toString` <a name="toString" id="@wbce/projen-shared.Dockerfile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-shared.Dockerfile.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-shared.Dockerfile.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-shared.Dockerfile.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-shared.Dockerfile.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="@wbce/projen-shared.Dockerfile.synthesize"></a>

```typescript
public synthesize(): void
```

Writes the file to the project's output directory.

##### `add` <a name="add" id="@wbce/projen-shared.Dockerfile.add"></a>

```typescript
public add(src: string | string[], dest: string, options?: AddOptions): Dockerfile
```

Adds an ADD instruction.

Prefer COPY unless you need tar auto-extraction or URL fetching.

> [https://docs.docker.com/reference/dockerfile/#add](https://docs.docker.com/reference/dockerfile/#add)

###### `src`<sup>Required</sup> <a name="src" id="@wbce/projen-shared.Dockerfile.add.parameter.src"></a>

- *Type:* string | string[]

Source path(s) — a single string or an array for multiple sources.

---

###### `dest`<sup>Required</sup> <a name="dest" id="@wbce/projen-shared.Dockerfile.add.parameter.dest"></a>

- *Type:* string

Destination path inside the image.

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.add.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.AddOptions">AddOptions</a>

Optional flags (--from, --chown, --chmod, --link, --keep-git-dir, --checksum, --exclude).

---

##### `arg` <a name="arg" id="@wbce/projen-shared.Dockerfile.arg"></a>

```typescript
public arg(name: string, defaultValue?: string): Dockerfile
```

Declares a build argument that can be passed with --build-arg.

> [https://docs.docker.com/reference/dockerfile/#arg](https://docs.docker.com/reference/dockerfile/#arg)

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.Dockerfile.arg.parameter.name"></a>

- *Type:* string

The argument name.

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@wbce/projen-shared.Dockerfile.arg.parameter.defaultValue"></a>

- *Type:* string

Optional default value if not provided at build time.

---

##### `blankLine` <a name="blankLine" id="@wbce/projen-shared.Dockerfile.blankLine"></a>

```typescript
public blankLine(): Dockerfile
```

Adds a blank line to the Dockerfile for readability.

##### `cmd` <a name="cmd" id="@wbce/projen-shared.Dockerfile.cmd"></a>

```typescript
public cmd(command: string): Dockerfile
```

Sets the default command using shell form.

Calling this again replaces the previous CMD.

> [https://docs.docker.com/reference/dockerfile/#cmd](https://docs.docker.com/reference/dockerfile/#cmd)

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-shared.Dockerfile.cmd.parameter.command"></a>

- *Type:* string

The shell command (e.g. "npm start").

---

##### `cmdExec` <a name="cmdExec" id="@wbce/projen-shared.Dockerfile.cmdExec"></a>

```typescript
public cmdExec(commands: string[]): Dockerfile
```

Sets the default command using exec form (JSON array).

Calling this again replaces the previous CMD.

> [https://docs.docker.com/reference/dockerfile/#cmd](https://docs.docker.com/reference/dockerfile/#cmd)

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-shared.Dockerfile.cmdExec.parameter.commands"></a>

- *Type:* string[]

The command and its arguments (e.g. ["node", "server.js"]).

---

##### `comment` <a name="comment" id="@wbce/projen-shared.Dockerfile.comment"></a>

```typescript
public comment(text: string): Dockerfile
```

Adds a comment line to the Dockerfile.

###### `text`<sup>Required</sup> <a name="text" id="@wbce/projen-shared.Dockerfile.comment.parameter.text"></a>

- *Type:* string

The comment text (without the leading "# ").

---

##### `copy` <a name="copy" id="@wbce/projen-shared.Dockerfile.copy"></a>

```typescript
public copy(src: string | string[], dest: string, options?: CopyOptions): Dockerfile
```

Adds a COPY instruction to copy files from the build context into the image.

> [https://docs.docker.com/reference/dockerfile/#copy](https://docs.docker.com/reference/dockerfile/#copy)

###### `src`<sup>Required</sup> <a name="src" id="@wbce/projen-shared.Dockerfile.copy.parameter.src"></a>

- *Type:* string | string[]

Source path(s) — a single string or an array for multiple sources.

---

###### `dest`<sup>Required</sup> <a name="dest" id="@wbce/projen-shared.Dockerfile.copy.parameter.dest"></a>

- *Type:* string

Destination path inside the image.

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.copy.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.CopyOptions">CopyOptions</a>

Optional flags (--from, --chown, --chmod, --link, --parents, --exclude).

---

##### `editFromEndOfStep` <a name="editFromEndOfStep" id="@wbce/projen-shared.Dockerfile.editFromEndOfStep"></a>

```typescript
public editFromEndOfStep(id: string): Dockerfile
```

Selects an existing step by id.

Subsequent commands are appended at the end of that step.
Use this to extend a step that was previously defined.

###### `id`<sup>Required</sup> <a name="id" id="@wbce/projen-shared.Dockerfile.editFromEndOfStep.parameter.id"></a>

- *Type:* string

The step id to edit.

Check the generated Dockerfile for step-id values.

---

##### `entrypoint` <a name="entrypoint" id="@wbce/projen-shared.Dockerfile.entrypoint"></a>

```typescript
public entrypoint(command: string): Dockerfile
```

Sets the container entrypoint using shell form.

Calling this again replaces the previous ENTRYPOINT.

> [https://docs.docker.com/reference/dockerfile/#entrypoint](https://docs.docker.com/reference/dockerfile/#entrypoint)

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-shared.Dockerfile.entrypoint.parameter.command"></a>

- *Type:* string

The shell command.

---

##### `entrypointExec` <a name="entrypointExec" id="@wbce/projen-shared.Dockerfile.entrypointExec"></a>

```typescript
public entrypointExec(commands: string[]): Dockerfile
```

Sets the container entrypoint using exec form (JSON array).

Calling this again replaces the previous ENTRYPOINT.

> [https://docs.docker.com/reference/dockerfile/#entrypoint](https://docs.docker.com/reference/dockerfile/#entrypoint)

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-shared.Dockerfile.entrypointExec.parameter.commands"></a>

- *Type:* string[]

The command and its arguments (e.g. ["node", "server.js"]).

---

##### `env` <a name="env" id="@wbce/projen-shared.Dockerfile.env"></a>

```typescript
public env(entries: EnvEntry[]): Dockerfile
```

Sets one or more environment variables.

Values with spaces are automatically quoted.

> [https://docs.docker.com/reference/dockerfile/#env](https://docs.docker.com/reference/dockerfile/#env)

###### `entries`<sup>Required</sup> <a name="entries" id="@wbce/projen-shared.Dockerfile.env.parameter.entries"></a>

- *Type:* <a href="#@wbce/projen-shared.EnvEntry">EnvEntry</a>[]

Array of key-value pairs.

---

##### `envKeyValue` <a name="envKeyValue" id="@wbce/projen-shared.Dockerfile.envKeyValue"></a>

```typescript
public envKeyValue(key: string, value: string): Dockerfile
```

Sets a single environment variable.

Values with spaces are automatically quoted.

> [https://docs.docker.com/reference/dockerfile/#env](https://docs.docker.com/reference/dockerfile/#env)

###### `key`<sup>Required</sup> <a name="key" id="@wbce/projen-shared.Dockerfile.envKeyValue.parameter.key"></a>

- *Type:* string

The variable name.

---

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.Dockerfile.envKeyValue.parameter.value"></a>

- *Type:* string

The variable value.

---

##### `expose` <a name="expose" id="@wbce/projen-shared.Dockerfile.expose"></a>

```typescript
public expose(port: number, protocol?: string): Dockerfile
```

Documents that the container listens on the specified port at runtime.

> [https://docs.docker.com/reference/dockerfile/#expose](https://docs.docker.com/reference/dockerfile/#expose)

###### `port`<sup>Required</sup> <a name="port" id="@wbce/projen-shared.Dockerfile.expose.parameter.port"></a>

- *Type:* number

The port number.

---

###### `protocol`<sup>Optional</sup> <a name="protocol" id="@wbce/projen-shared.Dockerfile.expose.parameter.protocol"></a>

- *Type:* string

Optional protocol — "tcp" (default) or "udp".

---

##### `exposePorts` <a name="exposePorts" id="@wbce/projen-shared.Dockerfile.exposePorts"></a>

```typescript
public exposePorts(ports: ...(string | number)[]): Dockerfile
```

Documents multiple ports the container listens on.

> [https://docs.docker.com/reference/dockerfile/#expose](https://docs.docker.com/reference/dockerfile/#expose)

###### `ports`<sup>Required</sup> <a name="ports" id="@wbce/projen-shared.Dockerfile.exposePorts.parameter.ports"></a>

- *Type:* ...(string | number)[]

Port numbers or "port/protocol" strings (e.g. 80, "443/tcp", "53/udp").

---

##### `from` <a name="from" id="@wbce/projen-shared.Dockerfile.from"></a>

```typescript
public from(image: string, tag?: string): Dockerfile
```

Adds a FROM instruction.

Automatically creates a new step with the image name as id.
If a step with the same id already exists, a numeric suffix is added (e.g. "node-2").

The FROM can be modified later via getFrom(id).

> [https://docs.docker.com/reference/dockerfile/#from](https://docs.docker.com/reference/dockerfile/#from)

###### `image`<sup>Required</sup> <a name="image" id="@wbce/projen-shared.Dockerfile.from.parameter.image"></a>

- *Type:* string

The base image name (e.g. "node", "alpine").

---

###### `tag`<sup>Optional</sup> <a name="tag" id="@wbce/projen-shared.Dockerfile.from.parameter.tag"></a>

- *Type:* string

Optional image tag (e.g. "22-bookworm-slim"). Omit to use the image without a tag.

---

##### `fromAs` <a name="fromAs" id="@wbce/projen-shared.Dockerfile.fromAs"></a>

```typescript
public fromAs(image: string, tag: string, alias: string): Dockerfile
```

Adds a FROM ... AS instruction for multi-stage builds. Creates a step with the alias as id.

The FROM can be modified later via getFrom(id).

> [https://docs.docker.com/reference/dockerfile/#from](https://docs.docker.com/reference/dockerfile/#from)

###### `image`<sup>Required</sup> <a name="image" id="@wbce/projen-shared.Dockerfile.fromAs.parameter.image"></a>

- *Type:* string

The base image name.

---

###### `tag`<sup>Required</sup> <a name="tag" id="@wbce/projen-shared.Dockerfile.fromAs.parameter.tag"></a>

- *Type:* string

The image tag.

---

###### `alias`<sup>Required</sup> <a name="alias" id="@wbce/projen-shared.Dockerfile.fromAs.parameter.alias"></a>

- *Type:* string

The stage alias, used as the step id and referenced by COPY --from.

---

##### `fromDigest` <a name="fromDigest" id="@wbce/projen-shared.Dockerfile.fromDigest"></a>

```typescript
public fromDigest(image: string, digest: string, alias?: string): Dockerfile
```

Adds a FROM instruction pinned to a specific image digest.

The FROM can be modified later via getFrom(id).

> [https://docs.docker.com/reference/dockerfile/#from](https://docs.docker.com/reference/dockerfile/#from)

###### `image`<sup>Required</sup> <a name="image" id="@wbce/projen-shared.Dockerfile.fromDigest.parameter.image"></a>

- *Type:* string

The base image name.

---

###### `digest`<sup>Required</sup> <a name="digest" id="@wbce/projen-shared.Dockerfile.fromDigest.parameter.digest"></a>

- *Type:* string

The image digest (e.g. "sha256:abc123...").

---

###### `alias`<sup>Optional</sup> <a name="alias" id="@wbce/projen-shared.Dockerfile.fromDigest.parameter.alias"></a>

- *Type:* string

Optional stage alias for multi-stage builds.

---

##### `fromPlatform` <a name="fromPlatform" id="@wbce/projen-shared.Dockerfile.fromPlatform"></a>

```typescript
public fromPlatform(platform: string, image: string, tag?: string, alias?: string): Dockerfile
```

Adds a FROM instruction with an explicit --platform flag.

The FROM can be modified later via getFrom(id).

> [https://docs.docker.com/reference/dockerfile/#from](https://docs.docker.com/reference/dockerfile/#from)

###### `platform`<sup>Required</sup> <a name="platform" id="@wbce/projen-shared.Dockerfile.fromPlatform.parameter.platform"></a>

- *Type:* string

The target platform (e.g. "linux/amd64", "linux/arm64").

---

###### `image`<sup>Required</sup> <a name="image" id="@wbce/projen-shared.Dockerfile.fromPlatform.parameter.image"></a>

- *Type:* string

The base image name.

---

###### `tag`<sup>Optional</sup> <a name="tag" id="@wbce/projen-shared.Dockerfile.fromPlatform.parameter.tag"></a>

- *Type:* string

Optional image tag.

---

###### `alias`<sup>Optional</sup> <a name="alias" id="@wbce/projen-shared.Dockerfile.fromPlatform.parameter.alias"></a>

- *Type:* string

Optional stage alias for multi-stage builds.

---

##### `getFrom` <a name="getFrom" id="@wbce/projen-shared.Dockerfile.getFrom"></a>

```typescript
public getFrom(stepId: string): FromStatement
```

Returns the FromStatement for a given step id, allowing you to mutate it.

*Example*

```typescript
dockerfile.getFrom('node')
  .tag('23-bookworm-slim')
  .as('build');
```


###### `stepId`<sup>Required</sup> <a name="stepId" id="@wbce/projen-shared.Dockerfile.getFrom.parameter.stepId"></a>

- *Type:* string

The step id (image name for from(), alias for fromAs()).

---

##### `healthcheck` <a name="healthcheck" id="@wbce/projen-shared.Dockerfile.healthcheck"></a>

```typescript
public healthcheck(command: string, options?: HealthcheckOptions): Dockerfile
```

Configures a health check command that Docker runs periodically to verify the container is healthy.

> [https://docs.docker.com/reference/dockerfile/#healthcheck](https://docs.docker.com/reference/dockerfile/#healthcheck)

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-shared.Dockerfile.healthcheck.parameter.command"></a>

- *Type:* string

The health check command (e.g. "curl -f http://localhost/ || exit 1").

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.healthcheck.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.HealthcheckOptions">HealthcheckOptions</a>

Optional timing and retry configuration.

---

##### `healthcheckNone` <a name="healthcheckNone" id="@wbce/projen-shared.Dockerfile.healthcheckNone"></a>

```typescript
public healthcheckNone(): Dockerfile
```

Disables any health check inherited from the base image.

> [https://docs.docker.com/reference/dockerfile/#healthcheck](https://docs.docker.com/reference/dockerfile/#healthcheck)

##### `label` <a name="label" id="@wbce/projen-shared.Dockerfile.label"></a>

```typescript
public label(entries: LabelEntry[]): Dockerfile
```

Adds metadata labels to the image.

Values with spaces are automatically quoted.

> [https://docs.docker.com/reference/dockerfile/#label](https://docs.docker.com/reference/dockerfile/#label)

###### `entries`<sup>Required</sup> <a name="entries" id="@wbce/projen-shared.Dockerfile.label.parameter.entries"></a>

- *Type:* <a href="#@wbce/projen-shared.LabelEntry">LabelEntry</a>[]

Array of key-value pairs.

---

##### ~~`maintainer`~~ <a name="maintainer" id="@wbce/projen-shared.Dockerfile.maintainer"></a>

```typescript
public maintainer(name: string): Dockerfile
```

Sets the maintainer field.

Deprecated — use a LABEL instead.

> [https://docs.docker.com/reference/dockerfile/#maintainer](https://docs.docker.com/reference/dockerfile/#maintainer)

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.Dockerfile.maintainer.parameter.name"></a>

- *Type:* string

The maintainer name and/or email.

---

##### `onbuild` <a name="onbuild" id="@wbce/projen-shared.Dockerfile.onbuild"></a>

```typescript
public onbuild(instruction: string): Dockerfile
```

Registers a trigger instruction that runs when this image is used as a base for another build.

> [https://docs.docker.com/reference/dockerfile/#onbuild](https://docs.docker.com/reference/dockerfile/#onbuild)

###### `instruction`<sup>Required</sup> <a name="instruction" id="@wbce/projen-shared.Dockerfile.onbuild.parameter.instruction"></a>

- *Type:* string

The full Dockerfile instruction to defer (e.g. "RUN npm install").

---

##### `overrideStep` <a name="overrideStep" id="@wbce/projen-shared.Dockerfile.overrideStep"></a>

```typescript
public overrideStep(id: string): Dockerfile
```

Clears all commands from an existing step and selects it.

Subsequent commands replace the old ones.

###### `id`<sup>Required</sup> <a name="id" id="@wbce/projen-shared.Dockerfile.overrideStep.parameter.id"></a>

- *Type:* string

The step id to override.

Check the generated Dockerfile for step-id values.

---

##### `raw` <a name="raw" id="@wbce/projen-shared.Dockerfile.raw"></a>

```typescript
public raw(line: string): Dockerfile
```

Adds a raw line to the Dockerfile without any processing.

###### `line`<sup>Required</sup> <a name="line" id="@wbce/projen-shared.Dockerfile.raw.parameter.line"></a>

- *Type:* string

The exact line to add.

---

##### `removeStep` <a name="removeStep" id="@wbce/projen-shared.Dockerfile.removeStep"></a>

```typescript
public removeStep(id: string): Dockerfile
```

Removes a step entirely from the Dockerfile.

###### `id`<sup>Required</sup> <a name="id" id="@wbce/projen-shared.Dockerfile.removeStep.parameter.id"></a>

- *Type:* string

The step id to remove.

---

##### `run` <a name="run" id="@wbce/projen-shared.Dockerfile.run"></a>

```typescript
public run(command: string, options?: RunOptions): Dockerfile
```

Adds a RUN instruction using shell form.

> [https://docs.docker.com/reference/dockerfile/#run](https://docs.docker.com/reference/dockerfile/#run)

###### `command`<sup>Required</sup> <a name="command" id="@wbce/projen-shared.Dockerfile.run.parameter.command"></a>

- *Type:* string

The shell command to run (e.g. "npm install").

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.run.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.RunOptions">RunOptions</a>

Optional flags for --mount, --network, --security.

---

##### `runExec` <a name="runExec" id="@wbce/projen-shared.Dockerfile.runExec"></a>

```typescript
public runExec(commands: string[], options?: RunOptions): Dockerfile
```

Adds a RUN instruction using exec form (JSON array).

> [https://docs.docker.com/reference/dockerfile/#run](https://docs.docker.com/reference/dockerfile/#run)

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-shared.Dockerfile.runExec.parameter.commands"></a>

- *Type:* string[]

The command and its arguments as an array (e.g. ["npm", "ci"]).

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.runExec.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.RunOptions">RunOptions</a>

Optional flags for --mount, --network, --security.

---

##### `runMultiline` <a name="runMultiline" id="@wbce/projen-shared.Dockerfile.runMultiline"></a>

```typescript
public runMultiline(commands: string[], options?: RunOptions): Dockerfile
```

Adds a RUN instruction with multiple commands joined by "&&" and line continuations.

> [https://docs.docker.com/reference/dockerfile/#run](https://docs.docker.com/reference/dockerfile/#run)

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-shared.Dockerfile.runMultiline.parameter.commands"></a>

- *Type:* string[]

Array of shell commands to chain together.

---

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.Dockerfile.runMultiline.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.RunOptions">RunOptions</a>

Optional flags for --mount, --network, --security.

---

##### `shell` <a name="shell" id="@wbce/projen-shared.Dockerfile.shell"></a>

```typescript
public shell(commands: string[]): Dockerfile
```

Overrides the default shell used for shell-form commands.

> [https://docs.docker.com/reference/dockerfile/#shell](https://docs.docker.com/reference/dockerfile/#shell)

###### `commands`<sup>Required</sup> <a name="commands" id="@wbce/projen-shared.Dockerfile.shell.parameter.commands"></a>

- *Type:* string[]

The shell and its arguments (e.g. ["/bin/bash", "-c"]).

---

##### `step` <a name="step" id="@wbce/projen-shared.Dockerfile.step"></a>

```typescript
public step(id: string, name: string): Dockerfile
```

Creates a new named step.

Subsequent commands are added to this step.
The step renders as a comment with the name and step-id, followed by its commands.

###### `id`<sup>Required</sup> <a name="id" id="@wbce/projen-shared.Dockerfile.step.parameter.id"></a>

- *Type:* string

Unique identifier for the step.

Used with editFromEndOfStep() and overrideStep().

---

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.Dockerfile.step.parameter.name"></a>

- *Type:* string

Human-readable description shown as a comment in the generated Dockerfile.

---

##### `stopsignal` <a name="stopsignal" id="@wbce/projen-shared.Dockerfile.stopsignal"></a>

```typescript
public stopsignal(signal: string): Dockerfile
```

Sets the system call signal sent to the container to initiate a graceful stop.

> [https://docs.docker.com/reference/dockerfile/#stopsignal](https://docs.docker.com/reference/dockerfile/#stopsignal)

###### `signal`<sup>Required</sup> <a name="signal" id="@wbce/projen-shared.Dockerfile.stopsignal.parameter.signal"></a>

- *Type:* string

The signal name or number (e.g. "SIGTERM", "9").

---

##### `user` <a name="user" id="@wbce/projen-shared.Dockerfile.user"></a>

```typescript
public user(user: string, group?: string): Dockerfile
```

Sets the user (and optionally group) for subsequent RUN, CMD, and ENTRYPOINT instructions.

> [https://docs.docker.com/reference/dockerfile/#user](https://docs.docker.com/reference/dockerfile/#user)

###### `user`<sup>Required</sup> <a name="user" id="@wbce/projen-shared.Dockerfile.user.parameter.user"></a>

- *Type:* string

The username or UID.

---

###### `group`<sup>Optional</sup> <a name="group" id="@wbce/projen-shared.Dockerfile.user.parameter.group"></a>

- *Type:* string

Optional group name or GID.

---

##### `validate` <a name="validate" id="@wbce/projen-shared.Dockerfile.validate"></a>

```typescript
public validate(): string[]
```

Validates the Dockerfile and returns a list of warnings.

Checks for common issues:
- Missing FROM instruction
- Using 'latest' tag or no tag on base images
- Missing HEALTHCHECK
- Using ADD where COPY would suffice
- COPY . before package install (breaks layer caching)

##### `volume` <a name="volume" id="@wbce/projen-shared.Dockerfile.volume"></a>

```typescript
public volume(paths: ...string[]): Dockerfile
```

Creates a mount point for externally mounted volumes.

> [https://docs.docker.com/reference/dockerfile/#volume](https://docs.docker.com/reference/dockerfile/#volume)

###### `paths`<sup>Required</sup> <a name="paths" id="@wbce/projen-shared.Dockerfile.volume.parameter.paths"></a>

- *Type:* ...string[]

One or more paths inside the container.

---

##### `workdir` <a name="workdir" id="@wbce/projen-shared.Dockerfile.workdir"></a>

```typescript
public workdir(path: string): Dockerfile
```

Sets the working directory for subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions.

> [https://docs.docker.com/reference/dockerfile/#workdir](https://docs.docker.com/reference/dockerfile/#workdir)

###### `path`<sup>Required</sup> <a name="path" id="@wbce/projen-shared.Dockerfile.workdir.parameter.path"></a>

- *Type:* string

The directory path (e.g. "/app").

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.Dockerfile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-shared.Dockerfile.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-shared.Dockerfile.isConstruct"></a>

```typescript
import { Dockerfile } from '@wbce/projen-shared'

Dockerfile.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.Dockerfile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="@wbce/projen-shared.Dockerfile.isComponent"></a>

```typescript
import { Dockerfile } from '@wbce/projen-shared'

Dockerfile.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.Dockerfile.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.absolutePath">absolutePath</a></code> | <code>string</code> | The absolute path of this file. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.path">path</a></code> | <code>string</code> | The file path, relative to the project's outdir. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.changed">changed</a></code> | <code>boolean</code> | Indicates if the file has been changed during synthesis. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.marker">marker</a></code> | <code>string</code> | The projen marker, used to identify files as projen-generated. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.executable">executable</a></code> | <code>boolean</code> | Indicates if the file should be marked as executable. |
| <code><a href="#@wbce/projen-shared.Dockerfile.property.readonly">readonly</a></code> | <code>boolean</code> | Indicates if the file should be read-only or read-write. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-shared.Dockerfile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-shared.Dockerfile.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `absolutePath`<sup>Required</sup> <a name="absolutePath" id="@wbce/projen-shared.Dockerfile.property.absolutePath"></a>

```typescript
public readonly absolutePath: string;
```

- *Type:* string

The absolute path of this file.

---

##### `path`<sup>Required</sup> <a name="path" id="@wbce/projen-shared.Dockerfile.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The file path, relative to the project's outdir.

---

##### `changed`<sup>Optional</sup> <a name="changed" id="@wbce/projen-shared.Dockerfile.property.changed"></a>

```typescript
public readonly changed: boolean;
```

- *Type:* boolean

Indicates if the file has been changed during synthesis.

This property is
only available in `postSynthesize()` hooks. If this is `undefined`, the
file has not been synthesized yet.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="@wbce/projen-shared.Dockerfile.property.marker"></a>

```typescript
public readonly marker: string;
```

- *Type:* string

The projen marker, used to identify files as projen-generated.

Value is undefined if the project is being ejected.

---

##### `executable`<sup>Required</sup> <a name="executable" id="@wbce/projen-shared.Dockerfile.property.executable"></a>

```typescript
public readonly executable: boolean;
```

- *Type:* boolean

Indicates if the file should be marked as executable.

---

##### `readonly`<sup>Required</sup> <a name="readonly" id="@wbce/projen-shared.Dockerfile.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean

Indicates if the file should be read-only or read-write.

---


### GitHubConfig <a name="GitHubConfig" id="@wbce/projen-shared.GitHubConfig"></a>

Extends projen's GitHub component with a full .github directory setup: workflows, issue templates, discussion templates, and PR template.

Based on https://github.com/LaWebcapsule/orbits/tree/main/.github

#### Initializers <a name="Initializers" id="@wbce/projen-shared.GitHubConfig.Initializer"></a>

```typescript
import { GitHubConfig } from '@wbce/projen-shared'

new GitHubConfig(project: Project, options?: GitHubConfigOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.GitHubConfig.Initializer.parameter.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.GitHubConfig.Initializer.parameter.options">options</a></code> | <code><a href="#@wbce/projen-shared.GitHubConfigOptions">GitHubConfigOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-shared.GitHubConfig.Initializer.parameter.project"></a>

- *Type:* projen.Project

---

##### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.GitHubConfig.Initializer.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-shared.GitHubConfigOptions">GitHubConfigOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.GitHubConfig.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.addDependabot">addDependabot</a></code> | *No description.* |
| <code><a href="#@wbce/projen-shared.GitHubConfig.addPullRequestTemplate">addPullRequestTemplate</a></code> | *No description.* |
| <code><a href="#@wbce/projen-shared.GitHubConfig.addWorkflow">addWorkflow</a></code> | Adds a workflow to the project. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.tryFindWorkflow">tryFindWorkflow</a></code> | Finds a GitHub workflow by name. |

---

##### `toString` <a name="toString" id="@wbce/projen-shared.GitHubConfig.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-shared.GitHubConfig.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-shared.GitHubConfig.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-shared.GitHubConfig.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-shared.GitHubConfig.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="@wbce/projen-shared.GitHubConfig.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addDependabot` <a name="addDependabot" id="@wbce/projen-shared.GitHubConfig.addDependabot"></a>

```typescript
public addDependabot(options?: DependabotOptions): Dependabot
```

###### `options`<sup>Optional</sup> <a name="options" id="@wbce/projen-shared.GitHubConfig.addDependabot.parameter.options"></a>

- *Type:* projen.github.DependabotOptions

---

##### `addPullRequestTemplate` <a name="addPullRequestTemplate" id="@wbce/projen-shared.GitHubConfig.addPullRequestTemplate"></a>

```typescript
public addPullRequestTemplate(content: ...string[]): PullRequestTemplate
```

###### `content`<sup>Required</sup> <a name="content" id="@wbce/projen-shared.GitHubConfig.addPullRequestTemplate.parameter.content"></a>

- *Type:* ...string[]

---

##### `addWorkflow` <a name="addWorkflow" id="@wbce/projen-shared.GitHubConfig.addWorkflow"></a>

```typescript
public addWorkflow(name: string): GithubWorkflow
```

Adds a workflow to the project.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.GitHubConfig.addWorkflow.parameter.name"></a>

- *Type:* string

Name of the workflow.

---

##### `tryFindWorkflow` <a name="tryFindWorkflow" id="@wbce/projen-shared.GitHubConfig.tryFindWorkflow"></a>

```typescript
public tryFindWorkflow(name: string): GithubWorkflow
```

Finds a GitHub workflow by name.

Returns `undefined` if the workflow cannot be found.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.GitHubConfig.tryFindWorkflow.parameter.name"></a>

- *Type:* string

The name of the GitHub workflow.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.GitHubConfig.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.isComponent">isComponent</a></code> | Test whether the given construct is a component. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.of">of</a></code> | Returns the `GitHub` component of a project or `undefined` if the project does not have a GitHub component. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-shared.GitHubConfig.isConstruct"></a>

```typescript
import { GitHubConfig } from '@wbce/projen-shared'

GitHubConfig.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.GitHubConfig.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="@wbce/projen-shared.GitHubConfig.isComponent"></a>

```typescript
import { GitHubConfig } from '@wbce/projen-shared'

GitHubConfig.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.GitHubConfig.isComponent.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@wbce/projen-shared.GitHubConfig.of"></a>

```typescript
import { GitHubConfig } from '@wbce/projen-shared'

GitHubConfig.of(project: Project)
```

Returns the `GitHub` component of a project or `undefined` if the project does not have a GitHub component.

###### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-shared.GitHubConfig.of.parameter.project"></a>

- *Type:* projen.Project

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.actions">actions</a></code> | <code>projen.github.GitHubActionsProvider</code> | The GitHub Actions provider used to manage the versions of actions used in steps. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.downloadLfs">downloadLfs</a></code> | <code>boolean</code> | Whether downloading from LFS is enabled for this GitHub project. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | GitHub API authentication method used by projen workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.workflows">workflows</a></code> | <code>projen.github.GithubWorkflow[]</code> | All workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.workflowsEnabled">workflowsEnabled</a></code> | <code>boolean</code> | Are workflows enabled? |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.mergeQueue">mergeQueue</a></code> | <code>projen.github.MergeQueue</code> | The `MergeQueue` component configured on this repository This is `undefined` if merge queues are not enabled for this repository. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.mergify">mergify</a></code> | <code>projen.github.Mergify</code> | The `Mergify` component configured on this repository This is `undefined` if Mergify is not enabled for this repository. |
| <code><a href="#@wbce/projen-shared.GitHubConfig.property.sastAnalysisWorkflow">sastAnalysisWorkflow</a></code> | <code>projen.github.GithubWorkflow</code> | The SAST analysis workflow, if enabled. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-shared.GitHubConfig.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-shared.GitHubConfig.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `actions`<sup>Required</sup> <a name="actions" id="@wbce/projen-shared.GitHubConfig.property.actions"></a>

```typescript
public readonly actions: GitHubActionsProvider;
```

- *Type:* projen.github.GitHubActionsProvider

The GitHub Actions provider used to manage the versions of actions used in steps.

---

##### `downloadLfs`<sup>Required</sup> <a name="downloadLfs" id="@wbce/projen-shared.GitHubConfig.property.downloadLfs"></a>

```typescript
public readonly downloadLfs: boolean;
```

- *Type:* boolean

Whether downloading from LFS is enabled for this GitHub project.

---

##### `projenCredentials`<sup>Required</sup> <a name="projenCredentials" id="@wbce/projen-shared.GitHubConfig.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials

GitHub API authentication method used by projen workflows.

---

##### `workflows`<sup>Required</sup> <a name="workflows" id="@wbce/projen-shared.GitHubConfig.property.workflows"></a>

```typescript
public readonly workflows: GithubWorkflow[];
```

- *Type:* projen.github.GithubWorkflow[]

All workflows.

---

##### `workflowsEnabled`<sup>Required</sup> <a name="workflowsEnabled" id="@wbce/projen-shared.GitHubConfig.property.workflowsEnabled"></a>

```typescript
public readonly workflowsEnabled: boolean;
```

- *Type:* boolean

Are workflows enabled?

---

##### `mergeQueue`<sup>Optional</sup> <a name="mergeQueue" id="@wbce/projen-shared.GitHubConfig.property.mergeQueue"></a>

```typescript
public readonly mergeQueue: MergeQueue;
```

- *Type:* projen.github.MergeQueue

The `MergeQueue` component configured on this repository This is `undefined` if merge queues are not enabled for this repository.

---

##### `mergify`<sup>Optional</sup> <a name="mergify" id="@wbce/projen-shared.GitHubConfig.property.mergify"></a>

```typescript
public readonly mergify: Mergify;
```

- *Type:* projen.github.Mergify

The `Mergify` component configured on this repository This is `undefined` if Mergify is not enabled for this repository.

---

##### `sastAnalysisWorkflow`<sup>Optional</sup> <a name="sastAnalysisWorkflow" id="@wbce/projen-shared.GitHubConfig.property.sastAnalysisWorkflow"></a>

```typescript
public readonly sastAnalysisWorkflow: GithubWorkflow;
```

- *Type:* projen.github.GithubWorkflow

The SAST analysis workflow, if enabled.

---


### PnpmWorkspace <a name="PnpmWorkspace" id="@wbce/projen-shared.PnpmWorkspace"></a>

Auto-generates pnpm-workspace.yaml from subprojects, with optional catalog support.

#### Initializers <a name="Initializers" id="@wbce/projen-shared.PnpmWorkspace.Initializer"></a>

```typescript
import { PnpmWorkspace } from '@wbce/projen-shared'

new PnpmWorkspace(rootProject: Project)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.Initializer.parameter.rootProject">rootProject</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `rootProject`<sup>Required</sup> <a name="rootProject" id="@wbce/projen-shared.PnpmWorkspace.Initializer.parameter.rootProject"></a>

- *Type:* projen.Project

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.addToCatalog">addToCatalog</a></code> | Add a dependency to the default catalog. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.addToNamedCatalog">addToNamedCatalog</a></code> | Add a dependency to a named catalog. |

---

##### `toString` <a name="toString" id="@wbce/projen-shared.PnpmWorkspace.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-shared.PnpmWorkspace.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-shared.PnpmWorkspace.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-shared.PnpmWorkspace.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-shared.PnpmWorkspace.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="@wbce/projen-shared.PnpmWorkspace.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

##### `addToCatalog` <a name="addToCatalog" id="@wbce/projen-shared.PnpmWorkspace.addToCatalog"></a>

```typescript
public addToCatalog(name: string, version: string): void
```

Add a dependency to the default catalog.

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.PnpmWorkspace.addToCatalog.parameter.name"></a>

- *Type:* string

The package name (e.g. "@wbce-d9/extensions-sdk").

---

###### `version`<sup>Required</sup> <a name="version" id="@wbce/projen-shared.PnpmWorkspace.addToCatalog.parameter.version"></a>

- *Type:* string

The version range (e.g. "^10.0.0").

---

##### `addToNamedCatalog` <a name="addToNamedCatalog" id="@wbce/projen-shared.PnpmWorkspace.addToNamedCatalog"></a>

```typescript
public addToNamedCatalog(catalogName: string, name: string, version: string): void
```

Add a dependency to a named catalog.

###### `catalogName`<sup>Required</sup> <a name="catalogName" id="@wbce/projen-shared.PnpmWorkspace.addToNamedCatalog.parameter.catalogName"></a>

- *Type:* string

The catalog name (e.g. "react17").

---

###### `name`<sup>Required</sup> <a name="name" id="@wbce/projen-shared.PnpmWorkspace.addToNamedCatalog.parameter.name"></a>

- *Type:* string

The package name.

---

###### `version`<sup>Required</sup> <a name="version" id="@wbce/projen-shared.PnpmWorkspace.addToNamedCatalog.parameter.version"></a>

- *Type:* string

The version range.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-shared.PnpmWorkspace.isConstruct"></a>

```typescript
import { PnpmWorkspace } from '@wbce/projen-shared'

PnpmWorkspace.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.PnpmWorkspace.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="@wbce/projen-shared.PnpmWorkspace.isComponent"></a>

```typescript
import { PnpmWorkspace } from '@wbce/projen-shared'

PnpmWorkspace.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-shared.PnpmWorkspace.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.PnpmWorkspace.property.workspaceYaml">workspaceYaml</a></code> | <code>projen.YamlFile</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-shared.PnpmWorkspace.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-shared.PnpmWorkspace.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `workspaceYaml`<sup>Required</sup> <a name="workspaceYaml" id="@wbce/projen-shared.PnpmWorkspace.property.workspaceYaml"></a>

```typescript
public readonly workspaceYaml: YamlFile;
```

- *Type:* projen.YamlFile

---


## Structs <a name="Structs" id="Structs"></a>

### AddOptions <a name="AddOptions" id="@wbce/projen-shared.AddOptions"></a>

Options for the ADD instruction.

> [https://docs.docker.com/reference/dockerfile/#add](https://docs.docker.com/reference/dockerfile/#add)

#### Initializer <a name="Initializer" id="@wbce/projen-shared.AddOptions.Initializer"></a>

```typescript
import { AddOptions } from '@wbce/projen-shared'

const addOptions: AddOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.AddOptions.property.checksum">checksum</a></code> | <code>string</code> | Verify the checksum of a remote resource. |
| <code><a href="#@wbce/projen-shared.AddOptions.property.chmod">chmod</a></code> | <code>string</code> | Set the file permissions of the added files (e.g. "755"). |
| <code><a href="#@wbce/projen-shared.AddOptions.property.chown">chown</a></code> | <code>string</code> | Set the owner (user:group) of the added files. |
| <code><a href="#@wbce/projen-shared.AddOptions.property.exclude">exclude</a></code> | <code>string[]</code> | Glob patterns to exclude from the add. |
| <code><a href="#@wbce/projen-shared.AddOptions.property.from">from</a></code> | <code>string</code> | Add files from a previous build stage or a named context. |
| <code><a href="#@wbce/projen-shared.AddOptions.property.keepGitDir">keepGitDir</a></code> | <code>boolean</code> | When adding from a git repository, keep the .git directory. |
| <code><a href="#@wbce/projen-shared.AddOptions.property.link">link</a></code> | <code>boolean</code> | Enable creating a new layer with a link instead of a copy. |

---

##### `checksum`<sup>Optional</sup> <a name="checksum" id="@wbce/projen-shared.AddOptions.property.checksum"></a>

```typescript
public readonly checksum: string;
```

- *Type:* string

Verify the checksum of a remote resource.

---

##### `chmod`<sup>Optional</sup> <a name="chmod" id="@wbce/projen-shared.AddOptions.property.chmod"></a>

```typescript
public readonly chmod: string;
```

- *Type:* string

Set the file permissions of the added files (e.g. "755").

---

##### `chown`<sup>Optional</sup> <a name="chown" id="@wbce/projen-shared.AddOptions.property.chown"></a>

```typescript
public readonly chown: string;
```

- *Type:* string

Set the owner (user:group) of the added files.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="@wbce/projen-shared.AddOptions.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

Glob patterns to exclude from the add.

---

##### `from`<sup>Optional</sup> <a name="from" id="@wbce/projen-shared.AddOptions.property.from"></a>

```typescript
public readonly from: string;
```

- *Type:* string

Add files from a previous build stage or a named context.

---

##### `keepGitDir`<sup>Optional</sup> <a name="keepGitDir" id="@wbce/projen-shared.AddOptions.property.keepGitDir"></a>

```typescript
public readonly keepGitDir: boolean;
```

- *Type:* boolean

When adding from a git repository, keep the .git directory.

---

##### `link`<sup>Optional</sup> <a name="link" id="@wbce/projen-shared.AddOptions.property.link"></a>

```typescript
public readonly link: boolean;
```

- *Type:* boolean

Enable creating a new layer with a link instead of a copy.

---

### CopyOptions <a name="CopyOptions" id="@wbce/projen-shared.CopyOptions"></a>

Options for the COPY instruction.

> [https://docs.docker.com/reference/dockerfile/#copy](https://docs.docker.com/reference/dockerfile/#copy)

#### Initializer <a name="Initializer" id="@wbce/projen-shared.CopyOptions.Initializer"></a>

```typescript
import { CopyOptions } from '@wbce/projen-shared'

const copyOptions: CopyOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.chmod">chmod</a></code> | <code>string</code> | Set the file permissions of the copied files (e.g. "755"). |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.chown">chown</a></code> | <code>string</code> | Set the owner (user:group) of the copied files. |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.exclude">exclude</a></code> | <code>string[]</code> | Glob patterns to exclude from the copy. |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.from">from</a></code> | <code>string</code> | Copy files from a previous build stage or a named context. |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.link">link</a></code> | <code>boolean</code> | Enable creating a new layer with a link instead of a copy. |
| <code><a href="#@wbce/projen-shared.CopyOptions.property.parents">parents</a></code> | <code>boolean</code> | Preserve parent directory structure relative to the source. |

---

##### `chmod`<sup>Optional</sup> <a name="chmod" id="@wbce/projen-shared.CopyOptions.property.chmod"></a>

```typescript
public readonly chmod: string;
```

- *Type:* string

Set the file permissions of the copied files (e.g. "755").

---

##### `chown`<sup>Optional</sup> <a name="chown" id="@wbce/projen-shared.CopyOptions.property.chown"></a>

```typescript
public readonly chown: string;
```

- *Type:* string

Set the owner (user:group) of the copied files.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="@wbce/projen-shared.CopyOptions.property.exclude"></a>

```typescript
public readonly exclude: string[];
```

- *Type:* string[]

Glob patterns to exclude from the copy.

---

##### `from`<sup>Optional</sup> <a name="from" id="@wbce/projen-shared.CopyOptions.property.from"></a>

```typescript
public readonly from: string;
```

- *Type:* string

Copy files from a previous build stage or a named context.

---

##### `link`<sup>Optional</sup> <a name="link" id="@wbce/projen-shared.CopyOptions.property.link"></a>

```typescript
public readonly link: boolean;
```

- *Type:* boolean

Enable creating a new layer with a link instead of a copy.

---

##### `parents`<sup>Optional</sup> <a name="parents" id="@wbce/projen-shared.CopyOptions.property.parents"></a>

```typescript
public readonly parents: boolean;
```

- *Type:* boolean

Preserve parent directory structure relative to the source.

---

### DockerfileProps <a name="DockerfileProps" id="@wbce/projen-shared.DockerfileProps"></a>

Options for the Dockerfile file.

#### Initializer <a name="Initializer" id="@wbce/projen-shared.DockerfileProps.Initializer"></a>

```typescript
import { DockerfileProps } from '@wbce/projen-shared'

const dockerfileProps: DockerfileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.committed">committed</a></code> | <code>boolean</code> | Indicates whether this file should be committed to git or ignored. |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.editGitignore">editGitignore</a></code> | <code>boolean</code> | Update the project's .gitignore file. |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.executable">executable</a></code> | <code>boolean</code> | Whether the generated file should be marked as executable. |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.marker">marker</a></code> | <code>boolean</code> | Adds the projen marker to the file. |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.readonly">readonly</a></code> | <code>boolean</code> | Whether the generated file should be readonly. |
| <code><a href="#@wbce/projen-shared.DockerfileProps.property.lines">lines</a></code> | <code>string[]</code> | The contents of the text file. |

---

##### `committed`<sup>Optional</sup> <a name="committed" id="@wbce/projen-shared.DockerfileProps.property.committed"></a>

```typescript
public readonly committed: boolean;
```

- *Type:* boolean
- *Default:* true

Indicates whether this file should be committed to git or ignored.

By
default, all generated files are committed and anti-tamper is used to
protect against manual modifications.

---

##### `editGitignore`<sup>Optional</sup> <a name="editGitignore" id="@wbce/projen-shared.DockerfileProps.property.editGitignore"></a>

```typescript
public readonly editGitignore: boolean;
```

- *Type:* boolean
- *Default:* true

Update the project's .gitignore file.

---

##### `executable`<sup>Optional</sup> <a name="executable" id="@wbce/projen-shared.DockerfileProps.property.executable"></a>

```typescript
public readonly executable: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the generated file should be marked as executable.

---

##### `marker`<sup>Optional</sup> <a name="marker" id="@wbce/projen-shared.DockerfileProps.property.marker"></a>

```typescript
public readonly marker: boolean;
```

- *Type:* boolean
- *Default:* marker will be included as long as the project is not ejected

Adds the projen marker to the file.

---

##### `readonly`<sup>Optional</sup> <a name="readonly" id="@wbce/projen-shared.DockerfileProps.property.readonly"></a>

```typescript
public readonly readonly: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the generated file should be readonly.

---

##### `lines`<sup>Optional</sup> <a name="lines" id="@wbce/projen-shared.DockerfileProps.property.lines"></a>

```typescript
public readonly lines: string[];
```

- *Type:* string[]
- *Default:* [] empty file

The contents of the text file.

You can use `addLine()` to append lines.

---

### EnvEntry <a name="EnvEntry" id="@wbce/projen-shared.EnvEntry"></a>

A key-value pair for ENV instructions.

#### Initializer <a name="Initializer" id="@wbce/projen-shared.EnvEntry.Initializer"></a>

```typescript
import { EnvEntry } from '@wbce/projen-shared'

const envEntry: EnvEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.EnvEntry.property.key">key</a></code> | <code>string</code> | The environment variable name. |
| <code><a href="#@wbce/projen-shared.EnvEntry.property.value">value</a></code> | <code>string</code> | The environment variable value. |

---

##### `key`<sup>Required</sup> <a name="key" id="@wbce/projen-shared.EnvEntry.property.key"></a>

```typescript
public readonly key: string;
```

- *Type:* string

The environment variable name.

---

##### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.EnvEntry.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The environment variable value.

Values with spaces are automatically quoted.

---

### GitHubConfigOptions <a name="GitHubConfigOptions" id="@wbce/projen-shared.GitHubConfigOptions"></a>

Options for the GitHubConfig component.

#### Initializer <a name="Initializer" id="@wbce/projen-shared.GitHubConfigOptions.Initializer"></a>

```typescript
import { GitHubConfigOptions } from '@wbce/projen-shared'

const gitHubConfigOptions: GitHubConfigOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.downloadLfs">downloadLfs</a></code> | <code>boolean</code> | Download files in LFS in workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.mergeQueue">mergeQueue</a></code> | <code>boolean</code> | Whether a merge queue should be used on this repository to merge pull requests. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.mergeQueueOptions">mergeQueueOptions</a></code> | <code>projen.github.MergeQueueOptions</code> | Options for MergeQueue. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.mergify">mergify</a></code> | <code>boolean</code> | Whether mergify should be enabled on this repository or not. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.mergifyOptions">mergifyOptions</a></code> | <code>projen.github.MergifyOptions</code> | Options for Mergify. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.projenCredentials">projenCredentials</a></code> | <code>projen.github.GithubCredentials</code> | Choose a method of providing GitHub API access for projen workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.projenTokenSecret">projenTokenSecret</a></code> | <code>string</code> | The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.pullRequestBackport">pullRequestBackport</a></code> | <code>boolean</code> | Add a workflow that allows backport of PRs to other branches using labels. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.pullRequestBackportOptions">pullRequestBackportOptions</a></code> | <code>projen.github.PullRequestBackportOptions</code> | Options for configuring pull request backport. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.pullRequestLint">pullRequestLint</a></code> | <code>boolean</code> | Add a workflow that performs basic checks for pull requests, like validating that PRs follow Conventional Commits. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.pullRequestLintOptions">pullRequestLintOptions</a></code> | <code>projen.github.PullRequestLintOptions</code> | Options for configuring a pull request linter. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.workflows">workflows</a></code> | <code>boolean</code> | Enables GitHub workflows. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.branches">branches</a></code> | <code>string[]</code> | Branch names used in workflow triggers (e.g. pull_request). |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.discussionTemplates">discussionTemplates</a></code> | <code>boolean</code> | Whether to include discussion templates. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.issueTemplates">issueTemplates</a></code> | <code>boolean</code> | Whether to include issue templates. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.pullRequestTemplate">pullRequestTemplate</a></code> | <code>boolean</code> | Whether to include the pull request template. |
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.sastWorkflow">sastWorkflow</a></code> | <code>boolean</code> | Whether to include the SAST analysis workflow. |

---

##### `downloadLfs`<sup>Optional</sup> <a name="downloadLfs" id="@wbce/projen-shared.GitHubConfigOptions.property.downloadLfs"></a>

```typescript
public readonly downloadLfs: boolean;
```

- *Type:* boolean
- *Default:* true if the associated project has `lfsPatterns`, `false` otherwise

Download files in LFS in workflows.

---

##### `mergeQueue`<sup>Optional</sup> <a name="mergeQueue" id="@wbce/projen-shared.GitHubConfigOptions.property.mergeQueue"></a>

```typescript
public readonly mergeQueue: boolean;
```

- *Type:* boolean
- *Default:* false

Whether a merge queue should be used on this repository to merge pull requests.

Requires additional configuration of the repositories branch protection rules.

---

##### `mergeQueueOptions`<sup>Optional</sup> <a name="mergeQueueOptions" id="@wbce/projen-shared.GitHubConfigOptions.property.mergeQueueOptions"></a>

```typescript
public readonly mergeQueueOptions: MergeQueueOptions;
```

- *Type:* projen.github.MergeQueueOptions
- *Default:* default options

Options for MergeQueue.

---

##### `mergify`<sup>Optional</sup> <a name="mergify" id="@wbce/projen-shared.GitHubConfigOptions.property.mergify"></a>

```typescript
public readonly mergify: boolean;
```

- *Type:* boolean
- *Default:* true

Whether mergify should be enabled on this repository or not.

---

##### `mergifyOptions`<sup>Optional</sup> <a name="mergifyOptions" id="@wbce/projen-shared.GitHubConfigOptions.property.mergifyOptions"></a>

```typescript
public readonly mergifyOptions: MergifyOptions;
```

- *Type:* projen.github.MergifyOptions
- *Default:* default options

Options for Mergify.

---

##### `projenCredentials`<sup>Optional</sup> <a name="projenCredentials" id="@wbce/projen-shared.GitHubConfigOptions.property.projenCredentials"></a>

```typescript
public readonly projenCredentials: GithubCredentials;
```

- *Type:* projen.github.GithubCredentials
- *Default:* use a personal access token named PROJEN_GITHUB_TOKEN

Choose a method of providing GitHub API access for projen workflows.

---

##### ~~`projenTokenSecret`~~<sup>Optional</sup> <a name="projenTokenSecret" id="@wbce/projen-shared.GitHubConfigOptions.property.projenTokenSecret"></a>

- *Deprecated:* - use `projenCredentials`

```typescript
public readonly projenTokenSecret: string;
```

- *Type:* string
- *Default:* "PROJEN_GITHUB_TOKEN"

The name of a secret which includes a GitHub Personal Access Token to be used by projen workflows.

This token needs to have the `repo`, `workflows`
and `packages` scope.

---

##### `pullRequestBackport`<sup>Optional</sup> <a name="pullRequestBackport" id="@wbce/projen-shared.GitHubConfigOptions.property.pullRequestBackport"></a>

```typescript
public readonly pullRequestBackport: boolean;
```

- *Type:* boolean
- *Default:* false

Add a workflow that allows backport of PRs to other branches using labels.

When opening a new PR add a backport label to it,
and the PR will be backported to the target branches once the PR is merged.

Should not be used together with mergify.

---

##### `pullRequestBackportOptions`<sup>Optional</sup> <a name="pullRequestBackportOptions" id="@wbce/projen-shared.GitHubConfigOptions.property.pullRequestBackportOptions"></a>

```typescript
public readonly pullRequestBackportOptions: PullRequestBackportOptions;
```

- *Type:* projen.github.PullRequestBackportOptions
- *Default:* see defaults in `PullRequestBackportOptions`

Options for configuring pull request backport.

---

##### `pullRequestLint`<sup>Optional</sup> <a name="pullRequestLint" id="@wbce/projen-shared.GitHubConfigOptions.property.pullRequestLint"></a>

```typescript
public readonly pullRequestLint: boolean;
```

- *Type:* boolean
- *Default:* true

Add a workflow that performs basic checks for pull requests, like validating that PRs follow Conventional Commits.

---

##### `pullRequestLintOptions`<sup>Optional</sup> <a name="pullRequestLintOptions" id="@wbce/projen-shared.GitHubConfigOptions.property.pullRequestLintOptions"></a>

```typescript
public readonly pullRequestLintOptions: PullRequestLintOptions;
```

- *Type:* projen.github.PullRequestLintOptions
- *Default:* see defaults in `PullRequestLintOptions`

Options for configuring a pull request linter.

---

##### `workflows`<sup>Optional</sup> <a name="workflows" id="@wbce/projen-shared.GitHubConfigOptions.property.workflows"></a>

```typescript
public readonly workflows: boolean;
```

- *Type:* boolean
- *Default:* true

Enables GitHub workflows.

If this is set to `false`, workflows will not be created.

---

##### `branches`<sup>Optional</sup> <a name="branches" id="@wbce/projen-shared.GitHubConfigOptions.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]
- *Default:* ["main"]

Branch names used in workflow triggers (e.g. pull_request).

---

##### `discussionTemplates`<sup>Optional</sup> <a name="discussionTemplates" id="@wbce/projen-shared.GitHubConfigOptions.property.discussionTemplates"></a>

```typescript
public readonly discussionTemplates: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include discussion templates.

---

##### `issueTemplates`<sup>Optional</sup> <a name="issueTemplates" id="@wbce/projen-shared.GitHubConfigOptions.property.issueTemplates"></a>

```typescript
public readonly issueTemplates: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include issue templates.

---

##### `pullRequestTemplate`<sup>Optional</sup> <a name="pullRequestTemplate" id="@wbce/projen-shared.GitHubConfigOptions.property.pullRequestTemplate"></a>

```typescript
public readonly pullRequestTemplate: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include the pull request template.

---

##### `sastWorkflow`<sup>Optional</sup> <a name="sastWorkflow" id="@wbce/projen-shared.GitHubConfigOptions.property.sastWorkflow"></a>

```typescript
public readonly sastWorkflow: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to include the SAST analysis workflow.

---

### HealthcheckOptions <a name="HealthcheckOptions" id="@wbce/projen-shared.HealthcheckOptions"></a>

Options for the HEALTHCHECK instruction.

> [https://docs.docker.com/reference/dockerfile/#healthcheck](https://docs.docker.com/reference/dockerfile/#healthcheck)

#### Initializer <a name="Initializer" id="@wbce/projen-shared.HealthcheckOptions.Initializer"></a>

```typescript
import { HealthcheckOptions } from '@wbce/projen-shared'

const healthcheckOptions: HealthcheckOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.HealthcheckOptions.property.interval">interval</a></code> | <code>string</code> | Time between health checks (e.g. "30s", "1m"). Default: 30s. |
| <code><a href="#@wbce/projen-shared.HealthcheckOptions.property.retries">retries</a></code> | <code>number</code> | Number of consecutive failures before marking unhealthy. |
| <code><a href="#@wbce/projen-shared.HealthcheckOptions.property.startInterval">startInterval</a></code> | <code>string</code> | Time between checks during the start period (e.g. "5s"). Default: 5s. |
| <code><a href="#@wbce/projen-shared.HealthcheckOptions.property.startPeriod">startPeriod</a></code> | <code>string</code> | Time to wait before running the first check (e.g. "5s"). Default: 0s. |
| <code><a href="#@wbce/projen-shared.HealthcheckOptions.property.timeout">timeout</a></code> | <code>string</code> | Maximum time for a single check to run (e.g. "10s"). Default: 30s. |

---

##### `interval`<sup>Optional</sup> <a name="interval" id="@wbce/projen-shared.HealthcheckOptions.property.interval"></a>

```typescript
public readonly interval: string;
```

- *Type:* string

Time between health checks (e.g. "30s", "1m"). Default: 30s.

---

##### `retries`<sup>Optional</sup> <a name="retries" id="@wbce/projen-shared.HealthcheckOptions.property.retries"></a>

```typescript
public readonly retries: number;
```

- *Type:* number

Number of consecutive failures before marking unhealthy.

Default: 3.

---

##### `startInterval`<sup>Optional</sup> <a name="startInterval" id="@wbce/projen-shared.HealthcheckOptions.property.startInterval"></a>

```typescript
public readonly startInterval: string;
```

- *Type:* string

Time between checks during the start period (e.g. "5s"). Default: 5s.

---

##### `startPeriod`<sup>Optional</sup> <a name="startPeriod" id="@wbce/projen-shared.HealthcheckOptions.property.startPeriod"></a>

```typescript
public readonly startPeriod: string;
```

- *Type:* string

Time to wait before running the first check (e.g. "5s"). Default: 0s.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@wbce/projen-shared.HealthcheckOptions.property.timeout"></a>

```typescript
public readonly timeout: string;
```

- *Type:* string

Maximum time for a single check to run (e.g. "10s"). Default: 30s.

---

### LabelEntry <a name="LabelEntry" id="@wbce/projen-shared.LabelEntry"></a>

A key-value pair for LABEL instructions.

#### Initializer <a name="Initializer" id="@wbce/projen-shared.LabelEntry.Initializer"></a>

```typescript
import { LabelEntry } from '@wbce/projen-shared'

const labelEntry: LabelEntry = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.LabelEntry.property.key">key</a></code> | <code>string</code> | The label key. |
| <code><a href="#@wbce/projen-shared.LabelEntry.property.value">value</a></code> | <code>string</code> | The label value. |

---

##### `key`<sup>Required</sup> <a name="key" id="@wbce/projen-shared.LabelEntry.property.key"></a>

```typescript
public readonly key: string;
```

- *Type:* string

The label key.

---

##### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.LabelEntry.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The label value.

Values with spaces are automatically quoted.

---

### RunMountOptions <a name="RunMountOptions" id="@wbce/projen-shared.RunMountOptions"></a>

Options for a RUN --mount flag.

> [https://docs.docker.com/reference/dockerfile/#run---mount](https://docs.docker.com/reference/dockerfile/#run---mount)

#### Initializer <a name="Initializer" id="@wbce/projen-shared.RunMountOptions.Initializer"></a>

```typescript
import { RunMountOptions } from '@wbce/projen-shared'

const runMountOptions: RunMountOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.type">type</a></code> | <code>string</code> | The mount type. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.from">from</a></code> | <code>string</code> | Build stage or context to use as the source. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.id">id</a></code> | <code>string</code> | Identifier for cache differentiation. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.readOnly">readOnly</a></code> | <code>boolean</code> | Mount as read-only. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.sharing">sharing</a></code> | <code>string</code> | Cache sharing strategy between concurrent builds. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.source">source</a></code> | <code>string</code> | Source path or identifier for the mount. |
| <code><a href="#@wbce/projen-shared.RunMountOptions.property.target">target</a></code> | <code>string</code> | Mount destination path inside the container. |

---

##### `type`<sup>Required</sup> <a name="type" id="@wbce/projen-shared.RunMountOptions.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The mount type.

---

##### `from`<sup>Optional</sup> <a name="from" id="@wbce/projen-shared.RunMountOptions.property.from"></a>

```typescript
public readonly from: string;
```

- *Type:* string

Build stage or context to use as the source.

---

##### `id`<sup>Optional</sup> <a name="id" id="@wbce/projen-shared.RunMountOptions.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Identifier for cache differentiation.

---

##### `readOnly`<sup>Optional</sup> <a name="readOnly" id="@wbce/projen-shared.RunMountOptions.property.readOnly"></a>

```typescript
public readonly readOnly: boolean;
```

- *Type:* boolean

Mount as read-only.

---

##### `sharing`<sup>Optional</sup> <a name="sharing" id="@wbce/projen-shared.RunMountOptions.property.sharing"></a>

```typescript
public readonly sharing: string;
```

- *Type:* string

Cache sharing strategy between concurrent builds.

---

##### `source`<sup>Optional</sup> <a name="source" id="@wbce/projen-shared.RunMountOptions.property.source"></a>

```typescript
public readonly source: string;
```

- *Type:* string

Source path or identifier for the mount.

---

##### `target`<sup>Optional</sup> <a name="target" id="@wbce/projen-shared.RunMountOptions.property.target"></a>

```typescript
public readonly target: string;
```

- *Type:* string

Mount destination path inside the container.

---

### RunOptions <a name="RunOptions" id="@wbce/projen-shared.RunOptions"></a>

Options for the RUN instruction.

> [https://docs.docker.com/reference/dockerfile/#run](https://docs.docker.com/reference/dockerfile/#run)

#### Initializer <a name="Initializer" id="@wbce/projen-shared.RunOptions.Initializer"></a>

```typescript
import { RunOptions } from '@wbce/projen-shared'

const runOptions: RunOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.RunOptions.property.mount">mount</a></code> | <code><a href="#@wbce/projen-shared.RunMountOptions">RunMountOptions</a> \| <a href="#@wbce/projen-shared.RunMountOptions">RunMountOptions</a>[]</code> | Mount filesystems during the RUN command. |
| <code><a href="#@wbce/projen-shared.RunOptions.property.network">network</a></code> | <code>string</code> | Network mode for the RUN command. |
| <code><a href="#@wbce/projen-shared.RunOptions.property.security">security</a></code> | <code>string</code> | Security mode for the RUN command. |

---

##### `mount`<sup>Optional</sup> <a name="mount" id="@wbce/projen-shared.RunOptions.property.mount"></a>

```typescript
public readonly mount: RunMountOptions | RunMountOptions[];
```

- *Type:* <a href="#@wbce/projen-shared.RunMountOptions">RunMountOptions</a> | <a href="#@wbce/projen-shared.RunMountOptions">RunMountOptions</a>[]

Mount filesystems during the RUN command.

Accepts a single mount or an array.

---

##### `network`<sup>Optional</sup> <a name="network" id="@wbce/projen-shared.RunOptions.property.network"></a>

```typescript
public readonly network: string;
```

- *Type:* string

Network mode for the RUN command.

---

##### `security`<sup>Optional</sup> <a name="security" id="@wbce/projen-shared.RunOptions.property.security"></a>

```typescript
public readonly security: string;
```

- *Type:* string

Security mode for the RUN command.

---

## Classes <a name="Classes" id="Classes"></a>

### FromStatement <a name="FromStatement" id="@wbce/projen-shared.FromStatement"></a>

Represents a FROM instruction in a Dockerfile.

Use the fluent setter methods to override parts of the FROM after creation.

*Example*

```typescript
dockerfile.getFrom('node')
  .tag('23-bookworm-slim')
  .as('build');
```


#### Initializers <a name="Initializers" id="@wbce/projen-shared.FromStatement.Initializer"></a>

```typescript
import { FromStatement } from '@wbce/projen-shared'

new FromStatement(image: string, tag?: string, alias?: string, platform?: string, digest?: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-shared.FromStatement.Initializer.parameter.image">image</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.FromStatement.Initializer.parameter.tag">tag</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.FromStatement.Initializer.parameter.alias">alias</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.FromStatement.Initializer.parameter.platform">platform</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-shared.FromStatement.Initializer.parameter.digest">digest</a></code> | <code>string</code> | *No description.* |

---

##### `image`<sup>Required</sup> <a name="image" id="@wbce/projen-shared.FromStatement.Initializer.parameter.image"></a>

- *Type:* string

---

##### `tag`<sup>Optional</sup> <a name="tag" id="@wbce/projen-shared.FromStatement.Initializer.parameter.tag"></a>

- *Type:* string

---

##### `alias`<sup>Optional</sup> <a name="alias" id="@wbce/projen-shared.FromStatement.Initializer.parameter.alias"></a>

- *Type:* string

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@wbce/projen-shared.FromStatement.Initializer.parameter.platform"></a>

- *Type:* string

---

##### `digest`<sup>Optional</sup> <a name="digest" id="@wbce/projen-shared.FromStatement.Initializer.parameter.digest"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-shared.FromStatement.as">as</a></code> | Sets or overrides the stage alias (the AS name) for multi-stage builds. |
| <code><a href="#@wbce/projen-shared.FromStatement.digest">digest</a></code> | Sets or overrides the image digest (e.g. "sha256:abc123..."). Takes precedence over tag. |
| <code><a href="#@wbce/projen-shared.FromStatement.image">image</a></code> | Overrides the base image name (e.g. "node", "alpine"). |
| <code><a href="#@wbce/projen-shared.FromStatement.platform">platform</a></code> | Sets or overrides the --platform flag (e.g. "linux/amd64", "linux/arm64"). |
| <code><a href="#@wbce/projen-shared.FromStatement.render">render</a></code> | Renders the FROM instruction line. |
| <code><a href="#@wbce/projen-shared.FromStatement.tag">tag</a></code> | Overrides the image tag (e.g. "22-bookworm-slim", "latest"). |

---

##### `as` <a name="as" id="@wbce/projen-shared.FromStatement.as"></a>

```typescript
public as(value: string): FromStatement
```

Sets or overrides the stage alias (the AS name) for multi-stage builds.

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.FromStatement.as.parameter.value"></a>

- *Type:* string

The alias name.

---

##### `digest` <a name="digest" id="@wbce/projen-shared.FromStatement.digest"></a>

```typescript
public digest(value: string): FromStatement
```

Sets or overrides the image digest (e.g. "sha256:abc123..."). Takes precedence over tag.

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.FromStatement.digest.parameter.value"></a>

- *Type:* string

The digest string.

---

##### `image` <a name="image" id="@wbce/projen-shared.FromStatement.image"></a>

```typescript
public image(value: string): FromStatement
```

Overrides the base image name (e.g. "node", "alpine").

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.FromStatement.image.parameter.value"></a>

- *Type:* string

The new image name.

---

##### `platform` <a name="platform" id="@wbce/projen-shared.FromStatement.platform"></a>

```typescript
public platform(value: string): FromStatement
```

Sets or overrides the --platform flag (e.g. "linux/amd64", "linux/arm64").

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.FromStatement.platform.parameter.value"></a>

- *Type:* string

The platform string.

---

##### `render` <a name="render" id="@wbce/projen-shared.FromStatement.render"></a>

```typescript
public render(): string
```

Renders the FROM instruction line.

##### `tag` <a name="tag" id="@wbce/projen-shared.FromStatement.tag"></a>

```typescript
public tag(value: string): FromStatement
```

Overrides the image tag (e.g. "22-bookworm-slim", "latest").

###### `value`<sup>Required</sup> <a name="value" id="@wbce/projen-shared.FromStatement.tag.parameter.value"></a>

- *Type:* string

The new tag.

---





