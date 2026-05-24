# AGENTS.md

## Development Commands

```bash
npm run dev         # Start all apps via Turbo
npm run build       # Build all packages
npm run lint        # Lint everything
npm run docker:up   # Start PostgreSQL, Redis
```

## Monorepo Structure

- `apps/api/` — NestJS backend (Phase 2: Backend Core)
- `apps/dashboard/` — React admin (scaffold only)
- `packages/shared-types/` — Shared TypeScript types

## Backend (apps/api)

```bash
npm run dev         # npm run dev --filter=api
npm run db:migrate  # prisma migrate dev
npm run db:generate # npx prisma generate
```

**Phase 1 → 2 Transition:** Run `npx prisma generate` after migrations to create client types.

**Required env vars:** `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CLOUDFLARE_R2_*`

## Testing

No tests exist yet. Use `npm run dev` then manual testing at http://localhost:3000/api-docs

## Module Coverage by Phase

**Phase 2 complete:** UsersModule, LaboratoriesModule, ClientsModule, ProductsModule, SamplesModule, AnalysesModule - full CRUD with RBAC guards