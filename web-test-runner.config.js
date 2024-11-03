import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  files: ["test/**/*.test.js"],
  nodeResolve: true,
  staticDirs: [
    {
      serve: "/src/localization/locales",
      directory: "src/localization/locales",
    },
  ],
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  coverage: true, // Enable coverage
  coverageConfig: {
    reportDir: "coverage",
    exclude: ["**/test/**/*", "**/node_modules/**/*"],
    threshold: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
    report: ["text-summary", "html"],
  },
};
