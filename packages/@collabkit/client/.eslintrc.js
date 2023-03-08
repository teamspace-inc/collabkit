module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
};
