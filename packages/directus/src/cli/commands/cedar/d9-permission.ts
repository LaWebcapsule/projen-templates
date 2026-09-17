/** The `Filter` type of `@wbce-d9/types`, inlined so the CLI does not depend on it. */
export type Filter = Record<string, any>;

function parseStringFieldToJSON(field?: string) {
  return field?.length ? JSON.parse(field) : undefined;
}

/**
 * A directus permission, shared by both translation directions:
 *  - forward (d9-to-cedar): `new D9Permission(row)` parses a CSV row;
 *  - reverse (cedar-to-d9): `D9Permission.empty(...)` starts a blank permission that
 *    is filled as each `.cedar` file is parsed, then rendered back via `*Cell()`.
 * `id`/`role`/`presets` are CSV-only columns, populated only on the forward side.
 */
export class D9Permission {
  /** Blank permission to accumulate reconstructed Cedar clauses onto (reverse direction). */
  public static empty(
    roleName: string,
    collection: string,
    action: string,
  ): D9Permission {
    const perm: D9Permission = Object.create(D9Permission.prototype);
    perm.roleName = roleName;
    perm.collection = collection;
    perm.action = action;
    return perm;
  }

  public roleName!: string;
  public collection: string;
  public action: string;
  public permissions?: Filter;
  public validation?: Filter;
  public fields?: string[];

  public id?: number;
  public role?: string;
  public presets?: Record<string, any>;

  /** Parse a `directus_permissions.csv` row. `roleName` is resolved separately from the role UUID. */
  constructor(row: Record<string, string>) {
    this.collection = row.collection;
    this.action = row.action;
    this.id = Number(row.id);
    this.role = row.role;
    this.permissions = parseStringFieldToJSON(row.permissions);
    this.validation = parseStringFieldToJSON(row.validation);
    this.fields = row.fields?.split(',') || [];
    this.presets = parseStringFieldToJSON(row.presets);
  }

  public permissionsCell(): string {
    return JSON.stringify(this.permissions ?? {});
  }

  public validationCell(): string {
    return JSON.stringify(this.validation ?? {});
  }

  public fieldsCell(): string {
    return this.fields ? this.fields.join(',') : '*';
  }
}
