/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../../setupTests.ts'],
  transform: {
    '^.+\\.(tsx|jsx|ts|js|mjs)?$': [
      '@swc-node/jest',
      {
        jsx: true,
        importMeta: true,
      },
    ],
  },
  transformIgnorePatterns: [],
  rootDir: 'src',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '@tldraw/core': '<rootDir>/../../packages/core/src',
    'file-store': '<rootDir>/../../packages/file-store/src',
    '\\~(.*)': '<rootDir>/../../packages/core/src/$1',
    '^.+\\.(css|less)$': '<rootDir>/../../CSSStub.js',
  },
};

module.exports = config;
