import * as cedar from '@cedar-policy/cedar-wasm/nodejs';
import type { PolicyJson } from '@cedar-policy/cedar-wasm/nodejs';
import { logger } from '../../logger';

/** Width of one logical level: the operator column (`|| `) plus the base gap. */
const LEVEL_INDENT = ' '.repeat(5);

function booleanOperator(expr: any): '&&' | '||' | undefined {
  const key = Object.keys(expr)[0];
  return key === '&&' || key === '||' ? key : undefined;
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

/**
 * Lines of `expr` within a group of `parent`, each starting with a 3-character
 * operator column; a nested group (other operator) goes one level deeper in parentheses.
 */
function toLines(expr: any, parent?: string): string[] {
  const operator = booleanOperator(expr);
  if (!operator) return [`   ${leafToText(expr)}`];
  // the top level (no parent) is a group without parentheses
  if (parent && operator !== parent) {
    return ['   (', ...toLines(expr, operator).map((line) => LEVEL_INDENT + line), '   )'];
  }
  // the operator joins the two sides, on the line where the right side starts
  const [first, ...rest] = toLines(expr[operator].right, operator);
  return [...toLines(expr[operator].left, operator), `${operator} ${first!.slice(3)}`, ...rest];
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
  if (condition) {
    const when = toLines(condition.body);
    lines.push(
      ['when {', ...when.map((line) => `  ${line}`), '}'].join('\n')
    );
  }
  return lines.join('\n') + ';';
}
