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
  await waitForServer(`${baseUrl}/healthz`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    geolocation: { latitude: -19.8333, longitude: 34.85 },
    permissions: ["geolocation", "clipboard-read", "clipboard-write"]
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outputDir, "01-home-overview.png"), fullPage: false });

  await page.fill("#regionSearchInput", "Turkana County, Kenya");
  await page.click("#regionSearchForm .primary-button");
  await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("Turkana County, Kenya"));
  await page.screenshot({ path: path.join(outputDir, "02-region-turkana.png"), fullPage: false });

  await page.click("[data-action-id='treat']");
  await page.waitForSelector("#modalTitle");
  await page.screenshot({ path: path.join(outputDir, "03-region-action-modal.png"), fullPage: false });
  await page.click("#closeModalButton");

  await page.goto(`${baseUrl}/assistant/?region=turkana-kenya`, { waitUntil: "networkidle" });
  await page.click("[data-language='fr']");
  await page.fill("#assistantInput", "What is the first step in an advisory?");
  await page.click("#assistantSendButton");
  await page.waitForFunction(() => {
    const lastMessage = document.querySelector(".message.assistant:last-child .message-bubble");
    const text = lastMessage?.textContent ?? "";
    return Boolean(lastMessage) && !text.includes("Working through the safest possible answer for this region...");
  });
  await page.screenshot({ path: path.join(outputDir, "04-assistant-french.png"), fullPage: false });

  await page.goto(`${baseUrl}/resources/`, { waitUntil: "networkidle" });
  await page.click("[data-group='field']");
  await page.screenshot({ path: path.join(outputDir, "05-resources-field.png"), fullPage: false });

  await page.goto(`${baseUrl}/region/?id=turkana-kenya`, { waitUntil: "networkidle" });
  await page.click("#useLocationButton");
  await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("Beira, Mozambique"));
  await page.screenshot({ path: path.join(outputDir, "06-region-geolocation.png"), fullPage: false });

  await browser.close();
} finally {
  server.kill();
}
