import { BaseProject } from '../src';

test('BaseProject can be instantiated', () => {
  const project = new BaseProject({
    name: 'test-project',
  });
  expect(project).toBeDefined();
});
