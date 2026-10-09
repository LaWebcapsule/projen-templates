import { synthSnapshot } from 'projen/lib/util/synth';
import { DirectusProject } from '../src';
import { atlasFileName } from '../src/cli/atlas';

test('atlasFileName picks the community binary for the platform', () => {
  expect(atlasFileName('1.3.3', 'linux', 'x64')).toBe('atlas-community-linux-amd64-v1.3.3');
  expect(atlasFileName('1.3.3', 'darwin', 'arm64')).toBe('atlas-community-darwin-arm64-v1.3.3');
  expect(() => atlasFileName('1.3.3', 'win32', 'x64')).toThrow();
});

function plumbingJson(project: DirectusProject) {
  return synthSnapshot(project)['d9-plumbing.json'];
}

test('d9-plumbing.json contains the default atlas version', () => {
  const project = new DirectusProject({ name: 'test-directus', defaultReleaseBranch: 'main' });
  expect(plumbingJson(project)).toMatchObject({ atlasVersion: '1.3.3' });
});

test('d9-plumbing.json keeps the atlas version when plumbing is configured', () => {
  const project = new DirectusProject({
    name: 'test-directus',
    defaultReleaseBranch: 'main',
    packageVersions: { atlas: '1.2.0' },
  });
  project.configurePlumbing({ logLevel: 'info' });
  expect(plumbingJson(project)).toMatchObject({ atlasVersion: '1.2.0', logLevel: 'info' });
});
