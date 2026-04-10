import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright";

const root = process.cwd();
const vaultRoot =
  process.env.OBSIDIAN_VAULT ?? path.join(os.homedir(), "Documents", "Github", "my-notes");
const outputDir = path.join(vaultRoot, "Hackathon", "Aqua Guide", "artifacts", "presentation demo");
const port = 4328;
const baseUrl = `http://127.0.0.1:${port}`;

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server did not start within ${timeoutMs}ms`));
          return;
        }
        setTimeout(tick, 250);
      });
    };
    tick();
  });
}

const server = spawn("node", ["server.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore"
});

try {
  await mkdir(outputDir, { recursive: true });
  await waitForServer(baseUrl);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    geolocation: { latitude: -19.8333, longitude: 34.85 },
    permissions: ["geolocation", "clipboard-read", "clipboard-write"]
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, "01-home-global.png"), fullPage: false });

  await page.fill("#searchInput", "Turkana County, Kenya");
  await page.click(".search-btn");
  await page.waitForFunction(() => {
    const badge = document.querySelector("#statusBadge span");
    return badge && badge.textContent?.includes("Advisory");
  });
  await page.screenshot({ path: path.join(outputDir, "02-search-advisory.png"), fullPage: false });

  await page.click("#quickReadToggle");
  await page.waitForFunction(() => document.body.classList.contains("quick-read"));
  await page.screenshot({ path: path.join(outputDir, "03-quick-read.png"), fullPage: false });

  await page.click("#saveLocationButton");
  await page.screenshot({ path: path.join(outputDir, "04-saved-location.png"), fullPage: false });

  await page.click("[data-language='fr']");
  await page.fill("#aiInput", "What is the first step in an advisory?");
  await page.click("#aiSendButton");
  await page.waitForFunction(() => {
    const message = document.querySelector(".message.assistant:last-child");
    const text = message?.textContent ?? "";
    return (
      message &&
      !text.includes("Thinking through the safest plain-language response for this household...") &&
      !text.includes("Je prépare une réponse claire et sûre pour ce foyer...")
    );
  });
  await page.screenshot({ path: path.join(outputDir, "05-ai-french.png"), fullPage: false });

  await page.click("[data-action-id='boil']");
  await page.waitForSelector("#modalTitle");
  await page.screenshot({ path: path.join(outputDir, "06-action-modal.png"), fullPage: false });
  await page.click("#closeModalButton");

  await page.click("#useLocationButton");
  await page.waitForFunction(() => {
    const node = document.querySelector("#statusLocation");
    return node && node.textContent?.includes("Beira, Mozambique");
  });
  await page.screenshot({ path: path.join(outputDir, "07-geo-beira.png"), fullPage: false });

  await browser.close();
} finally {
  server.kill();
}
