import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },

  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },

  testMatch: ['**/test/**/*.test.ts'] // Optional: ensures only test files are matched
};

export default config;
