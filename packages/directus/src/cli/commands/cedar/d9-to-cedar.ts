import { mkdir, rm, writeFile } from 'fs/promises';
import * as cedar from '@cedar-policy/cedar-wasm/nodejs';
import type { PolicyJson } from '@cedar-policy/cedar-wasm/nodejs';
import { translateToCedar } from './cedar-translations';
import { D9Permission } from './d9-permission';
import { RolesTable } from './roles-table';
import { readCsvFile } from '../save/utils';

export class CedarManager {
  public permissionPath: string;
  public sqlPath: string;

  public fieldsPolicies: Map<string, PolicyJson[]> = new Map();
  public mainPolicies: Map<string, PolicyJson[]> = new Map();
  public validationPolicies: Map<string, PolicyJson[]> = new Map();

  public roles!: RolesTable;
  public d9Permissions: D9Permission[] = [];

  constructor(opts?: { permissionPath?: string; sqlPath?: string }) {
    this.permissionPath = opts?.permissionPath || './permissions';
    this.sqlPath = opts?.sqlPath || './sql/data';
  }

  public async readPermissionFile() {
    const permissions = await readCsvFile(
      `${this.sqlPath}/directus_permissions.csv`,
    );
    this.d9Permissions = permissions.map((p) => new D9Permission(p));
  }

  public async readRoleFile() {
    this.roles = await RolesTable.load(this.sqlPath);
    for (const permission of this.d9Permissions) {
      permission.roleName = permission.role
        ? this.roles.getNameFromId(permission.role)!
        : 'Public';
    }
  }

  public refactoPolicies(
    policyKey: 'mainPolicies' | 'fieldsPolicies' | 'validationPolicies',
  ) {
    for (const [groupName, policies] of this[policyKey]) {
      const groupedPolicies = new Map<string, any[]>();
      for (const policy of policies) {
        const conditionsKey = JSON.stringify(policy.conditions.map((c) => c.body));
        if (!groupedPolicies.has(conditionsKey)) {
          groupedPolicies.set(conditionsKey, []);
        }
        groupedPolicies.get(conditionsKey)!.push(policy);
      }
      // Combine policies in each group
      const refactored: any[] = [];

      for (const group of groupedPolicies.values()) {
        if (group.length === 1) {
          // No optimization needed for single policy
          refactored.push(group[0]);
        } else {
          // Multiple policies with same conditions - combine actions
          const actions = group
            .map((p) => p.action.entity)
            .sort((a, b) => `${a.id}${a.type}`.localeCompare(`${b.id}${b.type}`));

          // Create combined policy with "action in [...]"
          const combinedPolicy = {
            effect: group[0].effect,
            principal: group[0].principal,
            action: {
              op: 'in',
              entities: actions,
            },
            resource: group[0].resource,
            conditions: group[0].conditions,
          };
          refactored.push(combinedPolicy);
        }
      }
      this[policyKey].set(groupName, refactored);
    }
  }

  public sortPolicies(
    policyKey: 'mainPolicies' | 'fieldsPolicies' | 'validationPolicies',
  ) {
    for (const [groupName, policies] of this[policyKey]) {
      this[policyKey].set(
        groupName,
        policies.sort((p1, p2) => {
          const a1 = p1.action as any;
          const a2 = p2.action as any;
          const t1 = (a1.entities?.[0] || a1.entity).type;
          const t2 = (a2.entities?.[0] || a2.entity).type;
          return t1.localeCompare(t2);
        }),
      );
    }
  }

  public async translateAndSortPermission() {
    for (const permission of this.d9Permissions) {
      const cedarPolicies = await translateToCedar(permission);
      const mainPolicies = this.mainPolicies.get(permission.roleName) || [];
      this.mainPolicies.set(permission.roleName, [
        ...mainPolicies,
        cedarPolicies.mainPolicy,
      ]);
      if (cedarPolicies.fieldPolicy) {
        const fieldPolicies = this.fieldsPolicies.get(permission.roleName) || [];
        this.fieldsPolicies.set(permission.roleName, [
          ...fieldPolicies,
          cedarPolicies.fieldPolicy,
        ]);
      }
      if (cedarPolicies.validationPolicy) {
        const validationPolicies =
          this.validationPolicies.get(permission.roleName) || [];
        this.validationPolicies.set(permission.roleName, [
          ...validationPolicies,
          cedarPolicies.validationPolicy,
        ]);
      }
    }
    const policyKeys: (
      | 'mainPolicies'
      | 'fieldsPolicies'
      | 'validationPolicies'
    )[] = ['mainPolicies', 'fieldsPolicies', 'validationPolicies'];
    for (const pKey of policyKeys) {
      this.refactoPolicies(pKey);
      this.sortPolicies(pKey);
    }
  }

  public async writePoliciesToFile(
    roleName: string,
    fileTitle: string,
    policies: PolicyJson[],
  ) {
    await mkdir(`${this.permissionPath}/${roleName}`, { recursive: true });
    const policiesText = policies.map((policy) => {
      const result = cedar.policyToText(policy);
      if (result.type === 'success') {
        return result.text;
      } else {
        console.error('failed to transform policy into text');
        console.error(policy);
        throw new Error(result.errors as any);
      }
    });
    const policiesCombined = policiesText.join('\n\n');
    const formattedPolicies = cedar.formatPolicies({
      policyText: policiesCombined,
      lineWidth: 100,
      indentWidth: 2,
    });
    if (formattedPolicies.type === 'failure') {
      throw new Error(formattedPolicies as any);
    }
    await writeFile(
      `${this.permissionPath}/${roleName}/${fileTitle}`,
      formattedPolicies.formatted_policy,
    );
  }

  public async writePolicies(
    policyKey: 'mainPolicies' | 'fieldsPolicies' | 'validationPolicies',
    fileName: string,
  ) {
    for (const [group, policies] of this[policyKey]) {
      await this.writePoliciesToFile(group, fileName, policies);
    }
  }

  public async readCsvAndWriteAllFiles() {
    console.log('read permission file');
    await this.readPermissionFile();
    console.log(`found ${this.d9Permissions.length} permissions`);
    console.log('read role file');
    await this.readRoleFile();
    console.log('roles imported');
    console.log('grouping and sorting permissions');
    await this.translateAndSortPermission();
    console.log(
      `having ${this.mainPolicies.size} main policies and ${this.fieldsPolicies.size} fields policies`,
    );
    console.log('writing cedar policies files');
    await this.writePolicies('mainPolicies', 'authorize.cedar');
    await this.writePolicies('fieldsPolicies', 'check-fields.cedar');
    await this.writePolicies('validationPolicies', 'validate.cedar');
    console.log('files wroten');
  }
}

/**
 * CLI action: regenerate the Cedar policy folders from directus_permissions.csv.
 * The folder is wiped first, reproducing what `formatePermission` does in app-api2,
 * so a role removed from the CSV leaves no orphan files.
 */
export async function d9ToCedar(options?: {
  permissionPath?: string;
  sqlPath?: string;
}): Promise<void> {
  const manager = new CedarManager(options);
  await rm(manager.permissionPath, { recursive: true, force: true });
  await manager.readCsvAndWriteAllFiles();
}
