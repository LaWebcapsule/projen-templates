import * as fs from 'fs';
import * as path from 'path';
import { Project, TextFile } from 'projen';
import { GitHub, GitHubOptions, GithubWorkflow } from 'projen/lib/github';
import { DependabotOptions } from 'projen/lib/github/dependabot';
import { JobPermission } from 'projen/lib/github/workflows-model';

const TEMPLATES_DIR = path.join(__dirname, 'templates');

function readTemplate(filename: string, vars: Record<string, string> = {}): string[] {
  let content = fs
    .readFileSync(path.join(TEMPLATES_DIR, filename))
    .toString();
  for (const [key, value] of Object.entries(vars)) {
    content = content.split(`{{${key}}}`).join(value);
  }
  return content.split('\n');
}

/**
 * Options for the GitHubConfig component.
 */
export interface GitHubConfigOptions extends GitHubOptions {
  /**
   * Branch names used in workflow triggers (e.g. pull_request).
   * @default ["main"]
   */
  readonly branches?: string[];

  /**
   * Whether to include the SAST analysis workflow.
   * @default true
   */
  readonly sastWorkflow?: boolean;

  /**
   * Whether to include issue templates.
   * @default true
   */
  readonly issueTemplates?: boolean;

  /**
   * Whether to include discussion templates.
   * @default true
   */
  readonly discussionTemplates?: boolean;

  /**
   * Whether to include the pull request template.
   * @default true
   */
  readonly pullRequestTemplate?: boolean;

  /**
  /* dependencies.
   * Pass `true` for defaults, or a `DependabotOptions` object to customise.
   * @default true
   */
  readonly dependabot?: boolean | DependabotOptions;

}

/**
 * Extends projen's GitHub component with a full .github directory setup:
 * workflows, issue templates, discussion templates, and PR template.
 *
 * Based on https://github.com/LaWebcapsule/orbits/tree/main/.github
 */
export class GitHubConfig extends GitHub {

  /**
   * The SAST analysis workflow, if enabled.
   */
  public readonly sastAnalysisWorkflow?: GithubWorkflow;

  constructor(project: Project, options?: GitHubConfigOptions) {
    super(project, options);

    const branches = options?.branches ?? ['main'];
    const vars = { PROJECT_NAME: project.name };
    const opts = {
      sastWorkflow: options?.sastWorkflow ?? true,
      issueTemplates: options?.issueTemplates ?? true,
      discussionTemplates: options?.discussionTemplates ?? true,
      pullRequestTemplate: options?.pullRequestTemplate ?? true,
    };

    // Pull Request Template (using projen's native API)
    if (opts.pullRequestTemplate) {
      this.addPullRequestTemplate(
        ...readTemplate('pull_request_template.md', vars),
      );
    }

    // SAST Analysis Workflow (using projen's native workflow API)
    if (opts.sastWorkflow) {
      this.sastAnalysisWorkflow = this.addWorkflow('sast-analysis');
      this.sastAnalysisWorkflow.on({
        pullRequest: { branches },
        workflowDispatch: {},
      });
      this.sastAnalysisWorkflow.addJob('semgrep', {
        runsOn: ['ubuntu-latest'],
        permissions: { contents: JobPermission.READ },
        env: { NODE_OPTIONS: '--max_old_space_size=6144' },
        steps: [
          { name: 'Checkout repository', uses: 'actions/checkout@v4' },
          { name: 'Install semgrep', run: 'python3 -m pip install semgrep' },
          { name: 'Run Semgrep', run: 'semgrep scan' },
        ],
      });
    }

    // Dependabot version updates for @wbce/* dependencies
    const dependabotOpt = options?.dependabot ?? true;
    if (dependabotOpt) {
      const dependabotOptions: DependabotOptions = typeof dependabotOpt === 'object' ? dependabotOpt : {};
      this.addDependabot({
        allow: [{ dependencyName: '@wbce/*' }],
        ...dependabotOptions,
      });
    }

    // Issue Templates (no projen built-in, use TextFile)
    if (opts.issueTemplates) {
      new TextFile(project, '.github/ISSUE_TEMPLATE/bug_report.yml', {
        lines: readTemplate('issue-templates/bug_report.yml', vars),
      });
      new TextFile(project, '.github/ISSUE_TEMPLATE/config.yml', {
        lines: readTemplate('issue-templates/issue_config.yml', vars),
      });
      new TextFile(project, '.github/ISSUE_TEMPLATE/docs_problem.yml', {
        lines: readTemplate('issue-templates/docs_problem.yml', vars),
      });
    }

    // Discussion Templates (no projen built-in, use TextFile)
    if (opts.discussionTemplates) {
      new TextFile(project, '.github/DISCUSSION_TEMPLATE/docs-suggestions.yml', {
        lines: readTemplate('discussion-templates/docs-suggestions.yml', vars),
      });
      new TextFile(project, '.github/DISCUSSION_TEMPLATE/feature-requests.yml', {
        lines: readTemplate('discussion-templates/feature-requests.yml', vars),
      });
    }
  }
}
