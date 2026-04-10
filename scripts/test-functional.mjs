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

const server = spawn("node", ["server.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore"
});

try {
  await waitForServer(baseUrl);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    geolocation: { latitude: -19.8333, longitude: 34.85 },
    permissions: ["geolocation", "clipboard-read", "clipboard-write"]
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  await expectText(page, "#statusLocation", "Cox's Bazar, Bangladesh");
  await expectText(page, "#statusBadge span", "Caution");

  await page.fill("#searchInput", "Turkana County, Kenya");
  await page.click(".search-btn");
  await expectText(page, "#statusBadge span", "Advisory");
  await expectText(page, "#statusLocation", "Turkana County, Kenya");

  await page.click("#quickReadToggle");
  await expectText(page, "#summaryText", "Treat all drinking water first");

  await page.click("#saveLocationButton");
  await expectText(page, "[data-favorite-chip='turkana-kenya']", "Turkana County, Kenya");

  await page.click("[data-language='fr']");
  await page.click("[data-suggestion='What is the first step in an advisory?']");
  await page.waitForFunction(() => {
    const message = document.querySelector(".message.assistant:last-child");
    const text = message?.textContent ?? "";
    return (
      message &&
      !text.includes("Thinking through the safest plain-language response for this household...") &&
      !text.includes("Je prépare une réponse claire et sûre pour ce foyer...")
    );
  });
  const aiAnswer = await page.locator(".message.assistant:last-child").textContent();
  assert.match(aiAnswer ?? "", /Turkana County, Kenya|eau|priority|traitée|water/i);

  await page.fill("#aiInput", "<img src=x onerror=window.__xssFlag=1>");
  await page.click("#aiSendButton");
  await page.waitForFunction(() => {
    const messages = Array.from(document.querySelectorAll(".message.user"));
    return messages.some((node) => node.textContent?.includes("<img src=x onerror=window.__xssFlag=1>"));
  });
  const xssState = await page.evaluate(() => ({
    flag: window.__xssFlag ?? 0,
    injectedImages: document.querySelectorAll(".message.user img").length
  }));
  assert.equal(xssState.flag, 0);
  assert.equal(xssState.injectedImages, 0);

  await page.click("[data-action-id='boil']");
  await expectText(page, "#modalTitle", "Treat the cleanest supply first");
  await page.click("#closeModalButton");
  assert.equal(await page.locator("#actionModal").evaluate((el) => el.hidden), true);

  await page.click("#copySummaryButton");
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  assert.match(clipboardText, /Turkana County, Kenya/);
  assert.match(clipboardText, /Advisory/);

  await page.click("#useLocationButton");
  await expectText(page, "#statusLocation", "Beira, Mozambique");
  await expectText(page, "#statusBadge span", "Caution");

  await page.reload({ waitUntil: "networkidle" });
  await expectText(page, "[data-favorite-chip='turkana-kenya']", "Turkana County, Kenya");

  await browser.close();
  console.log("Functional tests passed");
} finally {
  server.kill();
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
