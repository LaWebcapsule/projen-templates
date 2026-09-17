import { readCsvFile } from '../save/utils';

interface Role {
  id: string;
  name: string;
}

/** Lookup over `directus_roles.csv`, shared by the d9<->cedar managers. */
export class RolesTable {
  public static async load(sqlPath: string): Promise<RolesTable> {
    const table = new RolesTable();
    const roles = (await readCsvFile(`${sqlPath}/directus_roles.csv`)) as (Role &
      Record<string, string>)[];
    for (const role of roles) {
      table.byId.set(role.id, role);
      table.byName.set(role.name, role);
    }
    return table;
  }

  public byId: Map<string, Role> = new Map();
  public byName: Map<string, Role> = new Map();

  public getNameFromId(id: string) {
    return this.byId.get(id)?.name;
  }

  /** Role UUID for a role name; `''` for the implicit `Public` role. */
  public getIdFromName(roleName: string) {
    return roleName === 'Public' ? '' : this.byName.get(roleName)?.id;
  }
}
