const { Projects } = require('projen');

Projects.createProject({
  dir: './build/blank',
  projectFqn: '@wbce/projen-blank.BaseProject',
  projectOptions: {
    name: 'my-test-project',
    defaultReleaseBranch: 'main',
    projenrcTs: true,
    eslintOptions: {
      dirs: ['src', 'test'],
      prettier: true,
      aliasMap: {
        '@src': './src',
        '@components': './src/components',
      },
    },
  },
  post: false,
  // synth: true (default)
  // optionHints: 'featured' (default)
});

Projects.createProject({
    dir: './build/directus',
    projectFqn: '@wbce/projen-directus.DirectusProject',
    projectOptions: {
      name: 'my-test-project',
      defaultReleaseBranch: 'main',
      projenrcTs: true,
      eslintOptions: {
        dirs: ['src', 'test'],
        prettier: true,
        aliasMap: {
          '@src': './src',
          '@components': './src/components',
        },
      },
    },
    post: false,
    // synth: true (default)
    // optionHints: 'featured' (default)
  });