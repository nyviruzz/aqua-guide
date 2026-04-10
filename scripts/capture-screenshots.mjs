import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../", import.meta.url));
const vaultRoot =
  process.env.OBSIDIAN_VAULT ?? path.join(os.homedir(), "Documents", "Github", "my-notes");
const outputDir = path.join(vaultRoot, "Hackathon", "Aqua Guide", "artifacts");
const port = 4300 + Math.floor(Math.random() * 400);
const baseUrl = `http://127.0.0.1:${port}`;

const entries = [
  { path: "/ui-variants/variant-1/?state=home", file: "variant-1-home.png" },
  { path: "/ui-variants/variant-1/?state=interaction", file: "variant-1-interaction.png" },
  { path: "/ui-variants/variant-1/?state=feature", file: "variant-1-feature.png" },
  { path: "/ui-variants/variant-2/?state=home", file: "variant-2-home.png" },
  { path: "/ui-variants/variant-2/?state=interaction", file: "variant-2-interaction.png" },
  { path: "/ui-variants/variant-2/?state=feature", file: "variant-2-feature.png" },
  { path: "/ui-variants/variant-3/?state=home", file: "variant-3-home.png" },
  { path: "/ui-variants/variant-3/?state=interaction", file: "variant-3-interaction.png" },
  { path: "/ui-variants/variant-3/?state=feature", file: "variant-3-feature.png" },
  { path: "/ui-variants/variant-4/?state=home", file: "variant-4-home.png" },
  { path: "/ui-variants/variant-4/?state=interaction", file: "variant-4-interaction.png" },
  { path: "/ui-variants/variant-4/?state=feature", file: "variant-4-feature.png" },
  { path: "/ui-variants/variant-5/?state=home", file: "variant-5-home.png" },
  { path: "/ui-variants/variant-5/?state=interaction", file: "variant-5-interaction.png" },
  { path: "/ui-variants/variant-5/?state=feature", file: "variant-5-feature.png" }
];

if (existsSync(path.join(root, "external-mockups", "mockup-1.html"))) {
  entries.push(
    { path: "/external-mockups/mockup-1.html", file: "external-mockup-1.png" },
    { path: "/external-mockups/mockup-2.html", file: "external-mockup-2.png" }
  );
}

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
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

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
