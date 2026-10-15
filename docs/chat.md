# Portfolio assistant

The assistant and visible portfolio sections share public facts in `lib/portfolio-data.ts`. Update this file when changing experience, projects, courses, skills, volunteering, interests, or certifications. NeuroVault remains internship work under Gogentic AI.

## Configuration

The chat uses the existing server-only keys. It tries Gemini, then OpenAI, then a deterministic portfolio answer. No key is required for the local answer path.

- `GOOGLEGEMINI_API_KEY` (existing name) or `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- Optional `GEMINI_MODEL` (default `gemini-2.5-flash`)
- Optional `OPENAI_MODEL` (default `gpt-4.1-mini`)

Keys are sent in request headers, never returned to the browser or logged. Provider request formats follow the [Gemini text-generation reference](https://ai.google.dev/gemini-api/docs/text-generation) and [OpenAI Chat Completions reference](https://developers.openai.com/api/reference/resources/chat).

Each provider gets a seven-second budget, including response parsing; the browser stops waiting after 23 seconds. Empty, malformed, truncated responses and percentages absent from the portfolio are rejected. Prompt grounding and this percentage check reduce errors but do not prove every model-generated statement is accurate.

## Conversation and limits

The browser retains conversation messages in session storage for this tab. Clear conversation cancels any pending response and resets the history. Reload restores the messages; closing the panel does not erase them. No conversation database or server logging is added.

The API accepts a question of at most 1,200 characters, at most 12 user/assistant history turns, and at most 24,000 history characters. It rejects system-role history. Request bodies are bounded to 100,000 bytes. Provider prompts treat history as context, never as verified facts.

A best-effort per-server limiter permits 20 requests per minute and two concurrent requests per forwarded IP. Forwarded-IP trust depends on the hosting proxy; use a distributed limiter and trusted proxy configuration if scaling to multiple server instances. It is not a durable global quota. Routes returning 429 include `Retry-After`.

## Verification

Run `npm run test:chat` for the isolated test suite. It covers data accuracy, employment-versus-personal projects, follow-ups, keyword boundaries, unknown facts, request validation, failover, malformed and truncated providers, unsupported metrics, aborts, timeouts, and route throttling.

Provider tests use mock transports and fake keys, never charge an external API, and do not confirm live model access. Browser verification covers live replies, follow-ups, restoring and clearing a session, mobile sizing, and keyboard closing. Do not test the separate contact form by sending real messages.
