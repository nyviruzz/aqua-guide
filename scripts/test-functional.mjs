import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import { chromium } from "playwright";

const root = process.cwd();
const port = 4318;
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

async function expectText(page, selector, expected) {
  await page.waitForFunction(
    ({ selector, expected }) => {
      const node = document.querySelector(selector);
      return node && node.textContent && node.textContent.includes(expected);
    },
    { selector, expected }
  );
}

const server = spawn("node", ["server.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore"
});

try {
  await waitForServer(`${baseUrl}/healthz`);

  const regionsPayload = await fetch(`${baseUrl}/api/regions`).then((response) => response.json());
  assert.equal(Array.isArray(regionsPayload.regions), true);
  assert.ok(regionsPayload.regions.length >= 4);
  assert.equal(regionsPayload.critical.id, "turkana-kenya");

  const dotEnvResponse = await fetch(`${baseUrl}/.env`);
  assert.equal(dotEnvResponse.status, 404);

  const searchPayload = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent("lodwar")}`).then((response) => response.json());
  assert.equal(searchPayload.region.id, "turkana-kenya");

  const reversePayload = await fetch(`${baseUrl}/api/reverse?lat=-19.8333&lng=34.85`).then((response) => response.json());
  assert.equal(reversePayload.region.id, "beira-mozambique");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    geolocation: { latitude: -19.8333, longitude: 34.85 },
    permissions: ["geolocation", "clipboard-read", "clipboard-write"]
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await expectText(page, "h1", "Know your water.");
  const homeContent = (await page.content()).toLowerCase();
  assert.equal(homeContent.includes("demo mode"), false);
  assert.equal(homeContent.includes("prototype note"), false);

  await page.fill("#regionSearchInput", "Turkana County, Kenya");
  await page.click("#regionSearchForm .primary-button");
  await page.waitForURL(/\/region\//);
  await expectText(page, "h1", "Turkana County, Kenya");
  await expectText(page, ".status-badge span:last-child", "Advisory");

  await page.click("#saveRegionButton");
  await expectText(page, "#saveRegionButton", "Saved");

  await page.click("#copySummaryButton");
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  assert.match(clipboardText, /Turkana County, Kenya/);
  assert.match(clipboardText, /Basic drinking water access/i);

  await page.click("[data-action-id='treat']");
  await expectText(page, "#modalTitle", "Treat the cleanest supply first");
  await page.click("#closeModalButton");
  assert.equal(await page.locator("#actionModal").evaluate((node) => node.hidden), true);

  await page.click("#useLocationButton");
  await expectText(page, "h1", "Beira, Mozambique");

  await page.goto(`${baseUrl}/assistant/?region=turkana-kenya`, { waitUntil: "networkidle" });
  await page.click("[data-language='fr']");
  await page.fill("#assistantInput", "What is the first step in an advisory?");
  await page.click("#assistantSendButton");
  await page.waitForFunction(() => {
    const lastMessage = document.querySelector(".message.assistant:last-child .message-bubble");
    const text = lastMessage?.textContent ?? "";
    return Boolean(lastMessage) && !text.includes("Working through the safest possible answer for this region...");
  });
  const assistantReply = await page.locator(".message.assistant:last-child .message-bubble").textContent();
  assert.match(assistantReply ?? "", /Pour|trait|Turkana|eau|water/i);

  await page.fill("#assistantInput", "<img src=x onerror=window.__xssFlag=1>");
  await page.click("#assistantSendButton");
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll(".message.user")).some((node) =>
      node.textContent?.includes("<img src=x onerror=window.__xssFlag=1>")
    );
  });
  const xssState = await page.evaluate(() => ({
    flag: window.__xssFlag ?? 0,
    injectedImages: document.querySelectorAll(".message.user img").length
  }));
  assert.equal(xssState.flag, 0);
  assert.equal(xssState.injectedImages, 0);

  await page.goto(`${baseUrl}/resources/`, { waitUntil: "networkidle" });
  await page.click("[data-group='field']");
  await expectText(page, "#resourceCardGrid", "Use one household-ready summary");

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await expectText(page, ".saved-chip", "Turkana County, Kenya");

  await browser.close();
  console.log("Functional tests passed");
} finally {
  server.kill();
}
