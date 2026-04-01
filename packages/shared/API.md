# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

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
| <code><a href="#@wbce/projen-shared.GitHubConfigOptions.property.dependabot">dependabot</a></code> | <code>boolean \| projen.github.DependabotOptions</code> | /* dependencies. |
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

##### `dependabot`<sup>Optional</sup> <a name="dependabot" id="@wbce/projen-shared.GitHubConfigOptions.property.dependabot"></a>

```typescript
public readonly dependabot: boolean | DependabotOptions;
```

- *Type:* boolean | projen.github.DependabotOptions
- *Default:* true

/* dependencies.

Pass `true` for defaults, or a `DependabotOptions` object to customise.

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



