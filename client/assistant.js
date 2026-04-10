import { getRegionDetails, sendAssistantMessage } from "./api.js";
import {
  bindLanguageButtons,
  escapeHtml,
  getAssistantLanguage,
  getLastRegionId,
  iconSvg,
  languageCatalog,
  renderLanguageButtons,
  renderShell,
  renderStatusBadge,
  setAssistantLanguage,
  setDocumentTitle,
  setLastRegionId
} from "./common.js";

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderMessage(message) {
  const meta = message.role === "assistant" ? `<div class="message-meta">${escapeHtml(message.meta || "Aqua Guide")}</div>` : "";
  return `
    <div class="message ${message.role}">
      <div class="message-bubble">${escapeHtml(message.content)}</div>
      ${meta}
    </div>
  `;
}

function buildAssistantLayout(region, language) {
  const label = languageCatalog[language]?.label ?? languageCatalog.en.label;
  return `
    <div class="page-shell">
      <section class="assistant-page">
        <div class="assistant-main">
          <div class="section-head compact">
            <div>
              <p class="section-label">Ask Aqua</p>
              <h1>AI water assistant</h1>
            </div>
            <p class="section-meta">Responses are grounded in the selected region and returned in the language you choose.</p>
          </div>
          <div class="language-row" id="assistantLanguageRow">${renderLanguageButtons(language)}</div>
          <p class="assistant-context">
            ${region ? `Currently viewing guidance for ${escapeHtml(region.name)}.` : "No region selected. Ask a general water guidance question."}
          </p>
          <div class="helper-row">
            ${(region?.aiSuggestions ?? ["What should a family do first?", "How should safe water be stored?", "Can you explain this in French?", "How do I protect water during flooding?"])
              .map((question) => `<button class="helper-chip" type="button" data-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`)
              .join("")}
          </div>
          <div class="assistant-chat-card">
            <div id="conversation" class="conversation"></div>
            <div class="input-bar-sticky">
              <div class="assistant-input-row">
                <input id="assistantInput" class="assistant-input" type="text" placeholder="${escapeHtml(languageCatalog[language]?.placeholder ?? languageCatalog.en.placeholder)}" />
                <button id="assistantSendButton" class="primary-button icon-button" type="button" aria-label="Send question">${iconSvg.spark}</button>
              </div>
              <p class="assistant-footnote">Current reply language: ${escapeHtml(label)}</p>
            </div>
          </div>
        </div>
        <aside class="assistant-side">
          ${
            region
              ? `
                <div class="side-status-card">
                  <p class="eyebrow">Current region</p>
                  <h2>${escapeHtml(region.flag)} ${escapeHtml(region.name)}</h2>
                  ${renderStatusBadge(region)}
                  <div class="side-status-grid">
                    <div><span>Quality index</span><strong>${escapeHtml(region.qualityIndex)}</strong></div>
                    <div><span>Updated</span><strong>${escapeHtml(region.metrics.updated)}</strong></div>
                  </div>
                </div>
              `
              : ""
          }
          <div class="side-card">
            <p class="eyebrow">Quick Read</p>
            <h3>Readable enough to share under pressure</h3>
            <p>Quick Read mode carries across pages so the summary and assistant stay presentation-friendly and easier to understand.</p>
          </div>
        </aside>
      </section>
    </div>
  `;
}

async function init() {
  renderShell({ basePath: "../", activeNav: "assistant" });
  setDocumentTitle("Assistant");

  const languageState = { value: getAssistantLanguage() };
  let region = null;
  const regionId = getParam("region") || getLastRegionId();

  if (regionId) {
    try {
      const payload = await getRegionDetails(regionId);
      region = payload.region;
      setLastRegionId(region.id);
    } catch {
      region = null;
    }
  }

  const main = document.getElementById("main");
  main.innerHTML = buildAssistantLayout(region, languageState.value);

  const conversationNode = document.getElementById("conversation");
  const input = document.getElementById("assistantInput");
  const conversation = [
    {
      role: "assistant",
      content: region
        ? `I’m ready to explain the ${region.name} guidance in plain language, help with storage and treatment, or translate the plan for another audience.`
        : "I’m ready to explain safe water basics, treatment steps, storage rules, or translate the guidance into another language.",
      meta: "Aqua Guide"
    }
  ];

  function renderConversation() {
    conversationNode.innerHTML = conversation.map(renderMessage).join("");
    conversationNode.scrollTop = conversationNode.scrollHeight;
  }

  function syncLanguage(nextLanguage) {
    languageState.value = nextLanguage;
    setAssistantLanguage(nextLanguage);
    document.getElementById("assistantLanguageRow").innerHTML = renderLanguageButtons(nextLanguage);
    input.placeholder = languageCatalog[nextLanguage]?.placeholder ?? languageCatalog.en.placeholder;
    bindLanguageButtons(syncLanguage);
  }

  async function ask(question) {
    const safeQuestion = question.trim();
    if (!safeQuestion) return;
    conversation.push({ role: "user", content: safeQuestion });
    conversation.push({ role: "assistant", content: "Working through the safest possible answer for this region...", meta: "Aqua Guide" });
    renderConversation();
    input.value = "";

    try {
      const response = await sendAssistantMessage({
        question: safeQuestion,
        language: languageState.value,
        regionId: region?.id || "",
        conversation
      });
      conversation.pop();
      conversation.push({ role: "assistant", content: response.text, meta: response.meta || "Aqua Guide" });
      renderConversation();
    } catch (error) {
      conversation.pop();
      conversation.push({
        role: "assistant",
        content: "I could not reach the live assistant right now, but you can still use the region guidance and household actions on the region page.",
        meta: error instanceof Error ? error.message : "Aqua Guide"
      });
      renderConversation();
    }
  }

  renderConversation();
  bindLanguageButtons(syncLanguage);
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => ask(button.getAttribute("data-question") || ""));
  });
  document.getElementById("assistantSendButton")?.addEventListener("click", () => ask(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") ask(input.value);
  });

  const prefillQuestion = getParam("question");
  if (prefillQuestion) ask(prefillQuestion);
}

init();
