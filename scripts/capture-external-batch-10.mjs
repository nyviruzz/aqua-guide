import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../", import.meta.url));
const vaultRoot =
  process.env.OBSIDIAN_VAULT ?? path.join(os.homedir(), "Documents", "Github", "my-notes");
const outputDir = path.join(vaultRoot, "Hackathon", "Aqua Guide", "artifacts");
const port = 4700 + Math.floor(Math.random() * 200);
const baseUrl = `http://127.0.0.1:${port}`;

const htmlEntries = [
  { path: "/external-mockups/batch-10/claude/claude-01.html", file: "external-batch10-01-claude-01.png" },
  { path: "/external-mockups/batch-10/claude/claude-02.html", file: "external-batch10-02-claude-02.png" },
  { path: "/external-mockups/batch-10/claude/claude-03.html", file: "external-batch10-03-claude-03.png" },
  { path: "/external-mockups/batch-10/claude/claude-04.html", file: "external-batch10-04-claude-04.png" },
  { path: "/external-mockups/batch-10/gemini/gemini-03.html", file: "external-batch10-05-gemini-03.png" },
  { path: "/external-mockups/batch-10/gemini/gemini-pro-test.html", file: "external-batch10-06-gemini-pro.png" }
];

const stitchCopies = [
  {
    source: path.join(root, "external-mockups", "batch-10", "stitch", "stitch-01.png"),
    file: "external-batch10-07-stitch-01.png"
  },
  {
    source: path.join(root, "external-mockups", "batch-10", "stitch", "stitch-02.png"),
    file: "external-batch10-08-stitch-02.png"
  },
  {
    source: path.join(root, "external-mockups", "batch-10", "stitch", "stitch-03.png"),
    file: "external-batch10-09-stitch-03.png"
  },
  {
    source: path.join(root, "external-mockups", "batch-10", "stitch", "stitch-04.png"),
    file: "external-batch10-10-stitch-04.png"
  }
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

  for (const entry of htmlEntries) {
    await page.goto(`${baseUrl}${entry.path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: path.join(outputDir, entry.file),
      fullPage: false
    });
  }

  await browser.close();

  for (const entry of stitchCopies) {
    await copyFile(entry.source, path.join(outputDir, entry.file));
  }
} finally {
  server.kill();
}
