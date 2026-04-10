# Aqua Guide

Aqua Guide is a multi-page web application for water guidance in regions facing scarcity, flooding, service interruption, and fragile infrastructure. It combines a curated household guidance layer with live public signals, then turns that into plain-language actions that families, volunteers, and field teams can actually use.

## Product snapshot

- Four tracked region profiles:
  - `Cox's Bazar, Bangladesh`
  - `Turkana County, Kenya`
  - `Beira, Mozambique`
  - `Port-au-Prince, Haiti`
- Separate product pages for:
  - home
  - region guidance
  - multilingual AI assistant
  - resources
- Live country indicators from the World Bank
- Live weather context from Open-Meteo
- Geocoding and reverse geocoding via OpenStreetMap Nominatim
- Multilingual AI chat through a server-side OpenAI route with a safe fallback when no key is configured
- Local persistence for saved regions, quick-read mode, and last-viewed region

## Why this product works

- The problem is globally legible in seconds.
- The UI stays calm and premium even when the subject matter is serious.
- The assistant and shareable summary make the app feel operational rather than purely informational.
- The architecture is lightweight enough for a hackathon build, but structured like a real web product.

## Local development

```bash
npm install
npm start
```

Then open `http://127.0.0.1:4173`.

To enable live OpenAI responses, copy `.env.example` to `.env` and set:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1
```

`.env` is ignored by git.

## Validation

Run the automated browser flow:

```bash
npm run test:functional
```

Generate the current presentation screenshots:

```bash
npm run screenshots:presentation
```

If your Obsidian vault is not under `~/Documents/Github/my-notes`, set `OBSIDIAN_VAULT` before running the screenshot command.

## Stack

- Static HTML, CSS, and browser JavaScript for the frontend
- A lightweight Node server for hosting, API proxying, caching, and security headers
- Playwright for functional validation and screenshot capture

## Project structure

- `index.html`: homepage shell
- `region/index.html`: region detail page
- `assistant/index.html`: assistant page
- `resources/index.html`: resource page
- `client/`: page controllers and shared browser utilities
- `data/regions.js`: tracked region dataset
- `server.mjs`: static hosting plus API endpoints
- `scripts/test-functional.mjs`: end-to-end validation
- `scripts/capture-presentation.mjs`: screenshot capture
- `.env.example`: local environment template
- `render.yaml`: Render deployment config

## External data

- World Bank indicators:
  - basic drinking water access
  - basic sanitation access
  - population
- Open-Meteo current conditions
- OpenStreetMap Nominatim geocoding

The tracked regions still use curated household guidance copy on top of those public signals, because a practical water-guidance product needs both live context and human-readable operational advice.
