async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error || payload?.detail || `Request failed: ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

export function getRegions() {
  return fetchJson("/api/regions");
}

export function getRegionDetails(id) {
  return fetchJson(`/api/region?id=${encodeURIComponent(id)}`);
}

export function resolveRegionQuery(query) {
  return fetchJson(`/api/search?q=${encodeURIComponent(query)}`);
}

export function reverseLookup(lat, lng) {
  return fetchJson(`/api/reverse?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`);
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
