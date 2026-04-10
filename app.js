import { locations } from "./data/locations.js";

const iconSvg = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  droplet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7"/><path d="M9 22V12h6v10"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  cup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>',
  pot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/><path d="M5 10v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 8v5l-4 2v-7z"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  baby: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M7 21v-3a5 5 0 0 1 10 0v3"/><path d="M9 4l1-2h4l1 2"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.29 7L12 12l8.71-5"/><path d="M12 22V12"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51L8.59 10.49"/></svg>'
};

const dom = {
  body: document.body,
  heroTitle: document.getElementById("heroTitle"),
  heroDescription: document.getElementById("heroDescription"),
  statusBadge: document.getElementById("statusBadge"),
  statusLocation: document.getElementById("statusLocation"),
  statusUtility: document.getElementById("statusUtility"),
  qualityIndex: document.getElementById("qualityIndex"),
  metricLead: document.getElementById("metricLead"),
  metricChlorine: document.getElementById("metricChlorine"),
  metricPh: document.getElementById("metricPh"),
  metricUpdated: document.getElementById("metricUpdated"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryText: document.getElementById("summaryText"),
  summaryHighlights: document.getElementById("summaryHighlights"),
  trustRow: document.getElementById("trustRow"),
  actionsTitle: document.getElementById("actionsTitle"),
  actionsSubtitle: document.getElementById("actionsSubtitle"),
  actionsGrid: document.getElementById("actionsGrid"),
  aiSuggestions: document.getElementById("aiSuggestions"),
  aiConversation: document.getElementById("aiConversation"),
  aiInput: document.getElementById("aiInput"),
  aiSendButton: document.getElementById("aiSendButton"),
  assistantLanguageButtons: document.getElementById("assistantLanguageButtons"),
  assistantContext: document.getElementById("assistantContext"),
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),
  demoLocations: document.getElementById("demoLocations"),
  demoLocationChips: document.getElementById("demoLocationChips"),
  savedLocationChips: document.getElementById("savedLocationChips"),
  useLocationButton: document.getElementById("useLocationButton"),
  saveLocationButton: document.getElementById("saveLocationButton"),
  copySummaryButton: document.getElementById("copySummaryButton"),
  quickReadToggle: document.getElementById("quickReadToggle"),
  pitchPoints: document.getElementById("pitchPoints"),
  toast: document.getElementById("toast"),
  actionModal: document.getElementById("actionModal"),
  closeModalButton: document.getElementById("closeModalButton"),
  modalEyebrow: document.getElementById("modalEyebrow"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalSteps: document.getElementById("modalSteps")
};

const favoriteStorageKey = "aqua-guide-favorites";
const quickReadStorageKey = "aqua-guide-quick-read";
const assistantLanguageStorageKey = "aqua-guide-assistant-language";

const languageCatalog = {
  en: {
    label: "English",
    inputPlaceholder: "Ask about safe water, treatment, storage, or translation...",
    contextPrefix: "Grounded in the ",
    readyMessage: "Ask Aqua is ready. It can explain this scenario in plain language or restate it for another audience.",
    note: "Live GPT mode activates automatically when OPENAI_API_KEY is configured.",
    thinking: "Thinking through the safest plain-language response for this household...",
    thinkingMeta: "Preparing multilingual guidance"
  },
  fr: {
    label: "French",
    inputPlaceholder: "Posez une question sur l'eau, la sécurité ou la traduction...",
    contextPrefix: "Basé sur le scénario ",
    readyMessage: "Aqua est prêt. Il peut expliquer la situation simplement ou la reformuler pour un autre public.",
    note: "Le mode GPT en direct s'active automatiquement quand OPENAI_API_KEY est configuré.",
    thinking: "Je prépare une réponse claire et sûre pour ce foyer...",
    thinkingMeta: "Préparation d'une réponse multilingue"
  },
  sw: {
    label: "Swahili",
    inputPlaceholder: "Uliza kuhusu maji salama, matibabu, hifadhi, au tafsiri...",
    contextPrefix: "Imejengwa juu ya ",
    readyMessage: "Aqua iko tayari. Inaweza kueleza hali hii kwa lugha rahisi au kuitafsiri kwa hadhira nyingine.",
    note: "Mwonekano wa GPT huwashwa moja kwa moja OPENAI_API_KEY ikisanidiwa.",
    thinking: "Ninaandaa jibu salama na rahisi kuelewa kwa kaya hii...",
    thinkingMeta: "Inaandaa mwongozo wa lugha nyingi"
  },
  ar: {
    label: "Arabic",
    inputPlaceholder: "اسأل عن سلامة المياه أو المعالجة أو التخزين أو الترجمة...",
    contextPrefix: "يعتمد على سيناريو ",
    readyMessage: "أكوا جاهز. يمكنه شرح الحالة بلغة بسيطة أو إعادة صياغتها لجمهور آخر.",
    note: "يعمل وضع GPT المباشر تلقائيا عند إعداد OPENAI_API_KEY.",
    thinking: "أقوم بإعداد استجابة واضحة وآمنة لهذه الأسرة...",
    thinkingMeta: "جارٍ إعداد إرشاد متعدد اللغات"
  },
  bn: {
    label: "Bengali",
    inputPlaceholder: "নিরাপদ পানি, চিকিৎসা, সংরক্ষণ, বা অনুবাদ সম্পর্কে জিজ্ঞেস করুন...",
    contextPrefix: "এই নির্দেশনা তৈরি করা হয়েছে ",
    readyMessage: "Aqua প্রস্তুত। এটি সহজ ভাষায় ব্যাখ্যা করতে পারে বা অন্য ভাষায় আবার বলতে পারে।",
    note: "OPENAI_API_KEY সেট করা হলে লাইভ GPT মোড স্বয়ংক্রিয়ভাবে চালু হবে।",
    thinking: "এই পরিবারের জন্য সবচেয়ে নিরাপদ সহজ উত্তর প্রস্তুত করা হচ্ছে...",
    thinkingMeta: "বহুভাষিক নির্দেশনা প্রস্তুত হচ্ছে"
  }
};

const state = {
  currentLocationId: "coxs-bazar-bangladesh",
  favorites: loadFavorites(),
  quickRead: loadQuickRead(),
  assistantLanguage: loadAssistantLanguage(),
  aiPending: false,
  conversation: []
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function stripTags(value) {
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function renderHeroTitle(markup) {
  const match = String(markup).match(/^(.*?)<br\s*\/?>\s*<span>(.*?)<\/span>$/i);
  if (!match) {
    dom.heroTitle.textContent = stripTags(markup);
    return;
  }

  const leading = escapeHtml(stripTags(match[1]));
  const trailing = escapeHtml(stripTags(match[2]));
  dom.heroTitle.innerHTML = `${leading}<br /><span>${trailing}</span>`;
}

function loadFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(favoriteStorageKey) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadQuickRead() {
  return localStorage.getItem(quickReadStorageKey) === "true";
}

function loadAssistantLanguage() {
  const stored = localStorage.getItem(assistantLanguageStorageKey);
  return stored && languageCatalog[stored] ? stored : "en";
}

function persistState() {
  localStorage.setItem(favoriteStorageKey, JSON.stringify(state.favorites));
  localStorage.setItem(quickReadStorageKey, String(state.quickRead));
  localStorage.setItem(assistantLanguageStorageKey, state.assistantLanguage);
}

function getLocationById(id) {
  return locations.find((location) => location.id === id) ?? locations[0];
}

function findLocation(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getLocationById(state.currentLocationId);
  return (
    locations.find(
      (location) =>
        location.name.toLowerCase() === normalized ||
        location.zip === normalized ||
        `${location.name} ${location.zip}`.toLowerCase() === normalized
    ) ||
    locations.find(
      (location) =>
        location.name.toLowerCase().includes(normalized) || location.zip.includes(normalized)
    )
  );
}

function showToast(message) {
  dom.toast.textContent = message;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    dom.toast.textContent = "";
  }, 2400);
}

function render() {
  const location = getLocationById(state.currentLocationId);
  renderLocationOptions();
  renderHero(location);
  renderSummary(location);
  renderSources(location);
  renderActions(location);
  renderAssistant(location);
  renderPitchPoints(location);
  renderFavorites();
  renderSaveButton();
  dom.body.classList.toggle("quick-read", state.quickRead);
  dom.quickReadToggle.setAttribute("aria-pressed", String(state.quickRead));
  renderAssistantLanguageButtons();
}

function renderLocationOptions() {
  dom.demoLocations.innerHTML = locations
    .map(
      (location) =>
        `<option value="${escapeAttribute(location.name)}"></option><option value="${escapeAttribute(location.zip)}"></option>`
    )
    .join("");

  dom.demoLocationChips.innerHTML = locations
    .map(
      (location) =>
        `<button class="chip-button-outline" data-location-chip="${escapeAttribute(location.id)}" type="button">${escapeHtml(location.name)}</button>`
    )
    .join("");
}

function renderHero(location) {
  dom.body.dataset.status = location.status;
  renderHeroTitle(location.heroTitle);
  dom.heroDescription.textContent = location.heroDescription;
  dom.statusBadge.querySelector("span").textContent = location.statusLabel;
  dom.statusLocation.textContent = location.name;
  dom.statusUtility.textContent = `${location.utility} · ${location.recordLabel}`;
  dom.qualityIndex.textContent = location.qualityIndex;
  dom.metricLead.textContent = location.metrics.lead;
  dom.metricChlorine.textContent = location.metrics.chlorine;
  dom.metricPh.textContent = location.metrics.ph;
  dom.metricUpdated.textContent = location.metrics.updated;
  dom.searchInput.value = location.name;
}

function renderSummary(location) {
  dom.summaryTitle.textContent = location.summaryTitle;
  dom.summaryText.textContent = state.quickRead ? location.quickSummary : location.summaryText;
  dom.summaryHighlights.innerHTML = location.highlights
    .map(
      (highlight) => `
        <div class="summary-highlight">
          <div class="highlight-icon ${highlight.tone}">
            ${iconSvg[highlight.icon]}
          </div>
          <div class="highlight-text">
            <strong>${escapeHtml(highlight.title)}</strong>
            ${escapeHtml(highlight.detail)}
          </div>
        </div>
      `
    )
    .join("");
}

function renderSources(location) {
  dom.trustRow.innerHTML = location.sources
    .map(
      (source) => `
        <div class="trust-chip">
          <div class="trust-chip-icon">
            ${iconSvg[source.icon]}
          </div>
          ${escapeHtml(source.label)}
        </div>
      `
    )
    .join("");
}

function renderActions(location) {
  dom.actionsTitle.textContent = location.actionsTitle;
  dom.actionsSubtitle.textContent = location.actionsSubtitle;
  dom.actionsGrid.innerHTML = location.actions
    .map(
      (action) => `
        <button class="action-card" type="button" data-action-id="${escapeAttribute(action.id)}">
          <div class="action-icon ${action.tone}">
            ${iconSvg[action.icon]}
          </div>
          <span class="action-arrow">${iconSvg.share}</span>
          <h3>${escapeHtml(action.title)}</h3>
          <p>${escapeHtml(action.description)}</p>
        </button>
      `
    )
    .join("");
}

function renderAssistant(location) {
  const language = languageCatalog[state.assistantLanguage] ?? languageCatalog.en;
  dom.assistantContext.textContent = `${language.contextPrefix}${location.recordLabel.toLowerCase()}`;
  dom.aiInput.placeholder = language.inputPlaceholder;
  dom.aiSendButton.disabled = state.aiPending;
  dom.aiSuggestions.innerHTML = location.aiSuggestions
    .map(
      (question) =>
        `<button class="ai-suggestion" type="button" data-suggestion="${escapeAttribute(question)}">${escapeHtml(question)}</button>`
    )
    .join("");

  if (!state.conversation.length) {
    dom.aiConversation.innerHTML = `
      <div class="message assistant">
        ${escapeHtml(language.readyMessage)}
        <small>${escapeHtml(language.note)}</small>
      </div>
    `;
    return;
  }

  dom.aiConversation.innerHTML = state.conversation
    .map(
      (message) => `
        <div class="message ${message.role}">
          ${escapeHtml(message.content)}
          ${message.meta ? `<small>${escapeHtml(message.meta)}</small>` : ""}
        </div>
      `
    )
    .join("");
}

function renderAssistantLanguageButtons() {
  const buttons = dom.assistantLanguageButtons.querySelectorAll("[data-language]");
  buttons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const isActive = button.dataset.language === state.assistantLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderPitchPoints(location) {
  dom.pitchPoints.innerHTML = location.pitchPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
}

function renderFavorites() {
  if (!state.favorites.length) {
    dom.savedLocationChips.innerHTML = `<span class="chip-button-outline">No saved locations yet</span>`;
    return;
  }

  dom.savedLocationChips.innerHTML = state.favorites
    .map((id) => {
      const location = getLocationById(id);
      return `
        <button class="chip-button" type="button" data-favorite-chip="${escapeAttribute(location.id)}">
          ${escapeHtml(location.name)}
          <span class="chip-remove" data-remove-favorite="${escapeAttribute(location.id)}">×</span>
        </button>
      `;
    })
    .join("");
}

function renderSaveButton() {
  dom.saveLocationButton.textContent = state.favorites.includes(state.currentLocationId)
    ? "Saved"
    : "Save location";
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
    showToast("Removed from saved locations");
  } else {
    state.favorites = [id, ...state.favorites].slice(0, 5);
    showToast("Saved location for quick access");
  }
  persistState();
  renderFavorites();
  renderSaveButton();
}

function buildAssistantAnswer(location, question) {
  const language = state.assistantLanguage;
  const normalized = question.toLowerCase();
  const statusMap = {
    en: { caution: "caution", advisory: "advisory", safe: "safe" },
    fr: { caution: "alerte moderee", advisory: "alerte elevee", safe: "stable" },
    sw: { caution: "tahadhari", advisory: "hatari kubwa", safe: "salama" },
    ar: { caution: "حالة تحذير", advisory: "حالة طوارئ", safe: "حالة مستقرة" },
    bn: { caution: "সতর্কতা", advisory: "উচ্চ ঝুঁকি", safe: "নিরাপদ" }
  };
  const localizedStatus = (statusMap[language] ?? statusMap.en)[location.status];

  if (language === "fr") {
    return `${location.name} est actuellement dans un état ${localizedStatus} dans cette démo. La priorité est d'utiliser de l'eau traitée ou embouteillée pour boire, cuisiner, les médicaments et les nourrissons. Gardez l'eau sûre séparée de l'eau non traitée et suivez les consignes locales de santé ou d'aide humanitaire pour les prochaines étapes.`;
  }

  if (language === "sw") {
    return `${location.name} kwa sasa iko katika hali ya ${localizedStatus} kwenye onyesho hili. Kipaumbele ni kutumia maji yaliyotibiwa au ya chupa kwa kunywa, kupika, dawa, na watoto wachanga. Tenganisha maji salama na maji ambayo hayajatibiwa, na fuata maelekezo ya afya ya eneo au ya wahudumu wa misaada kwa hatua zinazofuata.`;
  }

  if (language === "ar") {
    return `${location.name} حاليا في ${localizedStatus} ضمن هذا العرض التجريبي. الأولوية هي استخدام مياه معالجة أو معبأة للشرب والطهي والأدوية ورعاية الأطفال. احفظ الماء الآمن منفصلا عن الماء غير المعالج واتبع إرشادات الصحة المحلية أو الجهات الإنسانية للخطوات التالية.`;
  }

  if (language === "bn") {
    return `${location.name} বর্তমানে এই ডেমোতে ${localizedStatus} অবস্থায় রয়েছে। প্রথম অগ্রাধিকার হলো পান করা, রান্না, ওষুধ এবং শিশুর জন্য শুধু পরিশোধিত বা বোতলজাত পানি ব্যবহার করা। নিরাপদ পানি আলাদা রাখুন এবং পরবর্তী পদক্ষেপের জন্য স্থানীয় স্বাস্থ্য বা মানবিক সহায়তার নির্দেশনা অনুসরণ করুন।`;
  }

  const intro = `${location.name} is currently marked ${localizedStatus} in this demo scenario. `;

  if (normalized.includes("newborn") || normalized.includes("baby") || normalized.includes("formula")) {
    return location.status === "safe"
      ? `${intro}For a newborn, the prototype advice is that normal use is acceptable, but a certified filter or recently flushed cold water gives extra confidence in older buildings.`
      : `${intro}For newborns and formula, Aqua Guide recommends boiled or bottled water until the caution or advisory state clears.`;
  }

  if (normalized.includes("filter")) {
    return location.status === "safe"
      ? `${intro}A filter is optional here and mainly about taste or extra confidence.`
      : `${intro}A filter alone is not the core recommendation here. The safer guidance is boiled or bottled water until the warning clears.`;
  }

  if (normalized.includes("shower") || normalized.includes("bath")) {
    return location.status === "advisory"
      ? `${intro}The prototype guidance keeps showers as a caution topic: avoid swallowing water and follow the local notice, especially for vulnerable household members.`
      : `${intro}Showering is generally acceptable in this demo scenario, but the app still tells users to check the latest utility wording.`;
  }

  if (normalized.includes("pet")) {
    return location.status === "safe"
      ? `${intro}Pets can use the tap water in this scenario.`
      : `${intro}For pets, Aqua Guide suggests using the same safer water source you would reserve for drinking.`;
  }

  if (normalized.includes("pfas")) {
    return `${intro}PFAS is a family of persistent chemicals that users often hear about without context. Aqua Guide's pitch is that the assistant can translate those technical terms into direct household guidance.`;
  }

  if (normalized.includes("how long")) {
    return `${intro}The practical answer is to follow the timestamp and wait for the next clear utility update. Aqua Guide is designed to make that update easier to interpret.`;
  }

  return `${intro}Aqua Guide would answer this by combining the current status, the timestamp, and the household context into one plain-language recommendation. In this MVP, the safest next step is: ${location.actions[0].description}`;
}

async function askAssistant(question) {
  const trimmed = question.trim();
  if (!trimmed || state.aiPending) return;
  const location = getLocationById(state.currentLocationId);
  const language = languageCatalog[state.assistantLanguage] ?? languageCatalog.en;
  state.aiPending = true;
  state.conversation.push({ role: "user", content: trimmed });
  state.conversation.push({
    role: "assistant",
    content: language.thinking,
    meta: language.thinkingMeta
  });
  renderAssistant(location);
  dom.aiInput.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: trimmed,
        language: state.assistantLanguage,
        location,
        conversation: state.conversation.slice(-6)
      })
    });

    if (!response.ok) {
      throw new Error(`Assistant request failed with ${response.status}`);
    }

    const payload = await response.json();
    state.conversation[state.conversation.length - 1] = {
      role: "assistant",
      content: payload.text ?? buildAssistantAnswer(location, trimmed),
      meta: payload.meta ?? `GPT response · ${location.recordLabel}`
    };
  } catch {
    state.conversation[state.conversation.length - 1] = {
      role: "assistant",
      content: buildAssistantAnswer(location, trimmed),
      meta: `Local fallback · ${location.recordLabel}`
    };
  } finally {
    state.aiPending = false;
    renderAssistant(location);
  }
}

function openActionModal(action) {
  dom.modalEyebrow.textContent = "Household action";
  dom.modalTitle.textContent = action.title;
  dom.modalDescription.textContent = action.detail;
  dom.modalSteps.innerHTML = action.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  dom.actionModal.hidden = false;
}

function closeActionModal() {
  dom.actionModal.hidden = true;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getNearestLocation(latitude, longitude) {
  return locations.reduce((nearest, location) => {
    const nearestDistance = haversineDistance(
      latitude,
      longitude,
      nearest.coordinates.lat,
      nearest.coordinates.lng
    );
    const currentDistance = haversineDistance(
      latitude,
      longitude,
      location.coordinates.lat,
      location.coordinates.lng
    );
    return currentDistance < nearestDistance ? location : nearest;
  }, locations[0]);
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

dom.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const match = findLocation(dom.searchInput.value);
  if (match) {
    state.currentLocationId = match.id;
    state.conversation = [];
    render();
    showToast(`Showing ${match.name}`);
  } else {
    showToast("No exact match found in the demo dataset");
  }
});

dom.demoLocationChips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-location-chip]");
  if (!button) return;
  state.currentLocationId = button.dataset.locationChip;
  state.conversation = [];
  render();
  showToast(`Showing ${getLocationById(state.currentLocationId).name}`);
});

dom.savedLocationChips.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-favorite]");
  if (removeButton) {
    event.stopPropagation();
    state.favorites = state.favorites.filter((id) => id !== removeButton.dataset.removeFavorite);
    persistState();
    renderFavorites();
    renderSaveButton();
    showToast("Removed from saved locations");
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite-chip]");
  if (!favoriteButton) return;
  state.currentLocationId = favoriteButton.dataset.favoriteChip;
  state.conversation = [];
  render();
  showToast(`Loaded saved location: ${getLocationById(state.currentLocationId).name}`);
});

dom.useLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showToast("Geolocation is not available in this browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.currentLocationId = getNearestLocation(
        position.coords.latitude,
        position.coords.longitude
      ).id;
      state.conversation = [];
      render();
      showToast(`Using the nearest demo record for ${getLocationById(state.currentLocationId).name}`);
    },
    () => showToast("Could not read your current location")
  );
});

dom.saveLocationButton.addEventListener("click", () => {
  toggleFavorite(state.currentLocationId);
});

dom.copySummaryButton.addEventListener("click", async () => {
  const location = getLocationById(state.currentLocationId);
  const text = `${location.name} · ${location.statusLabel}. ${state.quickRead ? location.quickSummary : location.summaryText}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied the plain-language summary");
  } catch {
    showToast("Clipboard copy is not available here");
  }
});

dom.quickReadToggle.addEventListener("click", () => {
  state.quickRead = !state.quickRead;
  persistState();
  renderSummary(getLocationById(state.currentLocationId));
  dom.body.classList.toggle("quick-read", state.quickRead);
  dom.quickReadToggle.setAttribute("aria-pressed", String(state.quickRead));
  showToast(state.quickRead ? "Quick Read Mode enabled" : "Quick Read Mode disabled");
});

dom.actionsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action-id]");
  if (!button) return;
  const location = getLocationById(state.currentLocationId);
  const action = location.actions.find((item) => item.id === button.dataset.actionId);
  if (action) openActionModal(action);
});

dom.aiSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-suggestion]");
  if (!button) return;
  askAssistant(button.dataset.suggestion);
});

dom.assistantLanguageButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-language]");
  if (!(button instanceof HTMLButtonElement)) return;
  state.assistantLanguage = button.dataset.language;
  persistState();
  renderAssistantLanguageButtons();
  renderAssistant(getLocationById(state.currentLocationId));
  showToast(`Assistant language set to ${languageCatalog[state.assistantLanguage].label}`);
});

dom.aiSendButton.addEventListener("click", () => askAssistant(dom.aiInput.value));
dom.aiInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    askAssistant(dom.aiInput.value);
  }
});

dom.closeModalButton.addEventListener("click", closeActionModal);
dom.actionModal.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
    closeActionModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dom.actionModal.hidden) closeActionModal();
});

render();
