import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";

const root = process.cwd();
const port = 48320;
const baseUrl = `http://127.0.0.1:${port}`;
const allowedOrigin = "https://aqua-guide-static.onrender.com";
const blockedOrigin = "https://example.com";

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
  env: { ...process.env, PORT: String(port), OPENAI_API_KEY: "" },
  stdio: "ignore"
});

try {
  await waitForServer(`${baseUrl}/healthz`);

  const optionsResponse = await fetch(`${baseUrl}/api/chat`, {
    method: "OPTIONS",
    headers: {
      Origin: allowedOrigin,
      "Access-Control-Request-Method": "POST"
    }
  });
  assert.equal(optionsResponse.status, 204);
  assert.equal(optionsResponse.headers.get("access-control-allow-origin"), allowedOrigin);

  const allowedResponse = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      Origin: allowedOrigin,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: "What should a family do first?",
      language: "en",
      locationContext: {
        name: "Turkana County, Kenya",
        actions: [{ title: "Treat the safest water first" }]
      }
    })
  });
  assert.equal(allowedResponse.status, 200);
  assert.equal(allowedResponse.headers.get("access-control-allow-origin"), allowedOrigin);
  const allowedPayload = await allowedResponse.json();
  assert.equal(allowedPayload.source, "fallback");
  assert.match(String(allowedPayload.text || ""), /Treat the safest water first|For Turkana County/i);

  const blockedResponse = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      Origin: blockedOrigin,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: "Should be blocked"
    })
  });
  assert.equal(blockedResponse.status, 403);

  console.log("Chat backend tests passed");
} finally {
  server.kill();
}
