import { getRegionDetails, reverseLookup, resolveRegionQuery } from "./api.js";
import {
  bindActionModal,
  bindSearchForm,
  escapeHtml,
  iconSvg,
  renderActions,
  renderHighlights,
  renderModalShell,
  renderNotFoundState,
  renderRegionBreadcrumb,
  renderShell,
  renderSources,
  renderStatusBadge,
  setDocumentTitle,
  setLastRegionId,
  showToast,
  toggleFavorite
} from "./common.js";

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderMetricCard(label, value, footnote) {
  return `
    <article class="live-metric-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${footnote}</p>
    </article>
  `;
}

function buildLiveContext(payload) {
  const { liveData } = payload;
  return `
    <section class="live-context-section">
      <div class="section-head">
        <div>
          <p class="section-label">Live context</p>
          <h2>Country indicators and weather around this region</h2>
        </div>
        <p class="section-meta">Aqua Guide pairs region-specific guidance with live public signals that help frame urgency.</p>
      </div>
      <div class="live-metric-grid">
        ${renderMetricCard(
          "Basic drinking water access",
          liveData.drinkingWater ? liveData.drinkingWater.display : "Unavailable",
          liveData.drinkingWater ? `${liveData.drinkingWater.year} · World Bank` : "Live source unavailable"
        )}
        ${renderMetricCard(
          "Basic sanitation access",
          liveData.sanitation ? liveData.sanitation.display : "Unavailable",
          liveData.sanitation ? `${liveData.sanitation.year} · World Bank` : "Live source unavailable"
        )}
        ${renderMetricCard(
          "Population",
          liveData.population ? liveData.population.display : "Unavailable",
          liveData.population ? `${liveData.population.year} · World Bank` : "Live source unavailable"
        )}
        ${renderMetricCard(
          "Current weather",
          liveData.weather ? `${liveData.weather.temperatureC}°C · ${liveData.weather.label}` : "Unavailable",
          liveData.weather ? `Wind ${liveData.weather.windKmh} km/h · Precip ${liveData.weather.precipitationMm} mm` : "Live source unavailable"
        )}
      </div>
    </section>
  `;
}

function buildRegionPage(payload) {
  const { region, resolvedPlace, match } = payload;
  const resolverCopy =
    match === "closest-region" && resolvedPlace
      ? `Showing guidance for the closest tracked region to ${resolvedPlace.name}.`
      : match === "exact-region"
        ? "Showing the tracked region that best matches your search."
        : "";

  return `
    <div class="page-shell">
      ${renderRegionBreadcrumb(region)}
      ${resolverCopy ? `<div class="resolver-banner">${escapeHtml(resolverCopy)}</div>` : ""}
      <section class="hero hero-region">
        <div class="hero-grid region-hero-grid">
          <div class="hero-copy">
            <p class="hero-kicker">${region.tag}</p>
            <h1>${region.name}</h1>
            <p>${region.heroDescription}</p>
            <div class="hero-copy-cluster">
              ${renderStatusBadge(region)}
              <span class="meta-pill">${region.utility}</span>
              <span class="meta-pill">${region.recordLabel}</span>
            </div>
          </div>
          <aside class="hero-status-card solid">
            <div class="hero-status-top">
              <p class="eyebrow">Region status</p>
              ${renderStatusBadge(region)}
            </div>
            <h2>Quality index ${region.qualityIndex}/100</h2>
            <div class="hero-detail-grid">
              <div><span>Lead</span><strong>${region.metrics.lead} ppb</strong></div>
              <div><span>Chlorine</span><strong>${region.metrics.chlorine} ppm</strong></div>
              <div><span>pH</span><strong>${region.metrics.ph}</strong></div>
              <div><span>Updated</span><strong>${region.metrics.updated}</strong></div>
            </div>
            <div class="hero-card-actions">
              <button id="saveRegionButton" class="secondary-button" type="button">Save region</button>
              <button id="copySummaryButton" class="ghost-button" type="button">Copy summary</button>
            </div>
          </aside>
        </div>
      </section>

      <section class="search-section search-section-inline">
        <form id="regionSearchForm" class="search-bar">
          <div class="search-icon">${iconSvg.search}</div>
          <input id="regionSearchInput" type="text" placeholder="Search another region or place" autocomplete="off" />
          <button class="primary-button" type="submit">Open guidance</button>
          <button id="useLocationButton" class="secondary-button" type="button">Use my location</button>
        </form>
        <div id="toast" class="toast" role="status" aria-live="polite"></div>
      </section>

      ${renderHighlights(region)}
      ${buildLiveContext(payload)}
      ${renderActions(region)}
      ${renderSources(region)}
      <section class="assistant-inline">
        <div class="section-head">
          <div>
            <p class="section-label">Need help understanding this?</p>
            <h2>Open Aqua Assistant with this region already loaded</h2>
          </div>
        </div>
        <div class="helper-row">
          ${region.aiSuggestions
            .map(
              (question) => `
                <a class="helper-chip" href="../assistant/?region=${encodeURIComponent(region.id)}&question=${encodeURIComponent(question)}">${question}</a>
              `
            )
            .join("")}
        </div>
      </section>
      ${renderModalShell()}
    </div>
  `;
}

function buildCopySummary(payload) {
  const { region, liveData } = payload;
  return [
    `${region.name} · ${region.statusLabel}`,
    region.quickSummary,
    liveData.drinkingWater ? `Basic drinking water access: ${liveData.drinkingWater.display} (${liveData.drinkingWater.year})` : null,
    liveData.sanitation ? `Basic sanitation access: ${liveData.sanitation.display} (${liveData.sanitation.year})` : null
  ]
    .filter(Boolean)
    .join("\n");
}

async function loadRegionPayload() {
  const id = getParam("id");
  const query = getParam("q");
  if (id) return getRegionDetails(id);
  if (query) return resolveRegionQuery(query);
  return getRegionDetails("turkana-kenya");
}

async function init() {
  renderShell({ basePath: "../", activeNav: "regions" });
  setDocumentTitle("Region");

  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="page-shell">
      <section class="loading-state">
        <p class="section-label">Loading</p>
        <h1>Preparing the latest region guidance.</h1>
      </section>
    </div>
  `;

  try {
    const payload = await loadRegionPayload();
    if (!payload?.region) {
      main.innerHTML = `<div class="page-shell">${renderNotFoundState("../")}</div>`;
      return;
    }

    setLastRegionId(payload.region.id);
    setDocumentTitle(payload.region.name);
    main.innerHTML = buildRegionPage(payload);

    bindSearchForm({
      formSelector: "#regionSearchForm",
      inputSelector: "#regionSearchInput",
      targetBasePath: "../"
    });
    bindActionModal(payload.region);

    document.getElementById("saveRegionButton")?.addEventListener("click", () => {
      const saved = toggleFavorite(payload.region.id);
      document.getElementById("saveRegionButton").textContent = saved ? "Saved" : "Save region";
      showToast(saved ? "Region saved" : "Region removed");
    });

    document.getElementById("copySummaryButton")?.addEventListener("click", async () => {
      await navigator.clipboard.writeText(buildCopySummary(payload));
      showToast("Summary copied");
    });

    document.getElementById("useLocationButton")?.addEventListener("click", () => {
      if (!navigator.geolocation) {
        showToast("Geolocation is not supported in this browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const result = await reverseLookup(position.coords.latitude, position.coords.longitude);
            window.location.href = `../region/?id=${encodeURIComponent(result.region.id)}`;
          } catch (error) {
            showToast(error instanceof Error ? error.message : "Unable to match your location");
          }
        },
        () => showToast("Unable to read your location right now"),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  } catch (error) {
    main.innerHTML = `
      <div class="page-shell">
        <section class="empty-state">
          <p class="section-label">Unavailable</p>
          <h1>We could not load this region.</h1>
          <p>${error instanceof Error ? error.message : "Unknown error"}</p>
        </section>
      </div>
    `;
  }
}

init();
