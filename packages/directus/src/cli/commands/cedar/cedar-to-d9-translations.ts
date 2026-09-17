import { ConditionSubject } from './cedar-translations';
import type { Filter } from './d9-permission';

type EntityRef = { type: string; id: string };

function rightToValue(right: any): any {
  if (right?.Var === 'principal') return '$CURRENT_USER';
  if (right?.Value !== undefined) return right.Value;
  throw new Error(
    `Unsupported right-hand Cedar expression: ${JSON.stringify(right)}`,
  );
}

function pathToFilter(
  node: any,
  subject: ConditionSubject,
  leaf: Record<string, any>,
): Filter {
  let acc: any = leaf;
  let cur = node;

  if (subject === 'context.newValue') {
    while (cur && cur['.']) {
      const { left, attr } = cur['.'];
      // Reached the `context.newValue` base: stop without wrapping `newValue`.
      if (attr === 'newValue' && left?.Var === 'context') return acc;
      acc = { [attr]: acc };
      cur = left;
    }
    throw new Error(
      `Unexpected context.newValue base path: ${JSON.stringify(node)}`,
    );
  }

  while (cur && cur['.']) {
    acc = { [cur['.'].attr]: acc };
    cur = cur['.'].left;
  }
  if (!(cur && cur.Var === 'resource')) {
    throw new Error(`Unexpected resource base path: ${JSON.stringify(node)}`);
  }
  return acc;
}

function patternToOperation(pattern: any[]): { operator: string; value: any } {
  // Cedar splits a `like` pattern into per-character Literal elements.
  const value = pattern
    .filter((p) => p !== 'Wildcard')
    .map((p) => p.Literal)
    .join('');
  const startsWildcard = pattern[0] === 'Wildcard';
  const endsWildcard = pattern[pattern.length - 1] === 'Wildcard';
  if (startsWildcard && endsWildcard) return { operator: '_contains', value };
  if (endsWildcard) return { operator: '_starts_with', value };
  if (startsWildcard) return { operator: '_ends_with', value };
  throw new Error(`Unsupported like pattern: ${JSON.stringify(pattern)}`);
}

const COMPARISON_OPS: Record<string, string> = {
  '==': '_eq',
  '!=': '_neq',
  '>': '_gt',
  '>=': '_gte',
  '<': '_lt',
  '<=': '_lte',
};

/** Inverse of `addWhenClauses`: a Cedar Expr tree back into a D9 filter. */
export function exprToFilter(
  expr?: any,
  subject: ConditionSubject = 'resource',
): Filter {
  if (!expr) return {};
  const key = Object.keys(expr)[0]!;
  const node = (expr as Record<string, any>)[key];

  if (key === '&&' || key === '||') {
    const operator = key === '&&' ? '_and' : '_or';
    const left = exprToFilter(node.left, subject) as Record<string, any>;
    const right = exprToFilter(node.right, subject) as Record<string, any>;
    const operands = [left[operator] ?? left, right[operator] ?? right].flat();
    return { [operator]: operands } as Filter;
  }

  if (key === 'has') {
    return pathToFilter(node.left, subject, { [node.attr]: { _nnull: true } });
  }

  if (key === '!') {
    const arg = node.arg;
    if (arg && arg.has) {
      return pathToFilter(arg.has.left, subject, {
        [arg.has.attr]: { _null: true },
      });
    }
    throw new Error(`Unsupported negation expression: ${JSON.stringify(expr)}`);
  }

  if (key === 'like') {
    const { operator, value } = patternToOperation(node.pattern);
    return pathToFilter(node.left, subject, { [operator]: value });
  }

  if (key in COMPARISON_OPS) {
    return pathToFilter(node.left, subject, {
      [COMPARISON_OPS[key]!]: rightToValue(node.right),
    });
  }

  throw new Error(`Unsupported Cedar expression operator: ${key}`);
}

/** Field list from a check-fields policy's `containsAll` clause. */
export function extractFields(expr: any): string[] {
  const left = expr?.containsAll?.left;
  // A literal array is normalized by Cedar into a Set of Value elements.
  if (Array.isArray(left?.Set)) return left.Set.map((e: any) => e.Value);
  if (Array.isArray(left?.Value)) return left.Value;
  throw new Error(
    `Unexpected check-fields policy shape: ${JSON.stringify(expr)}`,
  );
}

/** Inverse of `refactoPolicies`: expand `action in [...]` into one tuple each. */
export function expandPolicy(
  policy: any,
): Array<{ collection: string; action: string; conditions: any[] }> {
  const action = policy.action;
  let entities: any[] = [];
  if (action.op === '==') {
    entities = [action.entity];
  } else if (action.op === 'in') {
    entities = action.entities;
  }
  return entities.map((e) => {
    const ent = e as EntityRef;
    return {
      collection: ent.type.replace(/^Db::/, '').replace(/::Action$/, ''),
      action: ent.id,
      conditions: policy.conditions ?? [],
    };
  });
}
