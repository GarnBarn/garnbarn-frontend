module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue,ts}",
    "!src/main.ts",
    "!src/router/index.ts",
  ],
  transform: {
    "tests/unit/GarnBarnApiCaller/.(ts|tsx)": "ts-jest",
  },
  resetMocks: true,
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
  coveragePathIgnorePatterns: ["src/types"],
};
