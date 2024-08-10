import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { Config } from 'jest';

const config: Config = {
  setupFiles: ['<rootDir>/test/setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}', // Include all files in src directory with specific extensions
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text', 'lcov', 'clover'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
