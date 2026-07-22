# RapidRelief — AI Triage for Disaster-Site Reports

People at or near a disaster site describe what's happening in their own words, under stress, with no structure. RapidRelief runs that raw text through an AI model to extract a clean, structured triage record — category, urgency level, exact need, and estimated people affected — and adds it to a sorted board so responders can scan by severity instead of reading paragraphs.

## The problem

During floods, fires, or building collapses, reports come in fast and messy — voice notes, WhatsApp texts, panicked calls — mixed with irrelevant detail and no consistent structure. Responders lose time re-reading and manually triaging each one. Existing crowd-reporting tools mostly just collect and timestamp reports; they don't do the triage work itself.

## Our approach

1. Anyone near the incident types a plain description (no form fields, no structure required) plus an optional location.
2. An LLM (OpenAI or Anthropic) classifies it: category, urgency (critical/high/medium/low), a one-line headline of the core need, and an estimate of people affected.
3. The report is added to a live board, auto-sorted so the most urgent items are always on top, filterable by urgency.
4. The board itself is stored in `localStorage`, so once reports are in, it's viewable without a live connection — useful in exactly the low-connectivity conditions disaster zones often have.

## Tech stack

- Single-page vanilla HTML/CSS/JS — no backend, no build step
- Calls OpenAI (`gpt-4o-mini`) or Anthropic (`claude-3-5-haiku`) directly from the browser with a user-supplied API key
- `localStorage` for the persistent, offline-viewable triage board

## AI usage

The triage itself — urgency classification, category extraction, need summarization — is done entirely by the model from raw unstructured text. This is the product's whole value; without the AI call, this is just a form.

## Run locally

Open `index.html` in a browser. No install needed.

## Deploy (pick one, ~2 minutes)

**Vercel:**
```
npm i -g vercel
vercel --prod
```

**GitHub Pages:** push this repo, then Settings → Pages → Deploy from branch → `main` / root.

**Hugging Face Spaces:** create a Space → type "Static" → upload `index.html`.

## Test credentials

No login required. Users supply their own OpenAI or Anthropic API key at runtime — nothing is stored server-side, and no server exists. For judge testing, provide a temporary key with a small quota.

## Notes for future improvement

- Add photo upload with vision-model analysis for severity confirmation
- Add a map view plotting reports by location
- Add a "resolved" state so responders can mark reports as handled
