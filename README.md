# Aqua Guide

Aqua Guide is a presentation-first web app for Code-A-Site 2026. It reframes water safety as a global access, treatment, and communication problem, then turns complex WASH-style updates into plain-language household guidance that judges can understand immediately.

## Why this concept fits the hackathon

- The problem is broad and globally relevant: many communities still need clearer guidance around safe drinking water, treatment, storage, and crisis communication.
- The demo is easy to follow in under two minutes.
- The build balances design quality with believable functionality, which matches the event's focus on `Technical Complexity` and `Design`.
- The multilingual AI assistant creates a strong angle for both the AI judge and the web-dev judge without turning the project into a backend-heavy build.

## Functional MVP

- Search a demo region and update the full experience in place.
- Switch between caution and advisory scenarios inspired by documented global water-stress conditions.
- Save locations locally for repeat checks during the presentation.
- Enable `Quick Read` mode for simpler, larger-copy guidance.
- Ask Aqua a question and get a contextual plain-language answer.
- Change the assistant response language across `English`, `French`, `Swahili`, `Arabic`, and `Bengali`.
- Use a server-side OpenAI integration when `OPENAI_API_KEY` is configured, with a local guarded fallback when it is not.
- Open household action cards for concrete next steps.
- Use browser geolocation to jump to the nearest demo scenario.
- Copy the current plain-language summary for sharing.

## Demo Scenario Set

- `Cox's Bazar, Bangladesh`
- `Turkana County, Kenya`
- `Beira, Mozambique`
- `Port-au-Prince, Haiti`

All records in this MVP are clearly marked as demo scenarios for the hackathon prototype, inspired by documented WASH and water-safety challenges rather than live official alerts.

## Stack

- static HTML, CSS, and client-side JavaScript
- lightweight Node server for local development, Render hosting, and the OpenAI chat endpoint
- Playwright for automated functional validation and presentation screenshots

## Run locally

```bash
npm install
npm start
```

Then open `http://127.0.0.1:4173`.

To enable live GPT responses, copy `.env.example` to `.env` and set:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1
```

## Validate locally

Run the automated interaction checks:

```bash
npm run test:functional
```

Generate the presentation screenshots used in Obsidian:

```bash
npm run screenshots:presentation
```

The screenshot capture scripts default to `~/Documents/Github/my-notes` on the current machine. Set `OBSIDIAN_VAULT` if your vault lives somewhere else.

## Deployment

`render.yaml` is included for Render. Render itself requires a remote Git repository URL, so the current local folder cannot be deployed until the repo is pushed to GitHub, GitLab, or Bitbucket and linked from there.

## Repo layout

- `index.html`, `styles.css`, `app.js`: the live app
- `data/locations.js`: demo scenario dataset
- `.env.example`: environment template for OpenAI
- `scripts/test-functional.mjs`: interaction test coverage
- `scripts/capture-presentation.mjs`: screenshots for the 2-minute demo script
- `render.yaml`: Render deployment config
- `external-mockups/`: design exploration history
