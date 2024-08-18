module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx npm run start",
      // startServerCommand: pnpm dev -> 서커 켜는 명령어
      url: ["http://localhost:3000"],
      numberOfRuns: 5,
    },
    assert: {
      preset: "lighthouse:no-pwa",
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
};
