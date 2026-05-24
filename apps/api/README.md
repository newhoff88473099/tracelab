# TraceLab API — NestJS Backend

> **Phase 2** deliverable. This stub is the placeholder for the NestJS backend API.

## Planned Modules

| Module | Responsibility |
|---|---|
| `auth` | JWT + OAuth2, Passport strategies, refresh tokens |
| `users` | User CRUD, role assignment |
| `laboratories` | Lab CRUD, settings |
| `clients` | Client CRUD |
| `products` | Product CRUD, barcode/QR lookup |
| `samples` | Sample CRUD, workflow engine, history |
| `analyses` | Analysis entry, validation |
| `images` | Upload (R2), OCR trigger, AI trigger |
| `reports` | PDF/Excel generation |
| `notifications` | WhatsApp + Email (Bull queues) |
| `integrations` | HubSpot CRM webhooks |

## Tech Stack

- **Runtime:** Node.js 20 + NestJS 10
- **ORM:** Prisma 5 (PostgreSQL 15)
- **Auth:** Passport.js (JWT strategy + refresh token rotation)
- **Cache:** Redis 7 (ioredis)
- **Queue:** BullMQ (Redis-backed)
- **Storage:** Cloudflare R2 (via AWS SDK v3 + S3-compatible API)
- **Docs:** Swagger / OpenAPI (auto-generated, matches `docs/api/openapi.yaml`)
- **Tests:** Jest + Supertest (>70% coverage target)

## Getting Started (Phase 2)

```bash
cd apps/api
npm install
npm run db:migrate
npm run dev
```
