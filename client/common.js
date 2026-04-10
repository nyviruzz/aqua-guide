import { getMostCriticalRegion, getRegionById, regions, sortRegionsByPriority } from "../data/regions.js";

export const iconSvg = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.29 7L12 12l8.71-5"/><path d="M12 22V12"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51L8.59 10.49"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>',
  baby: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M7 21v-3a5 5 0 0 1 10 0v3"/><path d="M9 4l1-2h4l1 2"/></svg>'
};

const favoriteStorageKey = "aqua-guide-favorites";
const quickReadStorageKey = "aqua-guide-quick-read";
const assistantLanguageStorageKey = "aqua-guide-assistant-language";
const lastRegionStorageKey = "aqua-guide-last-region";

export const languageCatalog = {
  en: { label: "English", placeholder: "Ask about safe water, treatment, storage, or translation..." },
  fr: { label: "French", placeholder: "Posez une question sur la sécurité de l'eau, le traitement ou la traduction..." },
  sw: { label: "Swahili", placeholder: "Uliza kuhusu maji salama, matibabu, uhifadhi, au tafsiri..." },
  ar: { label: "Arabic", placeholder: "اسأل عن سلامة المياه أو المعالجة أو التخزين أو الترجمة..." },
  bn: { label: "Bengali", placeholder: "নিরাপদ পানি, চিকিৎসা, সংরক্ষণ, বা অনুবাদ সম্পর্কে জিজ্ঞেস করুন..." }
};

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value || 0));
}

export function formatPercent(value) {
  return `${Math.round(Number(value || 0))}%`;
}

export function getFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(favoriteStorageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFavorite(regionId) {
  return getFavorites().includes(regionId);
}

export function toggleFavorite(regionId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(regionId)
    ? favorites.filter((id) => id !== regionId)
    : [...favorites, regionId];
  localStorage.setItem(favoriteStorageKey, JSON.stringify(nextFavorites));
  return nextFavorites.includes(regionId);
}

export function getFavoriteRegions() {
  return getFavorites().map(getRegionById);
}

export function getQuickRead() {
  return localStorage.getItem(quickReadStorageKey) === "true";
}

export function setQuickRead(nextValue) {
  localStorage.setItem(quickReadStorageKey, String(Boolean(nextValue)));
  document.body.classList.toggle("quick-read", Boolean(nextValue));
}

export function getAssistantLanguage() {
  const stored = localStorage.getItem(assistantLanguageStorageKey);
  return languageCatalog[stored] ? stored : "en";
}

export function setAssistantLanguage(language) {
  if (languageCatalog[language]) {
    localStorage.setItem(assistantLanguageStorageKey, language);
  }
}

export function getLastRegionId() {
  return localStorage.getItem(lastRegionStorageKey) || getMostCriticalRegion().id;
}

export function setLastRegionId(regionId) {
  localStorage.setItem(lastRegionStorageKey, regionId);
}

export function setDocumentTitle(label) {
  document.title = label ? `${label} - Aqua Guide` : "Aqua Guide";
}

function renderNavLinks(basePath, active) {
  const navLinks = [
    { id: "home", href: `${basePath}`, label: "Home" },
    { id: "regions", href: `${basePath}region/`, label: "Regions" },
    { id: "assistant", href: `${basePath}assistant/`, label: "Assistant" },
    { id: "resources", href: `${basePath}resources/`, label: "Resources" }
  ];

  return navLinks
    .map((item) => `<li><a href="${item.href}" class="${item.id === active ? "is-active" : ""}">${item.label}</a></li>`)
    .join("");
}

export function renderShell({ basePath = "./", activeNav = "home" }) {
  const header = document.getElementById("siteHeader");
  const footer = document.getElementById("siteFooter");
  header.innerHTML = `
    <div class="topbar">
      <nav class="nav">
        <a class="logo" href="${basePath}">
          <div class="logo-icon">${iconSvg.droplet}</div>
          <div>
            <span class="logo-text">Aqua Guide</span>
            <p class="logo-subtext">Water guidance for households and field teams</p>
          </div>
        </a>
        <div class="nav-right">
          <ul class="nav-links">${renderNavLinks(basePath, activeNav)}</ul>
          <button id="quickReadToggle" class="quick-read-toggle" type="button" aria-pressed="${getQuickRead()}">Quick Read</button>
        </div>
      </nav>
    </div>
  `;
  footer.innerHTML = `
    <div class="footer-inner">
      <p>Aqua Guide provides plain-language water guidance for tracked regions and should be used alongside official local advisories.</p>
      <div class="footer-links">
        <a href="${basePath}assistant/">Assistant</a>
        <a href="${basePath}resources/">Resources</a>
      </div>
    </div>
  `;
  document.body.classList.toggle("quick-read", getQuickRead());
  document.getElementById("quickReadToggle")?.addEventListener("click", () => {
    const nextValue = !getQuickRead();
    setQuickRead(nextValue);
    document.getElementById("quickReadToggle")?.setAttribute("aria-pressed", String(nextValue));
  });
}

export function showToast(message) {
  const node = document.getElementById("toast");
  if (!node) return;
  node.textContent = message;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    node.textContent = "";
  }, 2400);
}

export function renderStatusBadge(region) {
  return `
    <div class="status-badge status-badge-${region.status}" role="status" aria-label="Water status: ${escapeAttribute(region.statusLabel)}">
      <span class="status-dot"></span>
      <span>${escapeHtml(region.statusLabel)}</span>
    </div>
  `;
}

export function renderRegionCard(region, basePath = "./") {
  return `
    <article class="region-card region-card-${region.status}">
      <div class="region-card-top">
        <p class="eyebrow">${escapeHtml(region.tag)}</p>
        ${renderStatusBadge(region)}
      </div>
      <h3>${escapeHtml(region.flag)} ${escapeHtml(region.name)}</h3>
      <p class="region-card-meta">${escapeHtml(region.utility)}</p>
      <div class="region-card-metric">
        <span>Quality index</span>
        <strong>${escapeHtml(region.qualityIndex)}</strong>
      </div>
      <p class="region-card-copy">${escapeHtml(region.oneLiner)}</p>
      <div class="region-card-actions">
        <a class="inline-link" href="${basePath}region/?id=${encodeURIComponent(region.id)}">View guidance</a>
        <button class="chip-button" type="button" data-favorite-toggle="${escapeAttribute(region.id)}">${isFavorite(region.id) ? "Saved" : "Save"}</button>
      </div>
    </article>
  `;
}

export function bindFavoriteButtons(scope = document) {
  scope.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const regionId = button.getAttribute("data-favorite-toggle");
      const saved = toggleFavorite(regionId);
      button.textContent = saved ? "Saved" : "Save";
    });
  });
}

export function renderFavoriteStrip(basePath = "./") {
  const favorites = getFavoriteRegions();
  if (!favorites.length) return "";
  return `
    <section class="favorite-strip">
      <div class="section-head"><div><p class="section-label">Saved regions</p><h2>Quick access for the places you care about most</h2></div></div>
      <div class="saved-grid">
        ${favorites
          .map(
            (region) => `
              <a class="saved-chip" href="${basePath}region/?id=${encodeURIComponent(region.id)}">
                <span>${escapeHtml(region.flag)} ${escapeHtml(region.name)}</span>
                ${renderStatusBadge(region)}
              </a>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderHighlights(region) {
  const copy = getQuickRead() ? region.quickSummary : region.summaryText;
  return `
    <section class="summary-card">
      <div class="section-head compact"><div><p class="section-label">Water summary</p><h2>${escapeHtml(region.summaryTitle)}</h2></div></div>
      <p class="summary-copy">${escapeHtml(copy)}</p>
      <div class="summary-highlights">
        ${region.highlights
          .map(
            (highlight) => `
              <article class="summary-highlight tone-${escapeAttribute(highlight.tone)}">
                <div class="summary-highlight-icon">${iconSvg[highlight.icon] ?? iconSvg.spark}</div>
                <div><h3>${escapeHtml(highlight.title)}</h3><p>${escapeHtml(highlight.detail)}</p></div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderActions(region) {
  return `
    <section class="action-section">
      <div class="section-head"><div><p class="section-label">Household actions</p><h2>${escapeHtml(region.actionsTitle)}</h2></div><p class="section-meta">${escapeHtml(region.actionsSubtitle)}</p></div>
      <div class="action-grid">
        ${region.actions
          .map(
            (action) => `
              <button class="action-card tone-${escapeAttribute(action.tone)}" data-action-id="${escapeAttribute(action.id)}" type="button">
                <div class="action-icon">${iconSvg[action.icon] ?? iconSvg.spark}</div>
                <div><h3>${escapeHtml(action.title)}</h3><p>${escapeHtml(action.description)}</p></div>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderSources(region) {
  return `
    <section class="sources-section">
      <div class="section-head compact"><div><p class="section-label">Data sources</p><h2>Signals behind the guidance</h2></div></div>
      <div class="sources-row">
        ${region.sources
          .map(
            (source) => `
              <div class="source-pill">
                <span class="source-icon">${iconSvg[source.icon] ?? iconSvg.file}</span>
                <span>${escapeHtml(source.label)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

export function renderModalShell() {
  return `
    <div id="actionModal" class="modal" hidden>
      <div class="modal-backdrop" data-close-modal="true"></div>
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button id="closeModalButton" class="modal-close" type="button" aria-label="Close action details">×</button>
        <p id="modalEyebrow" class="modal-eyebrow"></p>
        <h2 id="modalTitle" class="modal-title"></h2>
        <p id="modalDescription" class="modal-description"></p>
        <ol id="modalSteps" class="modal-steps"></ol>
      </div>
    </div>
  `;
}

export function bindActionModal(region) {
  const modal = document.getElementById("actionModal");
  const title = document.getElementById("modalTitle");
  const eyebrow = document.getElementById("modalEyebrow");
  const description = document.getElementById("modalDescription");
  const steps = document.getElementById("modalSteps");
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  };
  document.querySelectorAll("[data-action-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = region.actions.find((item) => item.id === button.getAttribute("data-action-id"));
      if (!action) return;
      eyebrow.textContent = region.name;
      title.textContent = action.title;
      description.textContent = action.detail;
      steps.innerHTML = action.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
      modal.hidden = false;
      document.body.classList.add("modal-open");
    });
  });
  document.getElementById("closeModalButton")?.addEventListener("click", close);
  modal.querySelectorAll("[data-close-modal]").forEach((node) => node.addEventListener("click", close));
}

export function renderLanguageButtons(activeLanguage) {
  return Object.entries(languageCatalog)
    .map(
      ([language, config]) => `
        <button class="language-pill ${language === activeLanguage ? "is-active" : ""}" type="button" data-language="${language}">
          ${escapeHtml(config.label)}
        </button>
      `
    )
    .join("");
}

export function bindLanguageButtons(onChange) {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => onChange(button.getAttribute("data-language")));
  });
}

export function renderHomeHero(region, basePath = "./") {
  return `
    <section class="hero hero-home">
      <div class="hero-glow"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-kicker">Water guidance for households and responders</p>
          <h1>Know your water.<br /><span>Protect your home.</span></h1>
          <p>Aqua Guide turns scattered water signals into household-ready guidance for regions facing scarcity, storm damage, and fragile infrastructure.</p>
          <div class="hero-actions">
            <a class="primary-button" href="${basePath}region/?id=${encodeURIComponent(region.id)}">Explore regions</a>
            <a class="secondary-button" href="${basePath}assistant/">Open assistant</a>
          </div>
        </div>
        <aside class="hero-status-card">
          <div class="hero-status-top"><p class="eyebrow">Highest priority region</p>${renderStatusBadge(region)}</div>
          <h2>${escapeHtml(region.flag)} ${escapeHtml(region.name)}</h2>
          <p>${escapeHtml(region.oneLiner)}</p>
          <div class="hero-metric-grid">
            <div><span>Quality index</span><strong>${escapeHtml(region.qualityIndex)}</strong></div>
            <div><span>Updated</span><strong>${escapeHtml(region.metrics.updated)}</strong></div>
          </div>
          <a class="inline-link light" href="${basePath}region/?id=${encodeURIComponent(region.id)}">View details</a>
        </aside>
      </div>
    </section>
  `;
}

export function renderHomeSearch(basePath = "./") {
  return `
    <section class="search-section">
      <div class="section-head compact"><div><p class="section-label">Find guidance</p><h2>Search by region or place name</h2></div></div>
      <form id="regionSearchForm" class="search-bar">
        <div class="search-icon">${iconSvg.search}</div>
        <input id="regionSearchInput" type="text" placeholder="Search Cox's Bazar, Turkana, Beira, Haiti, or another place" autocomplete="off" />
        <button class="primary-button" type="submit">Open guidance</button>
      </form>
      <div class="search-helpers">
        ${sortRegionsByPriority(regions).map((region) => `<a class="helper-chip" href="${basePath}region/?id=${encodeURIComponent(region.id)}">${escapeHtml(region.name)}</a>`).join("")}
      </div>
      <div id="toast" class="toast" role="status" aria-live="polite"></div>
    </section>
  `;
}

export function bindSearchForm({ formSelector, inputSelector, targetBasePath }) {
  const form = document.querySelector(formSelector);
  const input = document.querySelector(inputSelector);
  if (!form || !input) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
      input.focus();
      return;
    }
    const url = new URL(`${targetBasePath}region/`, window.location.href);
    url.searchParams.set("q", query);
    window.location.href = url.toString();
  });
}

export function renderAssistantTeaser(basePath = "./") {
  const critical = getMostCriticalRegion();
  return `
    <section class="assistant-teaser">
      <div class="assistant-teaser-copy">
        <p class="section-label">Ask Aqua</p>
        <h2>Multilingual guidance when the situation changes quickly</h2>
        <p>Ask for treatment steps, storage guidance, translation support, or a plain-language explanation of the current region profile.</p>
        <div class="language-row">${renderLanguageButtons(getAssistantLanguage())}</div>
        <a class="primary-button" href="${basePath}assistant/?region=${encodeURIComponent(critical.id)}">Open assistant</a>
      </div>
      <div class="assistant-preview">
        <div class="message assistant">
          <div class="message-bubble">Start by treating the cleanest water first, reserve it for direct consumption, and keep it separate from cleanup water.</div>
          <div class="message-meta">Aqua Guide</div>
        </div>
      </div>
    </section>
  `;
}

export function renderHowItWorks() {
  return `
    <section class="how-it-works">
      <article><div class="how-icon">${iconSvg.globe}</div><h3>We monitor</h3><p>Tracked regions combine public indicators, weather context, and curated household guidance.</p></article>
      <article><div class="how-icon">${iconSvg.file}</div><h3>We simplify</h3><p>Complex water access and quality signals are turned into one clear summary and four immediate actions.</p></article>
      <article><div class="how-icon">${iconSvg.check}</div><h3>You act</h3><p>Families, field staff, and presenters can share the same plan in seconds.</p></article>
    </section>
  `;
}

export function renderRegionBreadcrumb(region) {
  return `<div class="breadcrumb"><a href="../">Home</a><span>/</span><span>${escapeHtml(region.name)}</span></div>`;
}

export function renderNotFoundState(basePath = "./") {
  return `
    <section class="empty-state">
      <p class="section-label">Region not found</p>
      <h1>We could not match that place yet.</h1>
      <p>Try a tracked region or start with the most critical profile.</p>
      <a class="primary-button" href="${basePath}region/?id=${encodeURIComponent(getMostCriticalRegion().id)}">Open a region</a>
    </section>
  `;
}
