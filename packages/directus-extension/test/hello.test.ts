import { Testing } from 'projen/lib/testing';
import { DirectusExtensionProject, DirectusExtensionType } from '../src';

test('DirectusExtensionProject can be instantiated', () => {
  const project = new DirectusExtensionProject({
    name: 'test-extension',
    extensionTypes: [DirectusExtensionType.HOOK],
    defaultReleaseBranch: 'main',
  });
  const snapshot = Testing.synth(project);
  expect(snapshot['package.json']).toBeDefined();
});
