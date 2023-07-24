module.exports = {
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '^@cc/(.*)$': '<rootDir>/src/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
  },
  resolver: undefined,
  testPathIgnorePatterns: ['/node_modules/', '^.*index\\.ts$'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '^.*index\\.ts$',
    '/src/shared/api',
    '/src/shared/types',
    '/src/shared/consts',
    '/src/shared/enums',
  ],
  modulePathIgnorePatterns: [
    '/node_modules/',
    '^.*index\\.ts$',
    '/src/shared/api',
    '/src/shared/types',
    '/src/shared/consts',
    '/src/shared/enums',
  ],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss|png|jpg)$'],
};
