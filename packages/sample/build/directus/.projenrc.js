const { D9Project } = require("@wbce/projen-d9");
const { D9ExtensionType } = require("@wbce/projen-d9-extension");
const project = new D9Project({
  defaultReleaseBranch: "main",
  eslintOptions: {"dirs":["src","test"],"prettier":true,"aliasMap":{"@src":"./src","@components":"./src/components"}},
  name: "my-test-project",
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();