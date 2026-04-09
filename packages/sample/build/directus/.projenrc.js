const { DirectusProject } = require("@wbce/projen-directus");
const { DirectusExtensionType } = require("../../../directus-extension/lib/directus-extension-project");
const project = new DirectusProject({
  defaultReleaseBranch: "main",
  eslintOptions: {"dirs":["src","test"],"prettier":true,"aliasMap":{"@src":"./src","@components":"./src/components"}},
  name: "my-test-project",
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.addDevDeps('@wbce/projen-directus@file:../../../directus');
project.addDevDeps('@wbce/projen-directus-extension@file:../../../directus-extension');
project.addDevDeps('@wbce/projen-shared@file:../../../shared');
project.addExtension("shared", []);
const test = project.addExtension("test", [DirectusExtensionType.HOOK]);
test.addDeps("shared@workspace:")
project.synth();