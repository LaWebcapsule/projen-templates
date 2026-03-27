import { Project } from 'projen';
import { GitHubConfig } from '../src';

test('GitHubConfig creates all expected files', () => {
  const project = new Project({ name: 'test' });
  new GitHubConfig(project, {});
  const snapshot = project.files.map(f => f.path).sort();
  expect(snapshot).toContain('.github/pull_request_template.md');
  expect(snapshot).toContain('.github/ISSUE_TEMPLATE/bug_report.yml');
  expect(snapshot).toContain('.github/ISSUE_TEMPLATE/config.yml');
  expect(snapshot).toContain('.github/ISSUE_TEMPLATE/docs_problem.yml');
  expect(snapshot).toContain('.github/DISCUSSION_TEMPLATE/docs-suggestions.yml');
  expect(snapshot).toContain('.github/DISCUSSION_TEMPLATE/feature-requests.yml');
});

test('GitHubConfig creates SAST workflow via projen API', () => {
  const project = new Project({ name: 'my-project' });
  const gh = new GitHubConfig(project, { branches: ['main', 'develop'] });
  expect(gh.sastAnalysisWorkflow).toBeDefined();
  expect(gh.workflows.length).toBeGreaterThanOrEqual(1);
});

test('GitHubConfig can disable sections', () => {
  const project = new Project({ name: 'test' });
  new GitHubConfig(project, {
    sastWorkflow: false,
    issueTemplates: false,
    discussionTemplates: false,
    pullRequestTemplate: false,
  });
  const paths = project.files.map(f => f.path);
  expect(paths).not.toContain('.github/pull_request_template.md');
  expect(paths).not.toContain('.github/ISSUE_TEMPLATE/bug_report.yml');
  expect(paths).not.toContain('.github/DISCUSSION_TEMPLATE/docs-suggestions.yml');
});
