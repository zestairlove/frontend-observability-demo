module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true
      }
    }
  ]
};
