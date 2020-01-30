module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'json-summary'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(jest-test))']
};
