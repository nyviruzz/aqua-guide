import { renderShell, setDocumentTitle } from "./common.js";

const resourceGroups = {
  households: [
    { title: "Treat first, then store", body: "Reserve the cleanest available water for direct consumption, then protect it in a clean covered container." },
    { title: "Separate containers by use", body: "Keep drinking water separate from cleanup, sanitation, and general washing water." },
    { title: "Protect infant and medicine water", body: "Use the safest treated supply for formula, medicine, rehydration, and anyone already weak or sick." }
  ],
  field: [
    { title: "Use one household-ready summary", body: "Translate the current water situation into one short plan that can be copied into chats, posters, or volunteer briefings." },
    { title: "Design for handoff", body: "Make sure responders, volunteers, and households are all using the same status language and the same first-step guidance." },
    { title: "Keep the next action visible", body: "People remember one action card better than a long paragraph. Lead with the immediate household decision." }
  ],
  translations: [
    { title: "Explain the first step", body: "Start with the direct action: treat the cleanest water first and keep it separate from lower-priority uses." },
    { title: "Translate for the actual household", body: "Use the assistant to restate the plan for family members, volunteers, and caregivers in the most useful language." },
    { title: "Avoid jargon", body: "Clarity builds trust faster than technical language, especially during interruptions, flooding, or severe scarcity." }
  ]
};

function renderCards(group) {
  return resourceGroups[group].map((item) => `<article class="resource-card"><h3>${item.title}</h3><p>${item.body}</p></article>`).join("");
}

function renderPage(group = "households") {
  return `
    <div class="page-shell">
      <section class="resources-hero">
        <p class="hero-kicker">Resources</p>
        <h1>Guidance patterns, not just one-off answers</h1>
        <p>Aqua Guide works best when the household, volunteer, or presenter can repeat the same core message without losing the important details.</p>
      </section>
      <section class="resource-filter-section">
        <div class="filter-row">
          <button class="filter-pill ${group === "households" ? "is-active" : ""}" data-group="households" type="button">Households</button>
          <button class="filter-pill ${group === "field" ? "is-active" : ""}" data-group="field" type="button">Field teams</button>
          <button class="filter-pill ${group === "translations" ? "is-active" : ""}" data-group="translations" type="button">Translations</button>
        </div>
        <div id="resourceCardGrid" class="resource-grid">${renderCards(group)}</div>
      </section>
      <section class="method-section">
        <div class="section-head"><div><p class="section-label">How Aqua Guide works</p><h2>What powers the product</h2></div></div>
        <div class="method-grid">
          <article class="method-card"><h3>Tracked regions</h3><p>Each region combines a curated household guidance layer with live public signals such as country-level water access and sanitation indicators.</p></article>
          <article class="method-card"><h3>Assistant support</h3><p>The assistant can respond in multiple languages and uses the selected region as context when one is active.</p></article>
          <article class="method-card"><h3>Operational framing</h3><p>The interface is designed for people who need one clear next step quickly, not a wall of technical data.</p></article>
        </div>
      </section>
    </div>
  `;
}

function init() {
  renderShell({ basePath: "../", activeNav: "resources" });
  setDocumentTitle("Resources");
  const main = document.getElementById("main");
  let activeGroup = "households";

  function rerender() {
    main.innerHTML = renderPage(activeGroup);
    main.querySelectorAll("[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        activeGroup = button.getAttribute("data-group");
        rerender();
      });
    });
  }

  rerender();
}

init();
