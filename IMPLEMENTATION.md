# Aqua Guide Implementation

This repo now contains the functional MVP for the chosen `second-round-claude-hybrid-03` direction, reframed around global water-access and water-safety communication.

## What is implemented

- A live, presentation-first web app with the selected hybrid visual language
- Search-driven scenario switching across four global demo regions
- Two high-stakes risk states: `Caution` and `Advisory`
- `Quick Read` mode for simpler guidance
- Saved locations using browser local storage
- Contextual AI-style Q&A for demo conversations
- Multilingual response selection for `English`, `French`, `Swahili`, `Arabic`, and `Bengali`
- Server-side OpenAI chat route that becomes live when `OPENAI_API_KEY` is configured
- Action cards with expandable next-step details
- Geolocation shortcut to the nearest demo scenario
- Copyable summary for easy sharing during the demo

## What is intentionally lightweight

- No production database
- No live official alert ingestion
- No required user accounts

This is deliberate. The build is optimized for a strong hackathon demo rather than operational infrastructure.

## Sponsor positioning

- `AWS`: the assistant layer can still be pitched as something that could be powered by `AWS Bedrock or similar` in a fuller sponsor-aligned version.
- `MongoDB`: not required for the chosen track, but the product can naturally grow into saved household histories, alert preferences, and location records if that angle comes up in discussion.

## Demo architecture

- Static frontend: `index.html`, `styles.css`, `app.js`
- Scenario data: `data/locations.js`
- Local development, hosting, and AI proxy: `server.mjs`
- Validation: `scripts/test-functional.mjs`
- Presentation screenshots: `scripts/capture-presentation.mjs`
- Render service config: `render.yaml`
- OpenAI environment template: `.env.example`

## Validation status

- `npm run test:functional` passes
- `npm run screenshots:presentation` passes

## Deployment note

Render deployment is prepared from the public GitHub repo. The remaining deployment blocker from this machine is the local Render/Claude execution path, not the app structure itself.
