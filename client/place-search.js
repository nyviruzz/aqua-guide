import { searchPlaceCandidates } from "./location-service.js";

function buildRegionHrefFromCandidate(candidate, basePath = "./") {
  const url = new URL(`${basePath}region/`, window.location.href);
  url.searchParams.set("lat", String(candidate.lat));
  url.searchParams.set("lng", String(candidate.lng));
  url.searchParams.set("name", candidate.name);
  url.searchParams.set("admin1", candidate.admin1 || "");
  url.searchParams.set("country", candidate.country || "");
  url.searchParams.set("iso2", candidate.countryCode || "");
  return url.toString();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function highlightMatch(label, query) {
  const safeLabel = escapeHtml(label);
  const safeQuery = String(query || "").trim();
  if (!safeQuery) return safeLabel;

  const lowerLabel = label.toLowerCase();
  const lowerQuery = safeQuery.toLowerCase();
  const index = lowerLabel.indexOf(lowerQuery);
  if (index === -1) return safeLabel;

  const start = escapeHtml(label.slice(0, index));
  const match = escapeHtml(label.slice(index, index + safeQuery.length));
  const end = escapeHtml(label.slice(index + safeQuery.length));
  return `${start}<mark>${match}</mark>${end}`;
}

function renderSuggestions(node, query, candidates, state) {
  if (!node) return;
  if (!query || query.length < 2) {
    node.hidden = true;
    node.innerHTML = "";
    return;
  }

  if (state.loading) {
    node.hidden = false;
    node.innerHTML = `<div class="search-suggestion-empty">Searching places...</div>`;
    return;
  }

  if (!candidates.length) {
    node.hidden = false;
    node.innerHTML = `<div class="search-suggestion-empty">No exact match yet. Try a nearby city, state, or country.</div>`;
    return;
  }

  node.hidden = false;
  node.innerHTML = candidates
    .map(
      (candidate, index) => `
        <button class="search-suggestion ${index === state.activeIndex ? "is-active" : ""}" type="button" data-suggestion-index="${index}" aria-selected="${index === state.activeIndex ? "true" : "false"}">
          <strong>${highlightMatch(candidate.label, query)}</strong>
          <span>${
            candidate.matchedQuery.toLowerCase() === query.toLowerCase()
              ? "City-level match"
              : `Broader fallback from ${escapeHtml(candidate.matchedQuery)}`
          }</span>
        </button>
      `
    )
    .join("");
}

export function attachPlaceSearch({
  formSelector,
  inputSelector,
  suggestionsSelector,
  basePath = "./",
  onCandidate,
  onRawSubmit
}) {
  const form = document.querySelector(formSelector);
  const input = document.querySelector(inputSelector);
  const suggestionNode = document.querySelector(suggestionsSelector);
  if (!form || !input || !suggestionNode) return;

  const state = {
    candidates: [],
    loading: false,
    token: 0,
    activeIndex: -1
  };

  function clearSuggestions() {
    state.candidates = [];
    state.activeIndex = -1;
    suggestionNode.hidden = true;
    suggestionNode.innerHTML = "";
  }

  function selectCandidate(candidate) {
    if (!candidate) return;
    input.value = candidate.label;
    clearSuggestions();
    if (onCandidate) {
      onCandidate(candidate);
      return;
    }
    window.location.href = buildRegionHrefFromCandidate(candidate, basePath);
  }

  function setActiveIndex(nextIndex) {
    if (!state.candidates.length) {
      state.activeIndex = -1;
      return;
    }
    const bounded = ((nextIndex % state.candidates.length) + state.candidates.length) % state.candidates.length;
    state.activeIndex = bounded;
    renderSuggestions(suggestionNode, input.value.trim(), state.candidates, state);
  }

  async function refreshSuggestions() {
    const query = input.value.trim();
    const token = ++state.token;
    if (query.length < 2) {
      clearSuggestions();
      return;
    }

    state.loading = true;
    renderSuggestions(suggestionNode, query, state.candidates, state);

    try {
      const candidates = await searchPlaceCandidates(query, 6);
      if (token !== state.token) return;
      state.candidates = candidates;
      state.activeIndex = candidates.length === 1 ? 0 : -1;
    } catch {
      if (token !== state.token) return;
      state.candidates = [];
      state.activeIndex = -1;
    } finally {
      if (token !== state.token) return;
      state.loading = false;
      renderSuggestions(suggestionNode, query, state.candidates, state);
    }
  }

  let debounceId = 0;
  input.addEventListener("input", () => {
    window.clearTimeout(debounceId);
    debounceId = window.setTimeout(refreshSuggestions, 220);
  });

  input.addEventListener("focus", () => {
    if (state.candidates.length) {
      renderSuggestions(suggestionNode, input.value.trim(), state.candidates, state);
    } else if (input.value.trim().length >= 2) {
      refreshSuggestions();
    }
  });

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Escape") {
      clearSuggestions();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!state.candidates.length && input.value.trim().length >= 2) {
        await refreshSuggestions();
      }
      if (state.candidates.length) {
        setActiveIndex(state.activeIndex < 0 ? 0 : state.activeIndex + 1);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (state.candidates.length) {
        setActiveIndex(state.activeIndex < 0 ? state.candidates.length - 1 : state.activeIndex - 1);
      }
      return;
    }

    if (event.key === "Enter" && !suggestionNode.hidden && state.activeIndex >= 0) {
      event.preventDefault();
      selectCandidate(state.candidates[state.activeIndex]);
    }
  });

  suggestionNode.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("[data-suggestion-index]");
    if (!button) return;
    const candidate = state.candidates[Number(button.getAttribute("data-suggestion-index"))];
    selectCandidate(candidate);
  });

  suggestionNode.addEventListener("mousemove", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("[data-suggestion-index]");
    if (!button) return;
    const nextIndex = Number(button.getAttribute("data-suggestion-index"));
    if (Number.isInteger(nextIndex) && nextIndex !== state.activeIndex) {
      setActiveIndex(nextIndex);
    }
  });

  document.addEventListener("click", (event) => {
    if (form.contains(event.target) || suggestionNode.contains(event.target)) return;
    clearSuggestions();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
      input.focus();
      return;
    }

    const exactCandidate =
      state.candidates.find((candidate) =>
        [candidate.label, candidate.name, `${candidate.name}, ${candidate.country}`].some(
          (value) => normalizeValue(value) === normalizeValue(query)
        )
      ) || (state.candidates.length === 1 ? state.candidates[0] : null);

    if (exactCandidate) {
      selectCandidate(exactCandidate);
      return;
    }

    if (state.candidates.length > 1) {
      state.activeIndex = 0;
      renderSuggestions(suggestionNode, query, state.candidates, state);
      return;
    }

    clearSuggestions();

    if (onRawSubmit) {
      onRawSubmit(query);
      return;
    }

    const url = new URL(`${basePath}region/`, window.location.href);
    url.searchParams.set("q", query);
    window.location.href = url.toString();
  });
}

export { buildRegionHrefFromCandidate };
