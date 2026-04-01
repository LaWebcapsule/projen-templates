import { FileBase, IResolver, Project, TextFileOptions } from 'projen';

/**
 * Options for the Dockerfile file.
 */
export interface DockerfileProps extends TextFileOptions {}

/**
 * A key-value pair for ENV instructions.
 */
export interface EnvEntry {
  /** The environment variable name. */
  readonly key: string;
  /** The environment variable value. Values with spaces are automatically quoted. */
  readonly value: string;
}

/**
 * A key-value pair for LABEL instructions.
 */
export interface LabelEntry {
  /** The label key. */
  readonly key: string;
  /** The label value. Values with spaces are automatically quoted. */
  readonly value: string;
}

/**
 * Options for the COPY instruction.
 * @see https://docs.docker.com/reference/dockerfile/#copy
 */
export interface CopyOptions {
  /** Copy files from a previous build stage or a named context. */
  readonly from?: string;
  /** Set the owner (user:group) of the copied files. */
  readonly chown?: string;
  /** Set the file permissions of the copied files (e.g. "755"). */
  readonly chmod?: string;
  /** Enable creating a new layer with a link instead of a copy. */
  readonly link?: boolean;
  /** Preserve parent directory structure relative to the source. */
  readonly parents?: boolean;
  /** Glob patterns to exclude from the copy. */
  readonly exclude?: string[];
}

/**
 * Options for the ADD instruction.
 * @see https://docs.docker.com/reference/dockerfile/#add
 */
export interface AddOptions {
  /** Add files from a previous build stage or a named context. */
  readonly from?: string;
  /** Set the owner (user:group) of the added files. */
  readonly chown?: string;
  /** Set the file permissions of the added files (e.g. "755"). */
  readonly chmod?: string;
  /** Enable creating a new layer with a link instead of a copy. */
  readonly link?: boolean;
  /** When adding from a git repository, keep the .git directory. */
  readonly keepGitDir?: boolean;
  /** Verify the checksum of a remote resource. */
  readonly checksum?: string;
  /** Glob patterns to exclude from the add. */
  readonly exclude?: string[];
}

/**
 * Options for the HEALTHCHECK instruction.
 * @see https://docs.docker.com/reference/dockerfile/#healthcheck
 */
export interface HealthcheckOptions {
  /** Time between health checks (e.g. "30s", "1m"). Default: 30s. */
  readonly interval?: string;
  /** Maximum time for a single check to run (e.g. "10s"). Default: 30s. */
  readonly timeout?: string;
  /** Time to wait before running the first check (e.g. "5s"). Default: 0s. */
  readonly startPeriod?: string;
  /** Time between checks during the start period (e.g. "5s"). Default: 5s. */
  readonly startInterval?: string;
  /** Number of consecutive failures before marking unhealthy. Default: 3. */
  readonly retries?: number;
}

/**
 * Options for a RUN --mount flag.
 * @see https://docs.docker.com/reference/dockerfile/#run---mount
 */
export interface RunMountOptions {
  /** The mount type. */
  readonly type: 'bind' | 'cache' | 'tmpfs' | 'secret' | 'ssh';
  /** Mount destination path inside the container. */
  readonly target?: string;
  /** Source path or identifier for the mount. */
  readonly source?: string;
  /** Build stage or context to use as the source. */
  readonly from?: string;
  /** Mount as read-only. */
  readonly readOnly?: boolean;
  /** Identifier for cache differentiation. */
  readonly id?: string;
  /** Cache sharing strategy between concurrent builds. */
  readonly sharing?: 'shared' | 'private' | 'locked';
}

/**
 * Options for the RUN instruction.
 * @see https://docs.docker.com/reference/dockerfile/#run
 */
export interface RunOptions {
  /** Mount filesystems during the RUN command. Accepts a single mount or an array. */
  readonly mount?: RunMountOptions | RunMountOptions[];
  /** Network mode for the RUN command. */
  readonly network?: 'default' | 'none' | 'host';
  /** Security mode for the RUN command. */
  readonly security?: 'insecure' | 'sandbox';
}

/**
 * Represents a FROM instruction in a Dockerfile.
 * Use the fluent setter methods to override parts of the FROM after creation.
 *
 * @example
 * dockerfile.getFrom('node')
 *   .tag('23-bookworm-slim')
 *   .as('build');
 */
export class FromStatement {
  private _image: string;
  private _tag: string | undefined;
  private _alias: string | undefined;
  private _platform: string | undefined;
  private _digest: string | undefined;

  constructor(image: string, tag?: string, alias?: string, platform?: string, digest?: string) {
    this._image = image;
    this._tag = tag;
    this._alias = alias;
    this._platform = platform;
    this._digest = digest;
  }

  /**
   * Overrides the base image name (e.g. "node", "alpine").
   * @param value The new image name.
   */
  public image(value: string): this {
    this._image = value;
    return this;
  }

  /**
   * Overrides the image tag (e.g. "22-bookworm-slim", "latest").
   * @param value The new tag.
   */
  public tag(value: string): this {
    this._tag = value;
    return this;
  }

  /**
   * Sets or overrides the stage alias (the AS name) for multi-stage builds.
   * @param value The alias name.
   */
  public as(value: string): this {
    this._alias = value;
    return this;
  }

  /**
   * Sets or overrides the --platform flag (e.g. "linux/amd64", "linux/arm64").
   * @param value The platform string.
   */
  public platform(value: string): this {
    this._platform = value;
    return this;
  }

  /**
   * Sets or overrides the image digest (e.g. "sha256:abc123..."). Takes precedence over tag.
   * @param value The digest string.
   */
  public digest(value: string): this {
    this._digest = value;
    return this;
  }

  /**
   * Renders the FROM instruction line.
   */
  public render(): string {
    let line = 'FROM';
    if (this._platform) {
      line += ` --platform=${this._platform}`;
    }
    if (this._digest) {
      line += ` ${this._image}@${this._digest}`;
    } else if (this._tag) {
      line += ` ${this._image}:${this._tag}`;
    } else {
      line += ` ${this._image}`;
    }
    if (this._alias) {
      line += ` AS ${this._alias}`;
    }
    return line;
  }
}

interface DockerfileStep {
  readonly id: string;
  readonly name: string;
  readonly hideComment: boolean;
  fromStatement: FromStatement | undefined;
  commands: string[];
}

/**
 * A projen file that generates a Dockerfile using a fluent, chainable API.
 *
 * Commands are organized into named steps. Each step renders as a comment
 * header followed by its commands, separated by blank lines.
 *
 * @example
 * new Dockerfile(project)
 *   .from('node', '22-bookworm-slim')
 *   .step('install', 'Install dependencies')
 *     .copy('package*.json', '/app/')
 *     .workdir('/app')
 *     .run('npm ci')
 *   .step('build', 'Build application')
 *     .copy('.', '.')
 *     .run('npm run build')
 *   .step('start', 'Start server')
 *     .cmdExec(['node', 'dist/index.js']);
 */
export class Dockerfile extends FileBase {
  private preamble: string[] = [];
  private steps: DockerfileStep[] = [];
  private currentStep: DockerfileStep | undefined;

  constructor(scope: Project, filePath: string = 'Dockerfile') {
    super(scope, filePath, {
      readonly: true,
      executable: false,
    });
  }

  protected synthesizeContent(_resolver: IResolver): string | undefined {
    for (const warning of this.validate()) {
      this.project.logger.warn(`[Dockerfile] ${warning}`);
    }

    const lines: string[] = [];
    if (this.marker) {
      lines.push(`# ${this.marker}`);
    }
    lines.push(...this.preamble);
    for (const s of this.steps) {
      lines.push('');
      if (!s.hideComment) {
        lines.push(`# ${s.name} (step-id: ${s.id})`);
      }
      if (s.fromStatement) {
        lines.push(s.fromStatement.render());
      }
      lines.push(...s.commands);
    }
    return lines.join('\n');
  }

  private allLines(): string[] {
    const lines: string[] = [...this.preamble];
    for (const s of this.steps) {
      if (s.fromStatement) {
        lines.push(s.fromStatement.render());
      }
      lines.push(...s.commands);
    }
    return lines;
  }

  /**
   * Validates the Dockerfile and returns a list of warnings.
   *
   * Checks for common issues:
   * - Missing FROM instruction
   * - Using 'latest' tag or no tag on base images
   * - Missing HEALTHCHECK
   * - Using ADD where COPY would suffice
   * - COPY . before package install (breaks layer caching)
   */
  validate(): string[] {
    const warnings: string[] = [];
    const lines = this.allLines();

    const hasFrom = lines.some((l) => l.startsWith('FROM '));
    const hasHealthcheck = lines.some((l) => l.startsWith('HEALTHCHECK '));

    if (!hasFrom) {
      warnings.push('Dockerfile has no FROM instruction.');
    }

    // Check for 'latest' tag or missing tag (implies latest)
    for (const line of lines) {
      if (line.startsWith('FROM ')) {
        const ref = line.replace(/^FROM\s+(--\S+\s+)*/, '').split(/\s/)[0];
        if (ref === 'scratch') continue;
        if (ref.includes(':latest')) {
          warnings.push(`Avoid using the 'latest' tag: "${line}". Pin a specific version for reproducible builds.`);
        } else if (!ref.includes(':') && !ref.includes('@')) {
          warnings.push(`No tag specified in "${line}" (defaults to 'latest'). Pin a specific version for reproducible builds.`);
        }
      }
    }

    if (!hasHealthcheck) {
      warnings.push('No HEALTHCHECK instruction found. Consider adding one for production containers.');
    }

    // Check for ADD where COPY would suffice (no URL, no tar extraction)
    for (const line of lines) {
      if (line.startsWith('ADD ') && !line.includes('http://') && !line.includes('https://') && !line.includes('.tar')) {
        warnings.push(`Consider using COPY instead of ADD: "${line}". ADD has implicit tar extraction and URL fetching — use COPY unless you need those features.`);
      }
    }

    // Check for COPY . before package install (cache busting in Node/Python/etc.)
    let lastCopyAllIndex = -1;
    let firstInstallIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (/^COPY\s+\.\s/.test(l) || /^COPY\s+\.\s*$/.test(l)) {
        lastCopyAllIndex = i;
      }
      if (/^RUN\s.*(npm install|npm ci|yarn install|pip install|pnpm install|bun install)/.test(l)) {
        if (firstInstallIndex === -1) firstInstallIndex = i;
      }
    }
    if (lastCopyAllIndex !== -1 && firstInstallIndex !== -1 && lastCopyAllIndex < firstInstallIndex) {
      warnings.push("'COPY . ' appears before a package install command. This breaks Docker layer caching — copy dependency files first, install, then copy the rest.");
    }

    return warnings;
  }

  // --- Step management ---

  /**
   * Creates a new named step. Subsequent commands are added to this step.
   * The step renders as a comment with the name and step-id, followed by its commands.
   * @param id Unique identifier for the step. Used with editFromEndOfStep() and overrideStep().
   * @param name Human-readable description shown as a comment in the generated Dockerfile.
   */
  step(id: string, name: string): this {
    const existing = this.steps.find((s) => s.id === id);
    if (existing) {
      throw new Error(`Step with id "${id}" already exists. Use editFromEndOfStep() or overrideStep() instead.`);
    }
    const s: DockerfileStep = { id, name, hideComment: false, fromStatement: undefined, commands: [] };
    this.steps.push(s);
    this.currentStep = s;
    return this;
  }

  /**
   * Selects an existing step by id. Subsequent commands are appended at the end of that step.
   * Use this to extend a step that was previously defined.
   * @param id The step id to edit. Check the generated Dockerfile for step-id values.
   */
  editFromEndOfStep(id: string): this {
    const existing = this.steps.find((s) => s.id === id);
    if (!existing) {
      throw new Error(`Step with id "${id}" not found.`);
    }
    this.currentStep = existing;
    return this;
  }

  /**
   * Clears all commands from an existing step and selects it. Subsequent commands replace the old ones.
   * @param id The step id to override. Check the generated Dockerfile for step-id values.
   */
  overrideStep(id: string): this {
    const existing = this.steps.find((s) => s.id === id);
    if (!existing) {
      throw new Error(`Step with id "${id}" not found.`);
    }
    existing.commands = [];
    this.currentStep = existing;
    return this;
  }

  /**
   * Removes a step entirely from the Dockerfile.
   * @param id The step id to remove.
   */
  removeStep(id: string): this {
    const idx = this.steps.findIndex((s) => s.id === id);
    if (idx === -1) {
      throw new Error(`Step with id "${id}" not found.`);
    }
    this.steps.splice(idx, 1);
    if (this.currentStep?.id === id) {
      this.currentStep = undefined;
    }
    return this;
  }

  private uniqueStepId(baseId: string): string {
    if (!this.steps.some((s) => s.id === baseId)) {
      return baseId;
    }
    let counter = 2;
    while (this.steps.some((s) => s.id === `${baseId}-${counter}`)) {
      counter++;
    }
    return `${baseId}-${counter}`;
  }

  private createStepFromId(id: string, name: string): void {
    const uniqueId = this.uniqueStepId(id);
    const s: DockerfileStep = { id: uniqueId, name, hideComment: true, fromStatement: undefined, commands: [] };
    this.steps.push(s);
    this.currentStep = s;
  }

  private pushLine(line: string): void {
    if (this.currentStep) {
      this.currentStep.commands.push(line);
    } else {
      this.preamble.push(line);
    }
  }

  private replaceOrPush(prefix: string, line: string): void {
    if (this.currentStep) {
      const idx = this.currentStep.commands.findIndex((l) => l.startsWith(prefix));
      if (idx !== -1) {
        this.currentStep.commands[idx] = line;
      } else {
        this.currentStep.commands.push(line);
      }
      return;
    }
    const idx = this.preamble.findIndex((l) => l.startsWith(prefix));
    if (idx !== -1) {
      this.preamble[idx] = line;
    } else {
      this.preamble.push(line);
    }
  }

  // --- FROM ---

  /**
   * Returns the FromStatement for a given step id, allowing you to mutate it.
   *
   * @param stepId The step id (image name for from(), alias for fromAs()).
   * @example
   * dockerfile.getFrom('node')
   *   .tag('23-bookworm-slim')
   *   .as('build');
   */
  getFrom(stepId: string): FromStatement {
    const step = this.steps.find((s) => s.id === stepId);
    if (!step) {
      throw new Error(`Step with id "${stepId}" not found.`);
    }
    if (!step.fromStatement) {
      throw new Error(`Step "${stepId}" does not have a FROM statement.`);
    }
    return step.fromStatement;
  }

  /**
   * Adds a FROM instruction. Automatically creates a new step with the image name as id.
   * If a step with the same id already exists, a numeric suffix is added (e.g. "node-2").
   *
   * The FROM can be modified later via getFrom(id).
   * @param image The base image name (e.g. "node", "alpine").
   * @param tag Optional image tag (e.g. "22-bookworm-slim"). Omit to use the image without a tag.
   * @see https://docs.docker.com/reference/dockerfile/#from
   */
  from(image: string, tag?: string): this {
    const stmt = new FromStatement(image, tag);
    this.createStepFromId(image, `FROM ${stmt.render().substring(5)}`);
    this.currentStep!.fromStatement = stmt;
    return this;
  }

  /**
   * Adds a FROM ... AS instruction for multi-stage builds. Creates a step with the alias as id.
   *
   * The FROM can be modified later via getFrom(id).
   * @param image The base image name.
   * @param tag The image tag.
   * @param alias The stage alias, used as the step id and referenced by COPY --from.
   * @see https://docs.docker.com/reference/dockerfile/#from
   */
  fromAs(image: string, tag: string, alias: string): this {
    const stmt = new FromStatement(image, tag, alias);
    this.createStepFromId(alias, `FROM ${stmt.render().substring(5)}`);
    this.currentStep!.fromStatement = stmt;
    return this;
  }

  /**
   * Adds a FROM instruction with an explicit --platform flag.
   *
   * The FROM can be modified later via getFrom(id).
   * @param platform The target platform (e.g. "linux/amd64", "linux/arm64").
   * @param image The base image name.
   * @param tag Optional image tag.
   * @param alias Optional stage alias for multi-stage builds.
   * @see https://docs.docker.com/reference/dockerfile/#from
   */
  fromPlatform(platform: string, image: string, tag?: string, alias?: string): this {
    const stmt = new FromStatement(image, tag, alias, platform);
    const id = alias ?? image;
    this.createStepFromId(id, `FROM ${stmt.render().substring(5)}`);
    this.currentStep!.fromStatement = stmt;
    return this;
  }

  /**
   * Adds a FROM instruction pinned to a specific image digest.
   *
   * The FROM can be modified later via getFrom(id).
   * @param image The base image name.
   * @param digest The image digest (e.g. "sha256:abc123...").
   * @param alias Optional stage alias for multi-stage builds.
   * @see https://docs.docker.com/reference/dockerfile/#from
   */
  fromDigest(image: string, digest: string, alias?: string): this {
    const stmt = new FromStatement(image, undefined, alias, undefined, digest);
    const id = alias ?? image;
    this.createStepFromId(id, `FROM ${stmt.render().substring(5)}`);
    this.currentStep!.fromStatement = stmt;
    return this;
  }

  // --- RUN ---

  private formatMount(m: RunMountOptions): string {
    const parts = [`type=${m.type}`];
    if (m.target) parts.push(`target=${m.target}`);
    if (m.source) parts.push(`source=${m.source}`);
    if (m.from) parts.push(`from=${m.from}`);
    if (m.readOnly) parts.push('readonly');
    if (m.id) parts.push(`id=${m.id}`);
    if (m.sharing) parts.push(`sharing=${m.sharing}`);
    return `--mount=${parts.join(',')}`;
  }

  private formatRunFlags(options?: RunOptions): string {
    let flags = '';
    if (options?.mount) {
      const mounts = Array.isArray(options.mount) ? options.mount : [options.mount];
      for (const m of mounts) {
        flags += ` ${this.formatMount(m)}`;
      }
    }
    if (options?.network) flags += ` --network=${options.network}`;
    if (options?.security) flags += ` --security=${options.security}`;
    return flags;
  }

  /**
   * Adds a RUN instruction using shell form.
   * @param command The shell command to run (e.g. "npm install").
   * @param options Optional flags for --mount, --network, --security.
   * @see https://docs.docker.com/reference/dockerfile/#run
   */
  run(command: string, options?: RunOptions): this {
    const flags = this.formatRunFlags(options);
    this.pushLine(`RUN${flags} ${command}`);
    return this;
  }

  /**
   * Adds a RUN instruction with multiple commands joined by "&&" and line continuations.
   * @param commands Array of shell commands to chain together.
   * @param options Optional flags for --mount, --network, --security.
   * @see https://docs.docker.com/reference/dockerfile/#run
   */
  runMultiline(commands: string[], options?: RunOptions): this {
    const flags = this.formatRunFlags(options);
    const joined = commands.join(' \\\n    && ');
    this.pushLine(`RUN${flags} ${joined}`);
    return this;
  }

  /**
   * Adds a RUN instruction using exec form (JSON array).
   * @param commands The command and its arguments as an array (e.g. ["npm", "ci"]).
   * @param options Optional flags for --mount, --network, --security.
   * @see https://docs.docker.com/reference/dockerfile/#run
   */
  runExec(commands: string[], options?: RunOptions): this {
    const flags = this.formatRunFlags(options);
    const json = JSON.stringify(commands);
    this.pushLine(`RUN${flags} ${json}`);
    return this;
  }

  // --- CMD ---

  /**
   * Sets the default command using shell form. Calling this again replaces the previous CMD.
   * @param command The shell command (e.g. "npm start").
   * @see https://docs.docker.com/reference/dockerfile/#cmd
   */
  cmd(command: string): this {
    this.replaceOrPush('CMD ', `CMD ${command}`);
    return this;
  }

  /**
   * Sets the default command using exec form (JSON array). Calling this again replaces the previous CMD.
   * @param commands The command and its arguments (e.g. ["node", "server.js"]).
   * @see https://docs.docker.com/reference/dockerfile/#cmd
   */
  cmdExec(commands: string[]): this {
    this.replaceOrPush('CMD ', `CMD ${JSON.stringify(commands)}`);
    return this;
  }

  // --- ENTRYPOINT ---

  /**
   * Sets the container entrypoint using shell form. Calling this again replaces the previous ENTRYPOINT.
   * @param command The shell command.
   * @see https://docs.docker.com/reference/dockerfile/#entrypoint
   */
  entrypoint(command: string): this {
    this.replaceOrPush('ENTRYPOINT ', `ENTRYPOINT ${command}`);
    return this;
  }

  /**
   * Sets the container entrypoint using exec form (JSON array). Calling this again replaces the previous ENTRYPOINT.
   * @param commands The command and its arguments (e.g. ["node", "server.js"]).
   * @see https://docs.docker.com/reference/dockerfile/#entrypoint
   */
  entrypointExec(commands: string[]): this {
    this.replaceOrPush('ENTRYPOINT ', `ENTRYPOINT ${JSON.stringify(commands)}`);
    return this;
  }

  // --- COPY ---

  /**
   * Adds a COPY instruction to copy files from the build context into the image.
   * @param src Source path(s) — a single string or an array for multiple sources.
   * @param dest Destination path inside the image.
   * @param options Optional flags (--from, --chown, --chmod, --link, --parents, --exclude).
   * @see https://docs.docker.com/reference/dockerfile/#copy
   */
  copy(src: string | string[], dest: string, options?: CopyOptions): this {
    const srcs = Array.isArray(src) ? src : [src];
    let flags = '';
    if (options?.from) flags += ` --from=${options.from}`;
    if (options?.chown) flags += ` --chown=${options.chown}`;
    if (options?.chmod) flags += ` --chmod=${options.chmod}`;
    if (options?.link) flags += ' --link';
    if (options?.parents) flags += ' --parents';
    if (options?.exclude) {
      for (const e of options.exclude) {
        flags += ` --exclude=${e}`;
      }
    }
    this.pushLine(`COPY${flags} ${srcs.join(' ')} ${dest}`);
    return this;
  }

  // --- ADD ---

  /**
   * Adds an ADD instruction. Prefer COPY unless you need tar auto-extraction or URL fetching.
   * @param src Source path(s) — a single string or an array for multiple sources.
   * @param dest Destination path inside the image.
   * @param options Optional flags (--from, --chown, --chmod, --link, --keep-git-dir, --checksum, --exclude).
   * @see https://docs.docker.com/reference/dockerfile/#add
   */
  add(src: string | string[], dest: string, options?: AddOptions): this {
    const srcs = Array.isArray(src) ? src : [src];
    let flags = '';
    if (options?.from) flags += ` --from=${options.from}`;
    if (options?.chown) flags += ` --chown=${options.chown}`;
    if (options?.chmod) flags += ` --chmod=${options.chmod}`;
    if (options?.link) flags += ' --link';
    if (options?.keepGitDir) flags += ' --keep-git-dir';
    if (options?.checksum) flags += ` --checksum=${options.checksum}`;
    if (options?.exclude) {
      for (const e of options.exclude) {
        flags += ` --exclude=${e}`;
      }
    }
    this.pushLine(`ADD${flags} ${srcs.join(' ')} ${dest}`);
    return this;
  }

  // --- WORKDIR ---

  /**
   * Sets the working directory for subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions.
   * @param path The directory path (e.g. "/app").
   * @see https://docs.docker.com/reference/dockerfile/#workdir
   */
  workdir(path: string): this {
    this.pushLine(`WORKDIR ${path}`);
    return this;
  }

  // --- ENV ---

  private quoteIfNeeded(value: string): string {
    return value.includes(' ') || value.includes('"') ? `"${value.replace(/"/g, '\\"')}"` : value;
  }

  /**
   * Sets one or more environment variables. Values with spaces are automatically quoted.
   * @param entries Array of key-value pairs.
   * @see https://docs.docker.com/reference/dockerfile/#env
   */
  env(entries: EnvEntry[]): this {
    const pairs = entries.map((e) => `${e.key}=${this.quoteIfNeeded(e.value)}`).join(' ');
    this.pushLine(`ENV ${pairs}`);
    return this;
  }

  /**
   * Sets a single environment variable. Values with spaces are automatically quoted.
   * @param key The variable name.
   * @param value The variable value.
   * @see https://docs.docker.com/reference/dockerfile/#env
   */
  envKeyValue(key: string, value: string): this {
    this.pushLine(`ENV ${key}=${this.quoteIfNeeded(value)}`);
    return this;
  }

  // --- ARG ---

  /**
   * Declares a build argument that can be passed with --build-arg.
   * @param name The argument name.
   * @param defaultValue Optional default value if not provided at build time.
   * @see https://docs.docker.com/reference/dockerfile/#arg
   */
  arg(name: string, defaultValue?: string): this {
    const val = defaultValue !== undefined ? `=${defaultValue}` : '';
    this.pushLine(`ARG ${name}${val}`);
    return this;
  }

  // --- LABEL ---

  /**
   * Adds metadata labels to the image. Values with spaces are automatically quoted.
   * @param entries Array of key-value pairs.
   * @see https://docs.docker.com/reference/dockerfile/#label
   */
  label(entries: LabelEntry[]): this {
    const pairs = entries.map((e) => `${e.key}=${this.quoteIfNeeded(e.value)}`).join(' ');
    this.pushLine(`LABEL ${pairs}`);
    return this;
  }

  // --- EXPOSE ---

  /**
   * Documents that the container listens on the specified port at runtime.
   * @param port The port number.
   * @param protocol Optional protocol — "tcp" (default) or "udp".
   * @see https://docs.docker.com/reference/dockerfile/#expose
   */
  expose(port: number, protocol?: 'tcp' | 'udp'): this {
    const proto = protocol ? `/${protocol}` : '';
    this.pushLine(`EXPOSE ${port}${proto}`);
    return this;
  }

  /**
   * Documents multiple ports the container listens on.
   * @param ports Port numbers or "port/protocol" strings (e.g. 80, "443/tcp", "53/udp").
   * @see https://docs.docker.com/reference/dockerfile/#expose
   */
  exposePorts(...ports: Array<number | string>): this {
    this.pushLine(`EXPOSE ${ports.join(' ')}`);
    return this;
  }

  // --- VOLUME ---

  /**
   * Creates a mount point for externally mounted volumes.
   * @param paths One or more paths inside the container.
   * @see https://docs.docker.com/reference/dockerfile/#volume
   */
  volume(...paths: string[]): this {
    if (paths.length === 1) {
      this.pushLine(`VOLUME ${paths[0]}`);
    } else {
      this.pushLine(`VOLUME ${JSON.stringify(paths)}`);
    }
    return this;
  }

  // --- USER ---

  /**
   * Sets the user (and optionally group) for subsequent RUN, CMD, and ENTRYPOINT instructions.
   * @param user The username or UID.
   * @param group Optional group name or GID.
   * @see https://docs.docker.com/reference/dockerfile/#user
   */
  user(user: string, group?: string): this {
    const g = group ? `:${group}` : '';
    this.pushLine(`USER ${user}${g}`);
    return this;
  }

  // --- HEALTHCHECK ---

  /**
   * Configures a health check command that Docker runs periodically to verify the container is healthy.
   * @param command The health check command (e.g. "curl -f http://localhost/ || exit 1").
   * @param options Optional timing and retry configuration.
   * @see https://docs.docker.com/reference/dockerfile/#healthcheck
   */
  healthcheck(command: string, options?: HealthcheckOptions): this {
    let flags = '';
    if (options?.interval) flags += ` --interval=${options.interval}`;
    if (options?.timeout) flags += ` --timeout=${options.timeout}`;
    if (options?.startPeriod) flags += ` --start-period=${options.startPeriod}`;
    if (options?.startInterval) flags += ` --start-interval=${options.startInterval}`;
    if (options?.retries !== undefined) flags += ` --retries=${options.retries}`;
    this.pushLine(`HEALTHCHECK${flags} CMD ${command}`);
    return this;
  }

  /**
   * Disables any health check inherited from the base image.
   * @see https://docs.docker.com/reference/dockerfile/#healthcheck
   */
  healthcheckNone(): this {
    this.pushLine('HEALTHCHECK NONE');
    return this;
  }

  // --- SHELL ---

  /**
   * Overrides the default shell used for shell-form commands.
   * @param commands The shell and its arguments (e.g. ["/bin/bash", "-c"]).
   * @see https://docs.docker.com/reference/dockerfile/#shell
   */
  shell(commands: string[]): this {
    this.pushLine(`SHELL ${JSON.stringify(commands)}`);
    return this;
  }

  // --- STOPSIGNAL ---

  /**
   * Sets the system call signal sent to the container to initiate a graceful stop.
   * @param signal The signal name or number (e.g. "SIGTERM", "9").
   * @see https://docs.docker.com/reference/dockerfile/#stopsignal
   */
  stopsignal(signal: string): this {
    this.pushLine(`STOPSIGNAL ${signal}`);
    return this;
  }

  // --- ONBUILD ---

  /**
   * Registers a trigger instruction that runs when this image is used as a base for another build.
   * @param instruction The full Dockerfile instruction to defer (e.g. "RUN npm install").
   * @see https://docs.docker.com/reference/dockerfile/#onbuild
   */
  onbuild(instruction: string): this {
    this.pushLine(`ONBUILD ${instruction}`);
    return this;
  }

  // --- MAINTAINER (deprecated but still supported) ---

  /**
   * Sets the maintainer field. Deprecated — use a LABEL instead.
   * @param name The maintainer name and/or email.
   * @deprecated Use label() with a "maintainer" key instead.
   * @see https://docs.docker.com/reference/dockerfile/#maintainer
   */
  maintainer(name: string): this {
    this.pushLine(`MAINTAINER ${name}`);
    return this;
  }

  // --- Utility methods ---

  /**
   * Adds a comment line to the Dockerfile.
   * @param text The comment text (without the leading "# ").
   */
  comment(text: string): this {
    this.pushLine(`# ${text}`);
    return this;
  }

  /**
   * Adds a blank line to the Dockerfile for readability.
   */
  blankLine(): this {
    this.pushLine('');
    return this;
  }

  /**
   * Adds a raw line to the Dockerfile without any processing.
   * @param line The exact line to add.
   */
  raw(line: string): this {
    this.pushLine(line);
    return this;
  }
}
