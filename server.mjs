import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const openAiApiKey = process.env.OPENAI_API_KEY;
const openAiModel = process.env.OPENAI_MODEL || "gpt-4.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const languageLabels = {
  en: "English",
  fr: "French",
  sw: "Swahili",
  ar: "Arabic",
  bn: "Bengali"
};

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function buildAssistantPrompt({ question, language, location, conversation }) {
  const languageLabel = languageLabels[language] || languageLabels.en;
  const recentHistory = Array.isArray(conversation)
    ? conversation
        .filter((message) => message?.role === "user" || message?.role === "assistant")
        .slice(-6)
        .map((message) => `${message.role.toUpperCase()}: ${String(message.content ?? "")}`)
        .join("\n")
    : "";

  return `
You are Aqua Guide, a multilingual water-safety assistant for a hackathon demo web app.

Guardrails:
- Use plain language.
- Keep responses concise and practical.
- Do not provide medical diagnosis or legal advice.
- Do not invent live official updates.
- Make it clear this is demo guidance inspired by documented water challenges, not an official emergency feed.
- If the situation sounds urgent, tell the user to follow local health authorities, humanitarian responders, or trusted water providers.
- Respond fully in ${languageLabel}.

Current demo region:
- Name: ${location?.name ?? "Unknown"}
- Status: ${location?.statusLabel ?? "Unknown"}
- Utility/source label: ${location?.utility ?? "Unknown"}
- Record label: ${location?.recordLabel ?? "Unknown"}
- Summary: ${location?.summaryText ?? "Unknown"}
- Quick summary: ${location?.quickSummary ?? "Unknown"}
- Recommended actions: ${Array.isArray(location?.actions) ? location.actions.map((action) => action.title).join(", ") : "Unknown"}

Recent conversation:
${recentHistory || "No recent conversation."}

User question:
${question}
  `.trim();
}

function extractResponseText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (Array.isArray(payload?.output)) {
    const parts = [];
    for (const block of payload.output) {
      if (!Array.isArray(block?.content)) continue;
      for (const item of block.content) {
        if (typeof item?.text === "string" && item.text.trim()) {
          parts.push(item.text.trim());
        }
      }
    }
    if (parts.length) return parts.join("\n\n");
  }

  return "";
}

async function handleChat(req, res) {
  try {
    const body = await readJsonBody(req);
    const question = String(body.question ?? "").trim();
    if (!question) {
      sendJson(res, 400, { error: "missing_question" });
      return;
    }

    if (!openAiApiKey) {
      sendJson(res, 503, { error: "missing_openai_api_key" });
      return;
    }

    const prompt = buildAssistantPrompt(body);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: openAiModel,
        input: prompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      sendJson(res, 502, { error: "openai_request_failed", detail: errorText.slice(0, 400) });
      return;
    }

    const payload = await response.json();
    const text = extractResponseText(payload);

    if (!text) {
      sendJson(res, 502, { error: "empty_openai_response" });
      return;
    }

    sendJson(res, 200, {
      text,
      meta: `${openAiModel} · demo guardrails active`
    });
  } catch (error) {
    sendJson(res, 500, {
      error: "chat_handler_failed",
      detail: error instanceof Error ? error.message : "unknown_error"
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.url === "/api/chat" && req.method === "POST") {
    handleChat(req, res);
    return;
  }

  if (req.url === "/api/chat" && req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return;
  }

  const requestPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, safePath);

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": types[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Aqua Guide server running at http://localhost:${port}`);
});
