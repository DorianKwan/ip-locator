module.exports = {
  preset: 'ts-jest',
  transform: {
    '\\.(ts)$': 'ts-jest',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.yarn-cache', 'dist', 'node_modules'],
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  modulePathIgnorePatterns: [`${__dirname}/dist/`],
};
