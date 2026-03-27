import { DirectusProject } from '../src';

test('DirectusProject creates GitHub config by default', () => {
  const project = new DirectusProject({
    name: 'test-directus',
    defaultReleaseBranch: 'main',
  });
  expect(project.githubConfig).toBeDefined();
  const paths = project.files.map(f => f.path);
  expect(paths).toContain('.github/pull_request_template.md');
});

test('DirectusProject can disable GitHub config', () => {
  const project = new DirectusProject({
    name: 'test-directus',
    defaultReleaseBranch: 'main',
    githubConfig: false,
  });
  expect(project.githubConfig).toBeUndefined();
});
