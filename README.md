# TraceLab AI

> Intelligent platform for quality control laboratories — traceability, automation, AI, and full CRM/notification integration.

[![PRD](https://img.shields.io/badge/PRD-v1.0-blue)](./TraceLab_PRD.md)
[![Phase](https://img.shields.io/badge/Phase-1%20Discovery%20%26%20Architecture-orange)](./docs/)

---

## Overview

TraceLab AI replaces manual lab workflows with:

- 🔍 **End-to-end sample traceability** (QR/barcode scanning)
- 📸 **Mobile-first capture** (photos, OCR, AI visual identification)
- 🤖 **AI-driven product identification & defect detection**
- 🔔 **WhatsApp + Email + CRM notifications**
- 🔐 **RBAC with 4 roles:** admin, lab_manager, analyst, viewer

---

## Architecture (Quick View)

| Layer | Technology |
|---|---|
| Mobile | Flutter + Riverpod |
| Admin Web | React + TypeScript + shadcn/ui + Zustand + React Query |
| Backend API | Node.js + NestJS (REST + WebSocket) |
| AI Service | Python + FastAPI |
| Database | PostgreSQL 15 + Redis 7 |
| File Storage | Cloudflare R2 |
| OCR | Google Vision API |
| Notifications | Twilio (WhatsApp) + SendGrid (Email) |
| CRM | HubSpot (first integration) |
| Infrastructure | Docker Compose |
| CI/CD | GitHub Actions |
| Proxy | NGINX |
| CDN/WAF | Cloudflare |

---

## Monorepo Structure

```
tracelab/
├── apps/
│   ├── api/          # NestJS backend
│   ├── ai/           # Python FastAPI AI microservice
│   ├── mobile/       # Flutter app (iOS + Android)
│   └── dashboard/    # React admin dashboard
├── packages/
│   ├── shared-types/ # TypeScript types shared between api + dashboard
│   └── ui-components/# Shared React component library
├── infra/
│   ├── docker/       # Per-service Dockerfiles
│   ├── nginx/        # NGINX configs
│   └── terraform/    # Infrastructure as code (future)
├── docs/
│   ├── api/          # OpenAPI 3.0 spec
│   ├── erd/          # Database ERD (DBML + Mermaid)
│   ├── design/       # Wireframes reference
│   └── infra/        # Infrastructure diagrams
├── .github/
│   └── workflows/    # GitHub Actions CI/CD
├── docker-compose.yml
├── turbo.json
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (for mobile development)
- [Python 3.11+](https://www.python.org/) (for AI service)

### 1. Clone and install

```bash
git clone https://github.com/your-org/tracelab.git
cd tracelab
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start all services

```bash
npm run docker:up   # starts PostgreSQL, Redis, NGINX
npm run dev         # starts all app dev servers via Turborepo
```

### 4. Services available at:

| Service | URL |
|---|---|
| Admin Dashboard | http://localhost:3001 |
| NestJS API | http://localhost:3000 |
| FastAPI AI | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:3000/api-docs |
| AI Docs | http://localhost:8000/docs |

---

## Documentation

- 📄 [Product Requirements Document](./TraceLab_PRD.md)
- 🗺️ [Database ERD](./docs/erd/tracelab-erd.md)
- 🔌 [API Contract (OpenAPI 3.0)](./docs/api/openapi.yaml)
- 🏗️ [Infrastructure Diagram](./docs/infra/infrastructure-diagram.md)
- 🎨 [UI Wireframes](./docs/design/wireframes-link.md)

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready, protected |
| `staging` | Pre-release integration |
| `develop` | Active development base |
| `feature/*` | Feature branches off develop |
| `fix/*` | Bug fix branches |
| `chore/*` | Infra / docs / tooling |

**Commit convention:** `feat(samples): add status transition endpoint`

---

## Implementation Phases

| Phase | Duration | Status |
|---|---|---|
| **1 — Discovery & Architecture** | 2 weeks | 🟡 In Progress |
| 2 — Backend Core | 4 weeks | ⬜ Pending |
| 3 — Mobile App | 5 weeks | ⬜ Pending |
| 4 — AI & Integrations | 4 weeks | ⬜ Pending |
| 5 — Admin Dashboard | 3 weeks | ⬜ Pending |
| 6 — Deploy & Security | 2 weeks | ⬜ Pending |

---

*TraceLab AI — PRD v1.0 | Built with Claude Code + Antigravity*
