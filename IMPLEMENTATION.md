# Aqua Guide Implementation

This repo now contains the functional MVP for the chosen `second-round-claude-hybrid-03` direction.

## What is implemented

- A live, presentation-first web app with the selected hybrid visual language
- Search-driven scenario switching across four demo locations
- Three risk states: `Safe`, `Caution`, and `Advisory`
- `Quick Read` mode for simpler guidance
- Saved locations using browser local storage
- Contextual AI-style Q&A for demo conversations
- Action cards with expandable next-step details
- Geolocation shortcut to the nearest demo scenario
- Copyable summary for easy sharing during the demo

## What is intentionally lightweight

- No production backend
- No real-time water authority integration
- No required user accounts
- No mandatory database for the MVP

This is deliberate. The build is optimized for a strong hackathon demo rather than operational infrastructure.

## Sponsor positioning

- `AWS`: the assistant layer is framed as something that can be powered by `AWS Bedrock or similar`, while the polished web experience can credibly sit on AWS hosting and mapping services in a future iteration.
- `MongoDB`: not required for the chosen track, but the product can naturally grow into saved household histories, alert preferences, and location records if that angle comes up in discussion.

## Demo architecture

- Static frontend: `index.html`, `styles.css`, `app.js`
- Scenario data: `data/locations.js`
- Local development and hosting: `server.mjs`
- Validation: `scripts/test-functional.mjs`
- Presentation screenshots: `scripts/capture-presentation.mjs`
- Render service config: `render.yaml`

## Validation status

- `npm run test:functional` passes
- `npm run screenshots:presentation` passes

## Deployment note

Render deployment is prepared but not completed from this machine because Render requires a remote Git repository URL. The current local repo has no working authenticated remote configured, so the next step is to push this project to GitHub, GitLab, or Bitbucket and then create the Render service from that URL.
