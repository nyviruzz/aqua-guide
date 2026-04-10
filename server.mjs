import http from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { findRegionByQuery, getNearestRegion, getRegionById, regions, sortRegionsByPriority } from "./data/regions.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const envFile = join(root, ".env");
const envConfig = existsSync(envFile) ? parseDotEnv(readFileSync(envFile, "utf8")) : {};
const openAiApiKey = process.env.OPENAI_API_KEY || envConfig.OPENAI_API_KEY;
const openAiModel = process.env.OPENAI_MODEL || envConfig.OPENAI_MODEL || "gpt-4.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const weatherCodeLabels = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Strong rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm"
};

const cache = new Map();
const rateLimits = new Map();
const staticRoots = new Set(["assistant", "client", "data", "region", "resources"]);
const staticFiles = new Set(["index.html", "styles.css"]);

function parseDotEnv(contents) {
  const result = {};
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
    result[key] = value;
  }
  return result;
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value || 0));
}

function formatPercent(value) {
  return `${Math.round(Number(value || 0))}%`;
}

function formatDistance(value) {
  if (!Number.isFinite(value)) return "Matched region";
  if (value < 10) return `${value.toFixed(1)} km away`;
  return `${Math.round(value)} km away`;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function getClientKey(req) {
  const remoteAddress = req.socket.remoteAddress || "unknown";
  const userAgent = String(req.headers["user-agent"] || "unknown").slice(0, 160);
  return `${remoteAddress}:${userAgent}`;
}

function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
  );
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 250_000) {
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

function getCached(key) {
  const cached = cache.get(key);
  if (!cached || cached.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  return cached.value;
}

async function withCache(key, ttlMs, factory) {
  const cached = getCached(key);
  if (cached) return cached;
  const value = await factory();
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 12000);
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "User-Agent": "AquaGuide/1.0",
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function latestWorldBankPoint(payload) {
  const series = Array.isArray(payload?.[1]) ? payload[1] : [];
  return series.find((point) => typeof point?.value === "number") || null;
}

async function fetchWorldBankIndicator(countryIso3, indicatorId) {
  return withCache(`wb:${countryIso3}:${indicatorId}`, 1000 * 60 * 60, async () => {
    const payload = await fetchJson(
      `https://api.worldbank.org/v2/country/${countryIso3}/indicator/${indicatorId}?format=json&per_page=20`
    );
    const point = latestWorldBankPoint(payload);
    if (!point) return null;
    return {
      label: point.indicator?.value || indicatorId,
      value: point.value,
      year: Number(point.date)
    };
  });
}

async function fetchWeather(region) {
  return withCache(`weather:${region.id}`, 1000 * 60 * 15, async () => {
    const { lat, lng } = region.coordinates;
    const payload = await fetchJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=auto`
    );
    const current = payload?.current;
    if (!current) return null;
    return {
      temperatureC: Math.round(Number(current.temperature_2m || 0)),
      precipitationMm: Number(current.precipitation || 0).toFixed(1),
      windKmh: Math.round(Number(current.wind_speed_10m || 0)),
      label: weatherCodeLabels[current.weather_code] || "Weather update"
    };
  });
}

async function buildLiveData(region) {
  const [drinkingWater, sanitation, population, weather] = await Promise.all([
    fetchWorldBankIndicator(region.countryIso3, "SH.H2O.BASW.ZS"),
    fetchWorldBankIndicator(region.countryIso3, "SH.STA.BASS.ZS"),
    fetchWorldBankIndicator(region.countryIso3, "SP.POP.TOTL"),
    fetchWeather(region)
  ]);

  return {
    drinkingWater: drinkingWater
      ? { ...drinkingWater, display: formatPercent(drinkingWater.value) }
      : null,
    sanitation: sanitation
      ? { ...sanitation, display: formatPercent(sanitation.value) }
      : null,
    population: population
      ? { ...population, display: formatCompactNumber(population.value) }
      : null,
    weather
  };
}

function serializeRegion(region) {
  return {
    id: region.id,
    name: region.name,
    country: region.country,
    flag: region.flag,
    utility: region.utility,
    recordLabel: region.recordLabel,
    coordinates: region.coordinates,
    status: region.status,
    statusLabel: region.statusLabel,
    qualityIndex: region.qualityIndex,
    metrics: region.metrics,
    tag: region.tag,
    oneLiner: region.oneLiner,
    heroTitle: region.heroTitle,
    heroDescription: region.heroDescription,
    summaryTitle: region.summaryTitle,
    summaryText: region.summaryText,
    quickSummary: region.quickSummary,
    highlights: region.highlights,
    sources: region.sources,
    actionsTitle: region.actionsTitle,
    actionsSubtitle: region.actionsSubtitle,
    actions: region.actions,
    aiSuggestions: region.aiSuggestions
  };
}

async function geocodeQuery(query) {
  const payload = await fetchJson(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=jsonv2&limit=1`,
    {
      headers: { "User-Agent": "AquaGuide/1.0 (search)" }
    }
  );
  const result = Array.isArray(payload) ? payload[0] : null;
  if (!result) return null;
  return {
    name: result.display_name,
    lat: Number(result.lat),
    lng: Number(result.lon)
  };
}

async function reverseGeocode(lat, lng) {
  const payload = await fetchJson(
    `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&format=jsonv2`,
    {
      headers: { "User-Agent": "AquaGuide/1.0 (reverse)" }
    }
  );
  return {
    name: payload?.display_name || "Detected location",
    lat: Number(lat),
    lng: Number(lng)
  };
}

function checkRateLimit(key, bucketName, maxRequests, windowMs) {
  const now = Date.now();
  const bucketKey = `${bucketName}:${key}`;
  const bucket = (rateLimits.get(bucketKey) || []).filter((timestamp) => now - timestamp < windowMs);
  if (bucket.length >= maxRequests) return false;
  bucket.push(now);
  rateLimits.set(bucketKey, bucket);
  return true;
}

function buildFallbackResponse({ question, location, language }) {
  const regionName = location?.name || "the current region";
  const firstAction = Array.isArray(location?.actions) ? location.actions[0]?.title : "Treat the safest available water first";
  const templates = {
    en: `For ${regionName}, start with this first step: ${firstAction}. Then keep drinking water separate from lower-priority uses, protect the cleanest water for babies, elders, medicine, or rehydration, and follow the latest trusted local advice.`,
    fr: `Pour ${regionName}, commencez par cette première étape : ${firstAction}. Ensuite, gardez l'eau de boisson séparée des usages moins prioritaires, réservez l'eau la plus sûre aux bébés, aux personnes âgées, aux médicaments et à la réhydratation, puis suivez les conseils des autorités ou intervenants de confiance.`,
    sw: `Kwa ${regionName}, anza na hatua hii ya kwanza: ${firstAction}. Kisha tenga maji ya kunywa na matumizi ya kiwango cha chini, linda maji safi zaidi kwa watoto wachanga, wazee, dawa, na kurejesha maji mwilini, halafu fuata ushauri wa mamlaka au wahudumu wanaoaminika.`,
    ar: `بالنسبة إلى ${regionName}، ابدأ بهذه الخطوة الأولى: ${firstAction}. بعد ذلك افصل مياه الشرب عن الاستخدامات الأقل أولوية، وخصص أنظف كمية من الماء للأطفال والمرضى وكبار السن وللأدوية والإماهة، ثم اتبع أحدث الإرشادات المحلية الموثوقة.`,
    bn: `${regionName} এর জন্য প্রথম ধাপ হিসেবে এটি শুরু করুন: ${firstAction}। তারপর পানির জন্য নির্ধারিত নিরাপদ পানি অন্য কম গুরুত্বপূর্ণ কাজে ব্যবহার হওয়া থেকে আলাদা রাখুন, শিশু, বয়স্ক, ওষুধ ও রিহাইড্রেশনের জন্য সবচেয়ে নিরাপদ পানি সংরক্ষণ করুন, এবং বিশ্বস্ত স্থানীয় নির্দেশনা অনুসরণ করুন।`
  };
  return templates[language] || templates.en;
}

function normalizeConversation(conversation) {
  if (!Array.isArray(conversation)) return [];
  return conversation
    .filter((message) => message?.role === "user" || message?.role === "assistant")
    .slice(-6)
    .map((message) => ({
      role: message.role,
      content: String(message.content ?? "").replace(/\s+/g, " ").trim().slice(0, 400)
    }))
    .filter((message) => message.content);
}

function resolveAssistantRegion(body) {
  const regionId = String(body.regionId ?? "").trim();
  if (!regionId) return null;
  return regions.find((region) => region.id === regionId) || null;
}

function buildAssistantPrompt({ question, language, location, conversation }) {
  const recentHistory = Array.isArray(conversation)
    ? conversation
        .slice(-6)
        .map((message) => `${message.role.toUpperCase()}: ${String(message.content ?? "")}`)
        .join("\n")
    : "";

  return `
You are Aqua Guide, a multilingual water-guidance assistant for households, volunteers, and field teams.

Rules:
- Use plain language.
- Keep responses practical and concise.
- Do not provide medical diagnosis or legal advice.
- Do not claim to be an official emergency alert feed.
- If the question implies an urgent medical or safety emergency, tell the user to contact local health authorities, trusted responders, or emergency services.
- Respond in the requested language.

Region context:
- Name: ${location?.name ?? "No active region"}
- Status: ${location?.statusLabel ?? "Unknown"}
- Utility label: ${location?.utility ?? "Unknown"}
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
  const clientKey = getClientKey(req);
  if (!checkRateLimit(clientKey, "chat", 24, 1000 * 60 * 10)) {
    sendJson(res, 429, { error: "Too many assistant requests. Please wait a moment and try again." });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const question = String(body.question ?? "").trim().slice(0, 1500);
    const language = String(body.language ?? "en").trim().toLowerCase();
    const location = resolveAssistantRegion(body);
    const conversation = normalizeConversation(body.conversation);
    if (!question) {
      sendJson(res, 400, { error: "Question is required." });
      return;
    }

    const prompt = buildAssistantPrompt({
      question,
      language,
      location,
      conversation
    });

    if (!openAiApiKey) {
      sendJson(res, 200, {
        text: buildFallbackResponse({ question, language, location }),
        meta: "Aqua Guide fallback guidance"
      });
      return;
    }

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
      sendJson(res, 200, {
        text: buildFallbackResponse({ question, language, location }),
        meta: "Aqua Guide fallback guidance"
      });
      return;
    }

    const payload = await response.json();
    const text = extractResponseText(payload);
    sendJson(res, 200, {
      text: text || buildFallbackResponse({ question, language, location }),
      meta: openAiModel
    });
  } catch (error) {
    sendJson(res, 200, {
      text: buildFallbackResponse({ question: "", language: "en", location: null }),
      meta: error instanceof Error ? error.message : "Aqua Guide fallback guidance"
    });
  }
}

async function handleRegions(res) {
  sendJson(res, 200, {
    critical: serializeRegion(sortRegionsByPriority(regions)[0]),
    regions: sortRegionsByPriority(regions).map(serializeRegion)
  });
}

async function handleRegion(url, res) {
  const id = url.searchParams.get("id");
  const region = regions.find((item) => item.id === id);
  if (!region) {
    sendJson(res, 404, { error: "Region not found." });
    return;
  }
  sendJson(res, 200, {
    region: serializeRegion(region),
    liveData: await buildLiveData(region)
  });
}

async function handleSearch(url, res) {
  const query = String(url.searchParams.get("q") || "").trim();
  if (!query) {
    sendJson(res, 400, { error: "Search query is required." });
    return;
  }

  const exactRegion = findRegionByQuery(query);
  if (exactRegion) {
    sendJson(res, 200, {
      match: "exact-region",
      region: serializeRegion(exactRegion),
      liveData: await buildLiveData(exactRegion)
    });
    return;
  }

  const place = await geocodeQuery(query);
  if (!place) {
    sendJson(res, 404, { error: "We could not match that place yet." });
    return;
  }

  const nearest = getNearestRegion({ lat: place.lat, lng: place.lng });
  sendJson(res, 200, {
    match: "closest-region",
    resolvedPlace: {
      name: place.name,
      distanceLabel: formatDistance(nearest.distanceKm)
    },
    region: serializeRegion(nearest.region),
    liveData: await buildLiveData(nearest.region)
  });
}

async function handleReverse(url, res) {
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    sendJson(res, 400, { error: "Latitude and longitude are required." });
    return;
  }

  const place = await reverseGeocode(lat, lng);
  const nearest = getNearestRegion({ lat, lng });
  sendJson(res, 200, {
    resolvedPlace: {
      name: place.name,
      distanceLabel: formatDistance(nearest.distanceKm)
    },
    region: serializeRegion(nearest.region),
    liveData: await buildLiveData(nearest.region)
  });
}

const server = http.createServer(async (req, res) => {
  applySecurityHeaders(res);
  const url = new URL(req.url, `http://${req.headers.host}`);
  const clientKey = getClientKey(req);

  if (url.pathname === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/regions" && req.method === "GET") {
    await handleRegions(res);
    return;
  }

  if (url.pathname === "/api/region" && req.method === "GET") {
    await handleRegion(url, res);
    return;
  }

  if (url.pathname === "/api/search" && req.method === "GET") {
    if (!checkRateLimit(clientKey, "lookup", 60, 1000 * 60 * 10)) {
      sendJson(res, 429, { error: "Too many lookup requests. Please wait a moment and try again." });
      return;
    }
    await handleSearch(url, res);
    return;
  }

  if (url.pathname === "/api/reverse" && req.method === "GET") {
    if (!checkRateLimit(clientKey, "lookup", 60, 1000 * 60 * 10)) {
      sendJson(res, 429, { error: "Too many lookup requests. Please wait a moment and try again." });
      return;
    }
    await handleReverse(url, res);
    return;
  }

  if (url.pathname === "/api/chat" && req.method === "POST") {
    await handleChat(req, res);
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  const requestPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = safePath.replace(/^[/\\]+/, "");
  const pathParts = relativePath.split(/[/\\]+/).filter(Boolean);
  const topLevel = pathParts[0] || "";
  const basename = pathParts[pathParts.length - 1] || "";

  if (
    !relativePath ||
    pathParts.some((part) => part.startsWith(".")) ||
    (!staticFiles.has(relativePath) && !staticRoots.has(topLevel))
  ) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  if (basename.startsWith(".")) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

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
