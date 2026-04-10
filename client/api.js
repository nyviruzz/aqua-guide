import { findRegionByQuery } from "../data/regions.js";
import { buildTrackedPayload, hydrateTrackedPayload, resolveDynamicPayloadFromQuery } from "./location-service.js";

function trimValue(value, maxLength = 320) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export async function getRegionDetails(id) {
  return hydrateTrackedPayload(buildTrackedPayload(id));
}

export async function resolveRegionQuery(query) {
  const trackedRegion = findRegionByQuery(query);
  if (trackedRegion) {
    return hydrateTrackedPayload(
      buildTrackedPayload(trackedRegion, {
        match: "exact-region",
        resolvedPlace: { name: trackedRegion.name }
      })
    );
  }
  return resolveDynamicPayloadFromQuery(query);
}

export function toAssistantLocationContext(region, liveData) {
  if (!region?.name) return null;

  return {
    id: trimValue(region.id, 120),
    tracked: Boolean(region.tracked),
    name: trimValue(region.name, 120),
    country: trimValue(region.country, 80),
    flag: trimValue(region.flag, 8),
    status: trimValue(region.status, 24),
    statusLabel: trimValue(region.statusLabel, 48),
    utility: trimValue(region.utility, 160),
    recordLabel: trimValue(region.recordLabel, 140),
    tag: trimValue(region.tag, 80),
    oneLiner: trimValue(region.oneLiner, 220),
    heroDescription: trimValue(region.heroDescription, 260),
    summaryTitle: trimValue(region.summaryTitle, 120),
    summaryText: trimValue(region.summaryText, 700),
    quickSummary: trimValue(region.quickSummary, 360),
    qualityIndex: Number(region.qualityIndex || 0),
    metrics: {
      updated: trimValue(region?.metrics?.updated || "Live public data", 80)
    },
    aiSuggestions: Array.isArray(region.aiSuggestions)
      ? region.aiSuggestions.map((item) => trimValue(item, 120)).filter(Boolean).slice(0, 6)
      : [],
    actions: Array.isArray(region.actions)
      ? region.actions
          .slice(0, 6)
          .map((action) => ({
            title: trimValue(action?.title, 120),
            description: trimValue(action?.description, 220)
          }))
          .filter((action) => action.title)
      : [],
    liveData: {
      drinkingWater: trimValue(liveData?.drinkingWater?.display, 40),
      sanitation: trimValue(liveData?.sanitation?.display, 40),
      population: trimValue(liveData?.population?.display, 40),
      weather: liveData?.weather
        ? trimValue(`${liveData.weather.temperatureC}°C, ${liveData.weather.label}`, 120)
        : "",
      updated: trimValue(region?.metrics?.updated || "Live public data", 80)
    }
  };
}

export function getReferenceHref(reference, basePath = "./") {
  if (!reference) return `${basePath}assistant/`;
  if (reference.type === "id") return `${basePath}assistant/?region=${encodeURIComponent(reference.value)}`;
  if (reference.type === "query") return `${basePath}assistant/?q=${encodeURIComponent(reference.value)}`;
  return `${basePath}assistant/`;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error || payload?.detail || `Request failed: ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

export function sendAssistantMessage(payload) {
  return fetchJson("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
