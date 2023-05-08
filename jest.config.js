/* eslint-disable prettier/prettier */
module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    coverageReporters: ['json','html'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json','node'],
    testMatch: [
      "**/test/**/*.spec.ts"
    ],
    testPathIgnorePatterns: [
      "/node_modules/"
    ],
  };
  