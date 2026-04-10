# Aqua Guide

Aqua Guide is a presentation-first web app for Code-A-Site 2026. It turns technical water-quality records into plain-language household guidance that judges can understand immediately.

## Why this concept fits the hackathon

- The problem is broad and instantly recognizable: people want to know whether their water is safe and what to do next.
- The demo is easy to follow in under two minutes.
- The build balances design quality with believable functionality, which matches the event's focus on `Technical Complexity` and `Design`.
- The AI assistant is framed honestly as a layer that can be powered by `AWS Bedrock or similar`, which supports the sponsor story without pretending a production model pipeline already exists.

## Functional MVP

- Search a demo city, county, or ZIP code and update the full experience in place.
- Switch between safe, caution, and advisory scenarios.
- Save locations locally for repeat checks during the presentation.
- Enable `Quick Read` mode for simpler, larger-copy guidance.
- Ask Aqua a question and get a contextual plain-language answer.
- Open household action cards for concrete next steps.
- Use browser geolocation to jump to the nearest demo scenario.
- Copy the current plain-language summary for sharing.

## Demo Scenario Set

- `Stony Brook, NY` for a reassuring everyday-safe story.
- `Suffolk County, NY` for the main caution-state presentation flow.
- `Brooklyn, NY` for the renter and old-plumbing context story.
- `Miami Beach, FL` for the higher-stakes advisory story.

All records in this MVP are clearly marked as demo data for the hackathon prototype.

## Stack

- static HTML, CSS, and client-side JavaScript
- lightweight Node static server for local development and Render hosting
- Playwright for automated functional validation and presentation screenshots

## Run locally

```bash
npm install
npm start
```

Then open `http://127.0.0.1:4173`.

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
- `scripts/test-functional.mjs`: interaction test coverage
- `scripts/capture-presentation.mjs`: screenshots for the 2-minute demo script
- `render.yaml`: Render deployment config
- `external-mockups/`: design exploration history
