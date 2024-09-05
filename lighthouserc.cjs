module.exports = {
  ci: {
    collect: {
      puppeteerScript: "./puppeteerScript.cjs",
      puppeteerLaunchOptions: {
        headless: false,
        args: [
          "--show-paint-rects",
          "--allow-no-sandbox-job",
          "--allow-sandbox-debugging",
          "--no-sandbox",
          "--disable-gpu",
          "--disable-gpu-sandbox",
          "--display",
        ],
      },
      disableStorageReset: true,
      numberOfRuns: 3,
      startServerCommand: "npx npm run start",
      url: ["http://localhost:3000"],
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["warn", { minScore: 0 }],
        "categories:performance": ["warn", { minScore: 0 }],
        "categories:accessibility": ["warn", { minScore: 0 }],
        "categories:best-practices": ["warn", { minScore: 0 }],
        "categories:seo": ["warn", { minScore: 0 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
};
