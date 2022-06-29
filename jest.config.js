// Objet synchrone
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/*.test.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }};

module.exports = config;
