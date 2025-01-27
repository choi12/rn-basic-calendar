module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|dayjs)/)'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx,js,jsx}',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  automock: false,
  verbose: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/__mocks__/**', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '__mocks__'],
};
