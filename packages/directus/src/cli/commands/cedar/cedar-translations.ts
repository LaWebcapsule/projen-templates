import type { PolicyJson } from '@cedar-policy/cedar-wasm/nodejs';
import { D9Permission, Filter } from './d9-permission';

/** Local stand-in for lodash's `isPlainObject`, which this package does not depend on. */
function isPlainObject(value: any): boolean {
  if (Object.prototype.toString.call(value) !== '[object Object]') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

function getOperation(
  key: string,
  value: Record<string, any>,
): { operator: string; value: any } {
  if (key.startsWith('_') && !['_and', '_or', '_none', '_some'].includes(key)) {
    return { operator: key as string, value };
  } else if (isPlainObject(value) === false) {
    return { operator: '_eq', value };
  }

  return getOperation(Object.keys(value)[0]!, Object.values(value)[0]);
}

function getFilterPath(key: string, value: Record<string, any>) {
  const path = [key];
  const childKey = Object.keys(value)[0]!;

  if (
    typeof childKey === 'string' &&
    childKey.startsWith('_') === true &&
    !['_none', '_some'].includes(childKey)
  ) {
    return path;
  }

  if (isPlainObject(value)) {
    path.push(...getFilterPath(childKey, Object.values(value)[0]));
  }

  return path;
}

export type ConditionSubject = 'resource' | 'context.newValue';

export function addWhenClauses(
  filter: Filter,
  subject: ConditionSubject = 'resource',
): any {
  const entries = Object.entries(filter);
  if (!entries.length) return;
  const key = entries[0][0];
  const value = entries[0][1];

  if (key === '_or' || key === '_and') {
    if (
      key === '_or' &&
      value.some(
        (subFilter: Record<string, any>) => Object.keys(subFilter).length === 0,
      )
    ) {
      return;
    }
    const left = value[0];
    const rightVal = value[1];
    const operator = key === '_or' ? '||' : '&&';
    if (rightVal) {
      return {
        [operator]: {
          left: addWhenClauses(left, subject),
          right: addWhenClauses({ [key]: value.slice(1) }, subject),
        },
      };
    } else {
      return addWhenClauses(left, subject);
    }
  }

  const filterPath = getFilterPath(key, value);
  const { operator: filterOperator, value: filterValue } = getOperation(
    key,
    value,
  );

  if (entries.length > 1) {
    delete filter[key];
    return {
      '&&': {
        left: applyFilterToQuery(filterPath, filterOperator, filterValue, subject),
        right: addWhenClauses(filter, subject),
      },
    };
  } else {
    return applyFilterToQuery(filterPath, filterOperator, filterValue, subject);
  }

  function applyFilterToQuery(
    path: string[],
    operator: string,
    compareValue: any,
    subjectVar: ConditionSubject = 'resource',
  ) {
    function buildLeft(pathSegments: string[], subj: ConditionSubject): any {
      let node: any =
        subj === 'context.newValue'
          ? { '.': { left: { Var: 'context' as const }, attr: 'newValue' } }
          : { Var: 'resource' as const };
      for (const attr of pathSegments) {
        node = { '.': { left: node, attr } };
      }
      return node;
    }

    const buildRight = (v: any) =>
      v === '$CURRENT_USER' ? { Var: 'principal' as const } : { Value: v };

    const left = buildLeft(path, subjectVar);
    const right = buildRight(compareValue);

    let expr: any = null;

    const baseForParent =
      path.length <= 1
        ? subjectVar === 'context.newValue'
          ? { '.': { left: { Var: 'context' as const }, attr: 'newValue' } }
          : { Var: 'resource' as const }
        : buildLeft(path.slice(0, -1), subjectVar);

    if (
      operator === '_null' ||
      (operator === '_nnull' && compareValue === false)
    ) {
      expr = {
        '!': {
          arg: { has: { left: baseForParent, attr: path[path.length - 1]! } },
        },
      };
    }
    if (
      operator === '_nnull' ||
      (operator === '_null' && compareValue === false)
    ) {
      expr = { has: { left: baseForParent, attr: path[path.length - 1]! } };
    }

    if (compareValue !== undefined && expr === null) {
      if (operator === '_eq') expr = { '==': { left, right } };
      if (operator === '_neq') expr = { '!=': { left, right } };
      if (operator === '_gt') expr = { '>': { left, right } };
      if (operator === '_gte') expr = { '>=': { left, right } };
      if (operator === '_lt') expr = { '<': { left, right } };
      if (operator === '_lte') expr = { '<=': { left, right } };
      if (operator === '_icontains') {
        // Cedar has no case-insensitive matching. Normalize the stored data and use
        // _contains — https://docs.cedarpolicy.com/bestpractices/bp-normalize-data-input.html
        throw new Error(
          '_icontains is not supported in Cedar policies: normalize the data (e.g. lowercase) and use _contains instead',
        );
      }
      if (operator === '_contains') {
        expr = {
          like: {
            left,
            pattern: ['Wildcard', { Literal: compareValue }, 'Wildcard'],
          },
        };
      }
      if (operator === '_starts_with') {
        expr = { like: { left, pattern: [{ Literal: compareValue }, 'Wildcard'] } };
      }
      if (operator === '_ends_with') {
        expr = { like: { left, pattern: ['Wildcard', { Literal: compareValue }] } };
      }
    }

    if (expr === null) return;
    return expr;
  }
}

export function translateToCedar(permission: D9Permission): {
  mainPolicy: PolicyJson;
  fieldPolicy?: PolicyJson;
  validationPolicy?: PolicyJson;
} {
  const principalConstraint = {
    op: 'in',
    entity: {
      type: 'd9::UserGroup',
      id: permission.roleName,
    },
  };

  const action = {
    op: '==',
    entity: {
      type: `Db::${permission.collection}::Action`,
      id: permission.action,
    },
  };

  const mainConditionBody = addWhenClauses(permission.permissions || {});

  const mainConditions = mainConditionBody
    ? [{ kind: 'when' as const, body: mainConditionBody }]
    : [];

  const mainPolicy: PolicyJson = {
    effect: 'permit',
    principal: principalConstraint as any,
    action: action as any,
    resource: { op: 'All' },
    conditions: mainConditions as any,
  };

  // Field-level policy only when there is a fields restriction and/or validation
  const fields = permission.fields ?? [];
  const hasFields = fields.length > 0;
  const hasValidationCond =
    permission.validation && Object.entries(permission.validation).length > 0;

  let fieldPolicy: PolicyJson | undefined;
  let validationPolicy: PolicyJson | undefined;
  if (hasFields) {
    const fieldConditions: Array<{ kind: 'when'; body: any }> = [];

    fieldConditions.push({
      kind: 'when',
      body: {
        containsAll: {
          left: { Value: fields },
          right: {
            '.': {
              left: { Var: 'context' },
              attr: 'requestedFields',
            },
          },
        },
      },
    });
    fieldPolicy = {
      effect: 'permit',
      principal: principalConstraint as any,
      action: action as any,
      resource: { op: 'All' },
      conditions: fieldConditions,
    };
  }

  if (hasValidationCond) {
    const validationConditions: Array<{ kind: 'when'; body: any }> = [];

    const validationBody = addWhenClauses(
      permission.validation || {},
      'context.newValue',
    );
    validationConditions.push({ kind: 'when', body: validationBody });

    validationPolicy = {
      effect: 'permit',
      principal: principalConstraint as any,
      action: action as any,
      resource: { op: 'All' },
      conditions: validationConditions as any,
    };
  }

  return { mainPolicy, fieldPolicy, validationPolicy };
}
