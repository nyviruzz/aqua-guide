import { getMostCriticalRegion, sortRegionsByPriority, regions } from "../data/regions.js";
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

function init() {
  renderShell({ basePath: "./", activeNav: "home" });
  setDocumentTitle("");

  const main = document.getElementById("main");
  const critical = getMostCriticalRegion();
  const regionCards = sortRegionsByPriority(regions).map((region) => renderRegionCard(region, "./")).join("");

  main.innerHTML = `
    ${renderHomeHero(critical, "./")}
    <div class="page-shell">
      ${renderHomeSearch("./")}
      ${renderFavoriteStrip("./")}
      <section class="region-grid-section">
        <div class="section-head">
          <div>
            <p class="section-label">Featured profiles</p>
            <h2>Curated launch profiles plus global search coverage</h2>
          </div>
          <p class="section-meta">Featured profiles are presentation-ready, while search can open guidance for cities and communities worldwide using public APIs.</p>
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
}

init();
