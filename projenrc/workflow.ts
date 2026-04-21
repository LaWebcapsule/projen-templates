import { Component } from 'projen';
import { typescript } from 'projen';
import { workflows } from 'projen/lib/github';

const NODE_VERSION = '20';

export interface WorkflowOptions {
  /**
   * The branch that triggers CI on push.
   * @default 'main'
   */
  readonly defaultBranch?: string;
}

/**
 * Generates GitHub Actions workflows for CI and release.
 */
export class Workflow extends Component {
  constructor(
    rootProject: typescript.TypeScriptProject,
    options?: WorkflowOptions,
  ) {
    super(rootProject);

    const defaultBranch = options?.defaultBranch ?? 'main';

    const bootstrapSteps: workflows.JobStep[] = [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v4',
        with: { 'fetch-depth': 0 },
      },
      {
        name: 'Setup pnpm',
        uses: 'pnpm/action-setup@v4',
      },
      {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v4',
        with: {
          'node-version': NODE_VERSION,
          cache: 'pnpm',
        },
      },
      {
        name: 'Install dependencies',
        run: 'pnpm install --frozen-lockfile',
      },
    ];

    // --- CI workflow (PRs + push to main) ---
    const ci = rootProject.github!.addWorkflow('ci');
    ci.on({
      push: { branches: [defaultBranch] },
      pullRequest: { branches: [defaultBranch] },
    });

    ci.addJob('build', {
      name: 'Build & Test',
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: workflows.JobPermission.READ,
      },
      steps: [
        ...bootstrapSteps,
        {
          name: 'Build',
          run: 'pnpm -r build',
        },
        {
          name: 'Test',
          run: 'pnpm -r test',
        },
      ],
    });

    // --- Release workflow (push to main only) ---
    const release = rootProject.github!.addWorkflow('release');
    release.on({
      push: { branches: [defaultBranch] },
    });

    release.addJob('publish', {
      name: 'Version & Publish',
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: workflows.JobPermission.WRITE,
        pullRequests: workflows.JobPermission.WRITE,
        // Required for npm trusted publishing (OIDC) and provenance attestations.
        idToken: workflows.JobPermission.WRITE,
      },
      steps: [
        ...bootstrapSteps,
        {
          name: 'Build',
          run: 'pnpm -r build',
        },
        {
          name: 'Create and publish versions',
          uses: 'changesets/action@v1',
          with: {
            commit: 'chore: update versions',
            title: 'chore: update versions',
            version: 'pnpm run changeset:version',
            publish: 'pnpm changeset publish',
          },
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
            NPM_CONFIG_PROVENANCE: 'true',
          },
        },
      ],
    });
  }
}
