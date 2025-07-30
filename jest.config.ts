import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

 moduleNameMapper: {
  '^@src/(.*)$': '<rootDir>/src/$1',
},

};

export default config;
