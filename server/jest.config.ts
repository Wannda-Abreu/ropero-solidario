import type {Config} from 'jest';


const config: Config = {
  transform: {"^.+\\.ts?$": "ts-jest"},
  roots: ['<rootDir>/tests/jest'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|js?)$',
  modulePathIgnorePatterns: ['<rootDir>/node_modules','<rootDir>/tests/vitest',],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.js'],
  coverageDirectory: 'coverage-jest',
  coverageReporters: ['text', 'html'],
  watchPathIgnorePatterns: ['node_modules',],
  preset: 'ts-jest',
  
  
}

export default config;

