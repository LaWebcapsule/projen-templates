# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Keycloak <a name="Keycloak" id="@wbce/projen-keycloak.Keycloak"></a>

Adds Keycloak OpenID Connect SSO + MFA to a {@link D9Project}: the OIDC env on the d9 service, the `keycloak-sync` user-provisioning hook, and a preconfigured realm (browser-sms MFA flow) + a Keycloak image with the MFA plugins — assets you deploy to your own Keycloak.

*Example*

```typescript
const project = new D9Project({ name: 'my-d9', defaultReleaseBranch: 'main' });
new Keycloak(project, {
  issuerUrl: 'https://auth.example.com',
  apiUrl: 'https://api.example.com',
  frontUrl: 'https://app.example.com',
});
project.synth();
```


#### Initializers <a name="Initializers" id="@wbce/projen-keycloak.Keycloak.Initializer"></a>

```typescript
import { Keycloak } from '@wbce/projen-keycloak'

new Keycloak(project: D9Project, options: KeycloakOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-keycloak.Keycloak.Initializer.parameter.project">project</a></code> | <code>@wbce/projen-d9.D9Project</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.Keycloak.Initializer.parameter.options">options</a></code> | <code><a href="#@wbce/projen-keycloak.KeycloakOptions">KeycloakOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-keycloak.Keycloak.Initializer.parameter.project"></a>

- *Type:* @wbce/projen-d9.D9Project

---

##### `options`<sup>Required</sup> <a name="options" id="@wbce/projen-keycloak.Keycloak.Initializer.parameter.options"></a>

- *Type:* <a href="#@wbce/projen-keycloak.KeycloakOptions">KeycloakOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-keycloak.Keycloak.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="@wbce/projen-keycloak.Keycloak.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@wbce/projen-keycloak.Keycloak.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@wbce/projen-keycloak.Keycloak.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `postSynthesize` <a name="postSynthesize" id="@wbce/projen-keycloak.Keycloak.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@wbce/projen-keycloak.Keycloak.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="@wbce/projen-keycloak.Keycloak.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wbce/projen-keycloak.Keycloak.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="@wbce/projen-keycloak.Keycloak.isConstruct"></a>

```typescript
import { Keycloak } from '@wbce/projen-keycloak'

Keycloak.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-keycloak.Keycloak.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="@wbce/projen-keycloak.Keycloak.isComponent"></a>

```typescript
import { Keycloak } from '@wbce/projen-keycloak'

Keycloak.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="@wbce/projen-keycloak.Keycloak.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-keycloak.Keycloak.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wbce/projen-keycloak.Keycloak.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@wbce/projen-keycloak.Keycloak.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="@wbce/projen-keycloak.Keycloak.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


## Structs <a name="Structs" id="Structs"></a>

### KeycloakOptions <a name="KeycloakOptions" id="@wbce/projen-keycloak.KeycloakOptions"></a>

#### Initializer <a name="Initializer" id="@wbce/projen-keycloak.KeycloakOptions.Initializer"></a>

```typescript
import { KeycloakOptions } from '@wbce/projen-keycloak'

const keycloakOptions: KeycloakOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.apiUrl">apiUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.issuerUrl">issuerUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.clientId">clientId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.defaultRole">defaultRole</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.frontUrl">frontUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.publicRegistration">publicRegistration</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.realm">realm</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.smtp">smtp</a></code> | <code><a href="#@wbce/projen-keycloak.KeycloakSmtp">KeycloakSmtp</a></code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakOptions.property.userSync">userSync</a></code> | <code>boolean</code> | *No description.* |

---

##### `apiUrl`<sup>Required</sup> <a name="apiUrl" id="@wbce/projen-keycloak.KeycloakOptions.property.apiUrl"></a>

```typescript
public readonly apiUrl: string;
```

- *Type:* string

---

##### `issuerUrl`<sup>Required</sup> <a name="issuerUrl" id="@wbce/projen-keycloak.KeycloakOptions.property.issuerUrl"></a>

```typescript
public readonly issuerUrl: string;
```

- *Type:* string

---

##### `clientId`<sup>Optional</sup> <a name="clientId" id="@wbce/projen-keycloak.KeycloakOptions.property.clientId"></a>

```typescript
public readonly clientId: string;
```

- *Type:* string

---

##### `defaultRole`<sup>Optional</sup> <a name="defaultRole" id="@wbce/projen-keycloak.KeycloakOptions.property.defaultRole"></a>

```typescript
public readonly defaultRole: string;
```

- *Type:* string

---

##### `frontUrl`<sup>Optional</sup> <a name="frontUrl" id="@wbce/projen-keycloak.KeycloakOptions.property.frontUrl"></a>

```typescript
public readonly frontUrl: string;
```

- *Type:* string

---

##### `publicRegistration`<sup>Optional</sup> <a name="publicRegistration" id="@wbce/projen-keycloak.KeycloakOptions.property.publicRegistration"></a>

```typescript
public readonly publicRegistration: boolean;
```

- *Type:* boolean

---

##### `realm`<sup>Optional</sup> <a name="realm" id="@wbce/projen-keycloak.KeycloakOptions.property.realm"></a>

```typescript
public readonly realm: string;
```

- *Type:* string

---

##### `smtp`<sup>Optional</sup> <a name="smtp" id="@wbce/projen-keycloak.KeycloakOptions.property.smtp"></a>

```typescript
public readonly smtp: KeycloakSmtp;
```

- *Type:* <a href="#@wbce/projen-keycloak.KeycloakSmtp">KeycloakSmtp</a>

---

##### `userSync`<sup>Optional</sup> <a name="userSync" id="@wbce/projen-keycloak.KeycloakOptions.property.userSync"></a>

```typescript
public readonly userSync: boolean;
```

- *Type:* boolean

---

### KeycloakSmtp <a name="KeycloakSmtp" id="@wbce/projen-keycloak.KeycloakSmtp"></a>

#### Initializer <a name="Initializer" id="@wbce/projen-keycloak.KeycloakSmtp.Initializer"></a>

```typescript
import { KeycloakSmtp } from '@wbce/projen-keycloak'

const keycloakSmtp: KeycloakSmtp = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.from">from</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.host">host</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.fromDisplayName">fromDisplayName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.port">port</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.ssl">ssl</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.starttls">starttls</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@wbce/projen-keycloak.KeycloakSmtp.property.user">user</a></code> | <code>string</code> | *No description.* |

---

##### `from`<sup>Required</sup> <a name="from" id="@wbce/projen-keycloak.KeycloakSmtp.property.from"></a>

```typescript
public readonly from: string;
```

- *Type:* string

---

##### `host`<sup>Required</sup> <a name="host" id="@wbce/projen-keycloak.KeycloakSmtp.property.host"></a>

```typescript
public readonly host: string;
```

- *Type:* string

---

##### `fromDisplayName`<sup>Optional</sup> <a name="fromDisplayName" id="@wbce/projen-keycloak.KeycloakSmtp.property.fromDisplayName"></a>

```typescript
public readonly fromDisplayName: string;
```

- *Type:* string

---

##### `password`<sup>Optional</sup> <a name="password" id="@wbce/projen-keycloak.KeycloakSmtp.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `port`<sup>Optional</sup> <a name="port" id="@wbce/projen-keycloak.KeycloakSmtp.property.port"></a>

```typescript
public readonly port: string;
```

- *Type:* string

---

##### `ssl`<sup>Optional</sup> <a name="ssl" id="@wbce/projen-keycloak.KeycloakSmtp.property.ssl"></a>

```typescript
public readonly ssl: boolean;
```

- *Type:* boolean

---

##### `starttls`<sup>Optional</sup> <a name="starttls" id="@wbce/projen-keycloak.KeycloakSmtp.property.starttls"></a>

```typescript
public readonly starttls: boolean;
```

- *Type:* boolean

---

##### `user`<sup>Optional</sup> <a name="user" id="@wbce/projen-keycloak.KeycloakSmtp.property.user"></a>

```typescript
public readonly user: string;
```

- *Type:* string

---



