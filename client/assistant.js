import { getRegionDetails, resolveRegionQuery, sendAssistantMessage } from "./api.js";
import {
  bindLanguageButtons,
  escapeHtml,
  getActiveLocationContext,
  getAssistantLanguage,
  getLastLocationReference,
  iconSvg,
  languageCatalog,
  renderLanguageButtons,
  renderShell,
  renderStatusBadge,
  setAssistantLanguage,
  setDocumentTitle,
  setLastLocationReference
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

async function getRegionContextFromParams() {
  const explicitQuery = getParam("q");
  if (explicitQuery) {
    try {
      const payload = await resolveRegionQuery(explicitQuery);
      setLastLocationReference(payload.reference || { type: "query", value: explicitQuery });
      return payload?.region || null;
    } catch {
      // Fall through to other context sources.
    }
  }

  const explicitRegionId = getParam("region");
  if (explicitRegionId) {
    try {
      const payload = await getRegionDetails(explicitRegionId);
      setLastLocationReference(payload.reference || { type: "id", value: explicitRegionId });
      if (payload?.region) {
        return {
          ...payload.region,
          tracked: true
        };
      }
    } catch {
      // Fall through to other context sources.
    }
  }

  const activeContext = getActiveLocationContext();
  if (activeContext?.name) {
    return activeContext;
  }

  const lastReference = getLastLocationReference();
  if (lastReference.type === "id") {
    try {
      const payload = await getRegionDetails(lastReference.value);
      if (payload?.region) {
        return {
          ...payload.region,
          tracked: true
        };
      }
    } catch {
      return null;
    }
  }

  if (lastReference.type === "query") {
    try {
      const payload = await resolveRegionQuery(lastReference.value);
      return payload?.region || null;
    } catch {
      return null;
    }
  }

  return null;
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
            <p class="section-meta">Responses are grounded in the selected place and returned in the language you choose.</p>
          </div>
          <div class="language-row" id="assistantLanguageRow">${renderLanguageButtons(language)}</div>
          <p class="assistant-context" id="assistantContext">
            ${region ? `Currently viewing guidance for ${escapeHtml(region.name)}.` : "No place selected. Ask a general safe-water question."}
          </p>
          <div class="helper-row" id="assistantSuggestionRow">
            ${(region?.aiSuggestions ?? ["What should a family do first?", "How should safe water be stored?", "Explain this in Spanish.", "How do I protect water during flooding?"])
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
              <p id="assistantLanguageFootnote" class="assistant-footnote">Replying in ${escapeHtml(label)}</p>
            </div>
          </div>
        </div>
        <aside class="assistant-side">
          ${
            region
              ? `
                <div class="side-status-card">
                  <p class="eyebrow">Current place</p>
                  <h2>${escapeHtml(region.flag || "🌍")} ${escapeHtml(region.name)}</h2>
                  ${region.status ? renderStatusBadge(region) : ""}
                  <div class="side-status-grid">
                    <div><span>Quality index</span><strong>${escapeHtml(region.qualityIndex || "Live")}</strong></div>
                    <div><span>Updated</span><strong>${escapeHtml(region?.metrics?.updated || "Current context")}</strong></div>
                  </div>
                </div>
              `
              : ""
          }
          <div class="side-card">
            <p class="eyebrow">Guardrails</p>
            <h3>Readable enough to share under pressure</h3>
            <p>The assistant stays plain-language by design so households, volunteers, and judges can understand the answer in seconds.</p>
          </div>
        </aside>
      </section>
    </div>
  `;
}

function toAssistantContext(region) {
  if (!region?.name) return null;
  return {
    name: region.name,
    statusLabel: region.statusLabel || "Live guidance",
    utility: region.utility || "General water guidance",
    summaryText: region.summaryText || region.heroDescription || "",
    quickSummary: region.quickSummary || region.oneLiner || "",
    actions: Array.isArray(region.actions)
      ? region.actions.map((action) => ({
          title: action.title,
          description: action.description || ""
        }))
      : []
  };
}

async function init() {
  renderShell({ basePath: "../", activeNav: "assistant" });
  setDocumentTitle("Assistant");

  const requestedLanguage = getParam("lang");
  if (requestedLanguage && languageCatalog[requestedLanguage]) {
    setAssistantLanguage(requestedLanguage);
  }

  const region = await getRegionContextFromParams();
  const languageState = { value: getAssistantLanguage() };
  const requestState = { sending: false };
  const main = document.getElementById("main");
  main.innerHTML = buildAssistantLayout(region, languageState.value);

  const conversationNode = document.getElementById("conversation");
  const input = document.getElementById("assistantInput");
  const sendButton = document.getElementById("assistantSendButton");
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

  function setSending(nextSending) {
    requestState.sending = nextSending;
    input.disabled = nextSending;
    sendButton.disabled = nextSending;
    document.querySelectorAll("[data-question], [data-language]").forEach((button) => {
      button.disabled = nextSending;
    });
  }

  function syncLanguage(nextLanguage) {
    if (!languageCatalog[nextLanguage]) return;
    languageState.value = nextLanguage;
    setAssistantLanguage(nextLanguage);
    document.getElementById("assistantLanguageRow").innerHTML = renderLanguageButtons(nextLanguage);
    document.getElementById("assistantLanguageFootnote").textContent = `Replying in ${
      languageCatalog[nextLanguage]?.label ?? languageCatalog.en.label
    }`;
    input.placeholder = languageCatalog[nextLanguage]?.placeholder ?? languageCatalog.en.placeholder;
    bindLanguageButtons(syncLanguage);
    document.querySelectorAll("[data-question]").forEach((button) => {
      button.disabled = requestState.sending;
    });
  }

  async function ask(question) {
    const safeQuestion = String(question ?? "").trim();
    if (!safeQuestion || requestState.sending) return;
    conversation.push({ role: "user", content: safeQuestion });
    conversation.push({ role: "assistant", content: "Working through the safest possible answer for this location...", meta: "Aqua Guide" });
    renderConversation();
    input.value = "";
    setSending(true);

    try {
      const response = await sendAssistantMessage({
        question: safeQuestion,
        language: languageState.value,
        regionId: region?.tracked ? region.id : "",
        locationContext: toAssistantContext(region),
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
    } finally {
      setSending(false);
      input.focus();
    }
  }

  renderConversation();
  bindLanguageButtons(syncLanguage);
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.getAttribute("data-question") || "";
      input.value = question;
      ask(question);
    });
  });
  sendButton?.addEventListener("click", () => ask(input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") ask(input.value);
  });

  const prefillQuestion = getParam("question");
  if (prefillQuestion) {
    input.value = prefillQuestion;
    ask(prefillQuestion);
  }
}

init();
