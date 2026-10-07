import * as cedar from '@cedar-policy/cedar-wasm/nodejs';
import type { PolicyJson } from '@cedar-policy/cedar-wasm/nodejs';
import { logger } from '../../logger';

/** Width of one logical level: the operator column (`|| `) plus the base gap. */
const LEVEL_INDENT = ' '.repeat(5);


function recursive(expr: any, level = 0, lastOperator = ''){
  const currentOperator = Object.keys(expr)[0]
  if(['&&', '||'].includes(currentOperator)){
    if(currentOperator === lastOperator){
      return `
${lastOperator} ${leafToText(expr.Right)}
${recursive(expr.left, level, lastOperator)}`
    }
    else{
      return `
${currentOperator} (
  ${recursive(expr.left, level ++, currentOperator)}
)`
    }
  }
  else{
    return `${} ${lastOperator} ${leafToText(expr)}`
  }
}

function booleanOperator(expr: any): '&&' | '||' | undefined {
  const key = Object.keys(expr)[0];
  return key === '&&' || key === '||' ? key : undefined;
}

/** `a || (b || c)` → `[a, b, c]`: siblings of one logical level. */
function operands(expr: any, operator: '&&' | '||'): any[] {
  if (booleanOperator(expr) !== operator) return [expr];
  const { left, right } = expr[operator];
  return [...operands(left, operator), ...operands(right, operator)];
}

/** Cedar's text for a policy with `All` scopes and a single `when` clause. */
const LEAF_PREFIX = 'permit(principal, action, resource) when { ';
const LEAF_SUFFIX = ' };';

/** Any non-boolean expression, printed by Cedar itself. */
function leafToText(expr: any): string {
  const result = cedar.policyToText({
    effect: 'permit',
    principal: { op: 'All' },
    action: { op: 'All' },
    resource: { op: 'All' },
    conditions: [{ kind: 'when', body: expr }],
  });
  if (result.type === 'failure') {
    logger.error({ expr }, 'failed to transform expression into text');
    throw new Error(result.errors as any);
  }
  return result.text.slice(LEAF_PREFIX.length, -LEAF_SUFFIX.length);
}

/** One logical level; a nested group always has the other operator. */
function blockToLines(
  operator: '&&' | '||',
  expressions: any[],
  indent: string,
): string[] {
  return expressions.flatMap((expr, i) => {
    const prefix = `${indent}${i === 0 ? '   ' : `${operator} `}`;
    const nestedOperator = booleanOperator(expr);
    if (!nestedOperator) return [prefix + leafToText(expr)];
    return [
      `${prefix}(`,
      ...blockToLines(
        nestedOperator,
        operands(expr, nestedOperator),
        indent + LEVEL_INDENT,
      ),
      `${indent}   )`,
    ];
  });
}

function whenToText(body: any): string {
  const operator = booleanOperator(body);
  if (!operator) return `when { ${leafToText(body)} }`;
  return [
    'when {',
    ...blockToLines(operator, operands(body, operator), '  '),
    '}',
  ].join('\n');
}

/**
 * Cedar's formatter for the policy head, our own layout for the conditions:
 * operands of one logical level share an indentation, each nested level adds one,
 * and the `&&` / `||` operator leads the line.
 */
export function policyToCedarText(policy: PolicyJson): string {
  const head = cedar.policyToText({ ...policy, conditions: [] });
  if (head.type === 'failure') {
    logger.error({ policy }, 'failed to transform policy into text');
    throw new Error(head.errors as any);
  }
  const formattedHead = cedar.formatPolicies({
    policyText: head.text,
    lineWidth: 100,
    indentWidth: 2,
  });
  if (formattedHead.type === 'failure') {
    throw new Error(formattedHead as any);
  }
  // a policy without conditions is formatted as `…;\n`
  const lines = [formattedHead.formatted_policy.slice(0, -2)];
  // translateToCedar writes at most one `when` clause
  const [condition] = policy.conditions;
  if (condition) lines.push(whenToText(condition.body));
  return lines.join('\n') + ';';
}
