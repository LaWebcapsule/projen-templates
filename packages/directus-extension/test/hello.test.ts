import { Testing } from 'projen/lib/testing';
import { D9ExtensionProject, D9ExtensionType } from '../src';

test('D9ExtensionProject can be instantiated', () => {
  const project = new D9ExtensionProject({
    name: 'test-extension',
    extensionTypes: [D9ExtensionType.HOOK],
    defaultReleaseBranch: 'main',
  });
  const snapshot = Testing.synth(project);
  expect(snapshot['package.json']).toBeDefined();
});
