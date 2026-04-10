import { getRegions } from "./api.js";
import {
  bindFavoriteButtons,
  bindSearchForm,
  renderAssistantTeaser,
  renderFavoriteStrip,
  renderHomeHero,
  renderHomeSearch,
  renderHowItWorks,
  renderRegionCard,
  renderShell,
  setDocumentTitle
} from "./common.js";

async function init() {
  renderShell({ basePath: "./", activeNav: "home" });
  setDocumentTitle("");

  const main = document.getElementById("main");
  main.innerHTML = `
    <section class="loading-state">
      <p class="section-label">Loading</p>
      <h1>Preparing the latest region guidance.</h1>
    </section>
  `;

  try {
    const payload = await getRegions();
    const regionCards = payload.regions.map((region) => renderRegionCard(region, "./")).join("");

    main.innerHTML = `
      ${renderHomeHero(payload.critical, "./")}
      <div class="page-shell">
        ${renderHomeSearch("./")}
        ${renderFavoriteStrip("./")}
        <section class="region-grid-section">
          <div class="section-head">
            <div>
              <p class="section-label">Tracked regions</p>
              <h2>Guidance built around regions facing real water stress</h2>
            </div>
            <p class="section-meta">Each region profile combines live country indicators with plain-language household guidance.</p>
          </div>
          <div class="region-grid">${regionCards}</div>
        </section>
        ${renderHowItWorks()}
        ${renderAssistantTeaser("./")}
      </div>
    `;

    bindSearchForm({
      formSelector: "#regionSearchForm",
      inputSelector: "#regionSearchInput",
      targetBasePath: "./"
    });
    bindFavoriteButtons(main);
  } catch (error) {
    main.innerHTML = `
      <section class="empty-state">
        <p class="section-label">Unavailable</p>
        <h1>Aqua Guide could not load the latest region data.</h1>
        <p>${error instanceof Error ? error.message : "Unknown error"}</p>
      </section>
    `;
  }
}

init();
