module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    setupFilesAfterEnv: ['./tests/setup.js'],
    testEnvironment: 'jest-environment-jsdom',
  };
  