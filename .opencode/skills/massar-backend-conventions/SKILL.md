---
name: massar-backend-conventions
description: Use when building or modifying backend/API code for Massar Agency client projects — API design, authentication, database, and security conventions. Stack-agnostic; applies regardless of whether the client project uses Node/Express, Django, or another backend framework.
---

# Massar Agency — Backend Conventions

## Stack
- **Varies by client** — this skill is intentionally stack-agnostic. Confirm the specific framework/language/database for the current project (common ones across Massar Agency work: Node.js/Express, Django, NestJS/FastAPI) and apply framework-specific idioms on top of these conventions.

## API design conventions
- RESTful resource naming (`/users`, `/orders/:id`) unless the project specifically calls for GraphQL.
- Consistent response shape across endpoints — pick one (e.g. `{ data, error, meta }`) and stick to it for the whole project.
- Version APIs from the start if there's any chance of a public/client-facing API (`/api/v1/...`).
- Validate all incoming request bodies/params before touching the database — use the framework's standard validation layer (e.g. class-validator for NestJS, DRF serializers for Django, Zod/Joi for Express).

## Authentication & security
- Never store plaintext passwords — use the framework's standard hashing (bcrypt/argon2).
- Use environment variables for all secrets (DB credentials, API keys, JWT secrets) — never commit them.
- Rate-limit public-facing endpoints, especially auth endpoints (login/signup), to reduce brute-force risk.
- Sanitize/parameterize all database queries — no raw string concatenation into SQL.
- CORS: scope allowed origins explicitly per environment (dev vs prod) rather than wildcarding in production.

## Database conventions
- Migrations are required for any schema change — no manual production schema edits.
- Use consistent naming: snake_case for columns/tables (or match the framework's convention), and add indexes for any column used in frequent WHERE/JOIN clauses.
- Soft-deletes (`deleted_at` timestamp) preferred over hard deletes for anything user-facing where recovery might matter (e.g. client data, orders).

## Local payment & Algeria-specific considerations
- When integrating payments for Algerian clients, default to considering Satim and BaridiMob as the local payment rails alongside any international option, since these are the common expectations for the Algerian market.

## Testing & CI
- Any new endpoint should have at least a basic test (happy path + one failure case) before being considered done.
- Keep CI (GitHub Actions or equivalent) running lint + tests on every PR — match the pattern already established for PhoneMAG's CI/branch protection setup.

## What NOT to do
- Don't introduce a new backend framework/ORM mid-project without discussing it — consistency matters more than marginal technical improvement for a delivered client project.
- Don't skip input validation "just for now" — this is the most common source of security bugs that surface later.
