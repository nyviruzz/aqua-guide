import { escapeHtml, getActiveLocationContext, iconSvg, renderShell, setDocumentTitle } from "./common.js";

const resourceGroups = {
  households: {
    label: "Households",
    accent: "blue",
    description: "Simple decisions for families storing, treating, and reserving safe water.",
    items: [
      {
        title: "Treat first, then store",
        body: "Reserve the cleanest available water for direct consumption, then protect it in a clean covered container.",
        icon: "droplet",
        prompt: "Give me a simple household script for treating and storing safe water in {place}."
      },
      {
        title: "Separate containers by use",
        body: "Keep drinking water separate from cleanup, sanitation, and general washing water so the safest supply stays protected.",
        icon: "box",
        prompt: "Explain how a family in {place} should separate drinking water from cleanup water."
      },
      {
        title: "Protect infant and medicine water",
        body: "Use the safest treated supply for formula, medicine, rehydration, and anyone already weak or sick.",
        icon: "baby",
        prompt: "Summarize which water should be reserved for babies, medicine, and vulnerable people in {place}."
      }
    ]
  },
  field: {
    label: "Field teams",
    accent: "amber",
    description: "Operational language that responders, volunteers, and presenters can repeat consistently.",
    items: [
      {
        title: "Use one household-ready summary",
        body: "Translate the current water situation into one short plan that can be copied into chats, posters, or volunteer briefings.",
        icon: "file",
        prompt: "Write a volunteer-ready briefing for {place} in plain language."
      },
      {
        title: "Design for handoff",
        body: "Make sure responders, volunteers, and households are all using the same status language and the same first-step guidance.",
        icon: "share",
        prompt: "Turn the current water guidance for {place} into a handoff note for the next shift."
      },
      {
        title: "Keep the next action visible",
        body: "People remember one action card better than a long paragraph. Lead with the immediate household decision.",
        icon: "alert",
        prompt: "Reduce the plan for {place} to one immediate action and two supporting steps."
      }
    ]
  },
  translations: {
    label: "Translations",
    accent: "green",
    description: "Language-ready prompts for multilingual households, aid teams, and community groups.",
    items: [
      {
        title: "Explain the first step",
        body: "Start with the direct action: treat the cleanest water first and keep it separate from lower-priority uses.",
        icon: "spark",
        prompt: "Translate the first safe-water step for {place} into clear Spanish."
      },
      {
        title: "Translate for the actual household",
        body: "Use the assistant to restate the plan for family members, volunteers, and caregivers in the most useful language.",
        icon: "globe",
        prompt: "Restate the water plan for {place} in a caregiver-friendly tone."
      },
      {
        title: "Avoid jargon",
        body: "Clarity builds trust faster than technical language, especially during interruptions, flooding, or severe scarcity.",
        icon: "shield",
        prompt: "Rewrite the guidance for {place} without technical jargon."
      }
    ]
  }
};

function buildAssistantHref(location, prompt) {
  const url = new URL("../assistant/", window.location.origin);
  if (location?.tracked && location.id) {
    url.searchParams.set("region", location.id);
  } else if (location?.name) {
    url.searchParams.set("q", location.name);
  }
  url.searchParams.set("question", prompt);
  return `${url.pathname}${url.search}`;
}

function fillPromptTemplate(prompt, location) {
  return String(prompt || "").replaceAll("{place}", location?.name || "this place");
}

function renderResourceCard(item, accent, location) {
  const prompt = fillPromptTemplate(item.prompt, location);
  const href = buildAssistantHref(location, prompt);
  return `
    <article class="resource-card resource-card-${accent}">
      <div class="resource-card-top">
        <div class="resource-card-icon">${iconSvg[item.icon] || iconSvg.file}</div>
        <span class="resource-card-tag">${escapeHtml(accent === "amber" ? "Response pattern" : accent === "green" ? "Language support" : "Household action")}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      <div class="resource-card-actions">
        <a class="inline-link" href="${href}">Try this in the assistant</a>
        <span class="resource-card-meta">${location?.name ? escapeHtml(location.name) : "General guidance"}</span>
      </div>
    </article>
  `;
}

function renderGroupSection(groupKey, location, activeGroup) {
  const group = resourceGroups[groupKey];
  return `
    <section class="resource-section ${activeGroup === groupKey ? "is-active" : ""}" id="resource-group-${groupKey}">
      <div class="section-head compact">
        <div>
          <p class="section-label">${escapeHtml(group.label)}</p>
          <h2>${escapeHtml(group.description)}</h2>
        </div>
        <p class="section-meta">${group.items.length} ready-to-use guidance cards</p>
      </div>
      <div class="resource-grid">
        ${group.items.map((item) => renderResourceCard(item, group.accent, location)).join("")}
      </div>
    </section>
  `;
}

function renderLocationBanner(location) {
  if (!location?.name) {
    return `
      <section class="resource-location-banner">
        <div>
          <p class="section-label">Current context</p>
          <h2>No location pinned yet</h2>
        </div>
        <p>Open a region or search a city first, then come back here to turn these patterns into place-specific scripts.</p>
      </section>
    `;
  }

  return `
    <section class="resource-location-banner">
      <div>
        <p class="section-label">Current context</p>
        <h2>${escapeHtml(location.flag || "🌍")} ${escapeHtml(location.name)}</h2>
      </div>
      <p>${escapeHtml(location.quickSummary || location.oneLiner || "This place is ready for tailored household and volunteer guidance.")}</p>
    </section>
  `;
}

function renderHero(location) {
  const place = location?.name || "any selected place";
  return `
    <section class="resources-hero">
      <div class="resources-hero-panel">
        <div class="resources-hero-copy">
          <p class="hero-kicker">Resources</p>
          <h1>Scripts, checklists, and translation-ready patterns for real water guidance</h1>
          <p>Use these patterns to move from raw data to something a household, volunteer, or judge can understand in seconds.</p>
        </div>
        <aside class="resources-hero-checklist">
          <p class="eyebrow">Fast briefing for ${escapeHtml(place)}</p>
          <h2>Emergency water checklist</h2>
          <ol>
            <li>Identify the cleanest available water before mixing sources.</li>
            <li>Treat the protected supply first, then store it in a covered container.</li>
            <li>Reserve the safest water for drinking, medicine, and vulnerable people.</li>
          </ol>
        </aside>
      </div>
    </section>
  `;
}

function renderMethodSection(location) {
  const place = location?.name || "any searched place";
  return `
    <section class="method-section">
      <div class="section-head">
        <div>
          <p class="section-label">How Aqua Guide works</p>
          <h2>What powers the product</h2>
        </div>
        <p class="section-meta">Every card here is designed to become a presentable action, not just a paragraph.</p>
      </div>
      <div class="method-grid">
        <article class="method-card">
          <h3>Global search coverage</h3>
          <p>Any searched place can combine live public water-access indicators, weather conditions, and household guidance without waiting for a custom backend profile.</p>
        </article>
        <article class="method-card">
          <h3>Assistant support</h3>
          <p>The assistant can answer follow-ups for ${escapeHtml(place)} and restate the plan for different audiences or languages.</p>
        </article>
        <article class="method-card">
          <h3>Operational framing</h3>
          <p>The interface is tuned for a clear first step, which is what presentations, field teams, and families all respond to fastest.</p>
        </article>
      </div>
    </section>
  `;
}

function renderPage(activeGroup = "households", location = null) {
  return `
    <div class="page-shell">
      ${renderHero(location)}
      ${renderLocationBanner(location)}
      <section class="resource-filter-section">
        <div class="filter-row">
          ${Object.entries(resourceGroups)
            .map(
              ([groupKey, group]) => `
                <button class="filter-pill ${groupKey === activeGroup ? "is-active" : ""}" data-group="${groupKey}" type="button">
                  ${escapeHtml(group.label)} <span class="filter-pill-count">${group.items.length}</span>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="resource-sections">
          ${Object.keys(resourceGroups)
            .map((groupKey) => renderGroupSection(groupKey, location, activeGroup))
            .join("")}
        </div>
      </section>
      ${renderMethodSection(location)}
    </div>
  `;
}

function init() {
  renderShell({ basePath: "../", activeNav: "resources" });
  setDocumentTitle("Resources");
  const main = document.getElementById("main");
  const location = getActiveLocationContext();
  let activeGroup = "households";

  function rerender() {
    main.innerHTML = renderPage(activeGroup, location);
    main.querySelectorAll("[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        activeGroup = button.getAttribute("data-group") || "households";
        rerender();
      });
    });
  }

  rerender();
}

init();
