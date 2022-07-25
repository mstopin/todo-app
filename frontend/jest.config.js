const nextJest = require('next/jest');

module.exports = nextJest({ dir: './' })({
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
});
