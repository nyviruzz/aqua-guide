import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../", import.meta.url));
const vaultRoot =
  process.env.OBSIDIAN_VAULT ?? path.join(os.homedir(), "Documents", "Github", "my-notes");
const outputDir = path.join(
  vaultRoot,
  "Hackathon",
  "Aqua Guide",
  "artifacts",
  "second round of external claude batch"
);
const port = 4900 + Math.floor(Math.random() * 200);
const baseUrl = `http://127.0.0.1:${port}`;

const entries = [
  { path: "/external-mockups/second-round-claude-batch/hybrid-01.html", file: "second-round-claude-hybrid-01.png" },
  { path: "/external-mockups/second-round-claude-batch/hybrid-02.html", file: "second-round-claude-hybrid-02.png" },
  { path: "/external-mockups/second-round-claude-batch/hybrid-03.html", file: "second-round-claude-hybrid-03.png" },
  { path: "/external-mockups/second-round-claude-batch/hybrid-04.html", file: "second-round-claude-hybrid-04.png" }
];

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const tryRequest = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });

      req.on("error", () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server did not start within ${timeoutMs}ms`));
          return;
        }
        setTimeout(tryRequest, 250);
      });
    };

    tryRequest();
  });
}

const server = spawn("node", ["server.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore"
});

await mkdir(outputDir, { recursive: true });

try {
  await waitForServer(baseUrl);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    colorScheme: "light"
  });

  for (const entry of entries) {
    await page.goto(`${baseUrl}${entry.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: path.join(outputDir, entry.file),
      fullPage: false
    });
  }

  await browser.close();
} finally {
  server.kill();
}
