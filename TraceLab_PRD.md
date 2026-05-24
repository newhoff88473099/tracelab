# TraceLab AI — Product Requirements Document (PRD)
**Version:** 1.0  
**Date:** 2026-05-23  
**Status:** Ready for Engineering

---

## 1. Overview

**TraceLab AI** is an intelligent platform for quality control laboratories, focused on traceability, automation, artificial intelligence, and full integration with external systems. It replaces any prior references to "QualiLab AI."

The platform targets laboratories that need:
- End-to-end sample traceability
- Mobile-first data capture (QR/barcode, photos, OCR)
- AI-driven product identification and defect detection
- Seamless CRM, WhatsApp, and Email notifications
- Secure multi-user access with role-based controls

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Complete sample registration | 100% of samples have a full audit trail |
| Reduce manual data entry | OCR + AI auto-fill > 80% of fields |
| Faster lab turnaround | Workflow completion time reduced by 40% |
| Integration coverage | WhatsApp + Email + CRM live on launch |
| Security compliance | LGPD-compliant, zero critical vulnerabilities at launch |

---

## 3. Scope

### In Scope (MVP)
- User authentication and RBAC
- Client, product, and sample registration (CRUD)
- QR Code and Barcode scanner (mobile)
- Photo capture and cloud storage
- Laboratory workflow engine (status transitions)
- Analysis history and audit logs
- OCR for label reading
- AI visual product identification
- WhatsApp and Email notifications
- Admin dashboard (web)
- Reports export (PDF/Excel)

### Out of Scope (Future Phases)
- Offline sync
- BI/analytics dashboard
- Predictive AI
- Blockchain traceability
- Biometric signatures
- IoT sensor integration
- ERP integration (SAP / TOTVS)

---

## 4. System Architecture

### 4.1 Technology Stack

**Mobile App**
- Framework: Flutter (Android, iOS, Web PWA)
- State Management: Riverpod or Bloc
- Local storage: Hive (for offline caching)

**Admin Dashboard**
- Framework: React.js (TypeScript)
- UI Library: shadcn/ui + Tailwind CSS
- State: Zustand or React Query

**Backend API**
- Runtime: Node.js + NestJS (REST + WebSocket)
- AI Microservice: Python FastAPI
- Auth: JWT + OAuth2 (Passport.js)

**Database**
- Primary: PostgreSQL 15+
- Cache: Redis 7+
- File Storage: AWS S3 (or compatible: Cloudflare R2)

**Infrastructure**
- Containerization: Docker + Docker Compose (dev), Kubernetes (prod)
- CI/CD: GitHub Actions
- Reverse proxy: NGINX
- CDN / WAF: Cloudflare
- Monitoring: Grafana + Prometheus
- Cloud: AWS / Azure / GCP (provider-agnostic)

### 4.2 High-Level Architecture Diagram (Text)

```
[Flutter App] ──────────────────────────────┐
[React Admin] ──── HTTPS ──── [NGINX] ──── [NestJS API] ──── [PostgreSQL]
                                               │                [Redis]
                                        [FastAPI AI] ──── [ML Models]
                                               │
                              [AWS S3] ─── [Storage Service]
                                               │
                          [Twilio/Meta] ── [Notification Service]
                          [SendGrid/SES]
                          [HubSpot/Salesforce/RD/Pipedrive]
```

---

## 5. Database Schema

### Core Tables

**users**
```sql
id UUID PRIMARY KEY
name VARCHAR(255) NOT NULL
email VARCHAR(255) UNIQUE NOT NULL
password_hash VARCHAR(255)
role ENUM('admin','lab_manager','analyst','viewer')
laboratory_id UUID FK
is_active BOOLEAN DEFAULT true
created_at TIMESTAMP
updated_at TIMESTAMP
```

**laboratories**
```sql
id UUID PRIMARY KEY
name VARCHAR(255) NOT NULL
cnpj VARCHAR(18)
address JSONB
contact JSONB
settings JSONB
created_at TIMESTAMP
```

**clients**
```sql
id UUID PRIMARY KEY
laboratory_id UUID FK
name VARCHAR(255) NOT NULL
document VARCHAR(30)
contact JSONB
metadata JSONB
created_at TIMESTAMP
```

**products**
```sql
id UUID PRIMARY KEY
laboratory_id UUID FK
name VARCHAR(255) NOT NULL
sku VARCHAR(100)
barcode VARCHAR(100)
qrcode VARCHAR(255)
category VARCHAR(100)
ai_tags JSONB
images JSONB
created_at TIMESTAMP
```

**samples**
```sql
id UUID PRIMARY KEY
laboratory_id UUID FK
client_id UUID FK
product_id UUID FK
code VARCHAR(100) UNIQUE NOT NULL
status ENUM('received','in_analysis','pending_review','approved','rejected','archived')
received_at TIMESTAMP
collected_by UUID FK (users)
metadata JSONB
created_at TIMESTAMP
updated_at TIMESTAMP
```

**analyses**
```sql
id UUID PRIMARY KEY
sample_id UUID FK
analyst_id UUID FK
type VARCHAR(100)
result JSONB
status ENUM('draft','completed','validated')
started_at TIMESTAMP
completed_at TIMESTAMP
notes TEXT
```

**images**
```sql
id UUID PRIMARY KEY
entity_type VARCHAR(50)  -- 'sample','product','analysis'
entity_id UUID
url VARCHAR(500)
storage_key VARCHAR(500)
ocr_data JSONB
ai_labels JSONB
uploaded_by UUID FK
created_at TIMESTAMP
```

**reports**
```sql
id UUID PRIMARY KEY
laboratory_id UUID FK
sample_id UUID FK
generated_by UUID FK
format ENUM('pdf','xlsx')
file_url VARCHAR(500)
created_at TIMESTAMP
```

**notifications**
```sql
id UUID PRIMARY KEY
laboratory_id UUID FK
recipient_id UUID FK
channel ENUM('whatsapp','email','push')
template VARCHAR(100)
payload JSONB
status ENUM('queued','sent','failed')
sent_at TIMESTAMP
created_at TIMESTAMP
```

**audit_logs**
```sql
id UUID PRIMARY KEY
user_id UUID FK
action VARCHAR(100)
entity_type VARCHAR(50)
entity_id UUID
changes JSONB
ip_address INET
created_at TIMESTAMP
```

---

## 6. API Endpoints

### Authentication
```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
```

### Users
```
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

### Laboratories
```
GET    /laboratories
POST   /laboratories
GET    /laboratories/:id
PATCH  /laboratories/:id
```

### Clients
```
GET    /clients
POST   /clients
GET    /clients/:id
PATCH  /clients/:id
DELETE /clients/:id
```

### Products
```
GET    /products
POST   /products
GET    /products/:id
PATCH  /products/:id
DELETE /products/:id
POST   /products/scan (barcode/QR lookup)
```

### Samples
```
GET    /samples
POST   /samples
GET    /samples/:id
PATCH  /samples/:id
POST   /samples/:id/status (workflow transition)
GET    /samples/:id/history
POST   /samples/scan (QR/barcode lookup)
```

### Analyses
```
GET    /analyses
POST   /analyses
GET    /analyses/:id
PATCH  /analyses/:id
POST   /analyses/:id/validate
```

### Images
```
POST   /images/upload
GET    /images/:id
DELETE /images/:id
POST   /images/:id/ocr (trigger OCR)
POST   /images/:id/ai-identify (trigger AI identification)
```

### Reports
```
POST   /reports/generate
GET    /reports
GET    /reports/:id/download
```

### Notifications
```
POST   /notifications/send
GET    /notifications
GET    /notifications/:id
```

### AI (FastAPI microservice)
```
POST   /ai/identify    (image → product labels + confidence)
POST   /ai/ocr         (image → extracted text)
POST   /ai/detect-fault (image → defect detection)
POST   /ai/suggest-classification (data → suggested category)
```

---

## 7. Feature Specifications

### 7.1 QR Code & Barcode Scanner
- Native camera integration via Flutter (`mobile_scanner` package)
- On scan: lookup product or sample by code
- If not found: prompt to register new entry
- Support formats: QR Code, Code 128, EAN-13, EAN-8, UPC-A, DataMatrix

### 7.2 Photo Capture & Storage
- Capture from camera or gallery (Flutter `image_picker`)
- Compress before upload (max 2MB per image)
- Store original in AWS S3 with UUID key
- Generate thumbnail (300x300) on upload
- Attach to sample, product, or analysis entity

### 7.3 OCR
- Trigger via image upload or manual button
- FastAPI endpoint calls Google Vision API or Tesseract (configurable)
- Return extracted text as JSON
- Auto-populate sample form fields where possible
- Store raw OCR output in `images.ocr_data`

### 7.4 AI Visual Identification
- Input: image file
- Output: product category, labels, confidence score, bounding boxes
- Model: fine-tuned CLIP or custom CNN (retrained on lab dataset)
- Threshold: only auto-suggest if confidence > 85%
- Fallback: manual selection if below threshold
- Continuous learning: analyst confirmations feed back into training pipeline

### 7.5 Workflow Engine
Sample status transitions:

```
received → in_analysis → pending_review → approved
                                        → rejected
approved/rejected → archived
```

- Each transition requires an authorized role
- Transition logged in `audit_logs`
- Notifications sent on key transitions (configurable per lab)

### 7.6 Notifications
**WhatsApp:** Twilio Programmable Messaging or Meta WhatsApp Business API  
**Email:** SendGrid (primary), Amazon SES (fallback)  
**Events that trigger notifications:**
- Sample received confirmation
- Analysis completed
- Report ready for download
- Sample approved / rejected

### 7.7 CRM Integration
Supported CRMs (webhook + OAuth):
- HubSpot
- Salesforce
- RD Station
- Pipedrive

Events pushed to CRM:
- New client registered
- Sample status change
- Report generated

### 7.8 Admin Dashboard (React)
- Full CRUD for all entities
- Sample pipeline Kanban board
- User management + role assignment
- Notification template editor
- Audit log viewer
- Report generation + download
- CRM integration settings

---

## 8. Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Authentication | JWT (access 15min + refresh 7d) + OAuth2 |
| Authorization | RBAC with 4 roles: admin, lab_manager, analyst, viewer |
| Encryption in transit | TLS 1.3 on all endpoints |
| Encryption at rest | AES-256 on S3, encrypted DB volumes |
| Audit trail | All write operations logged in `audit_logs` |
| LGPD compliance | Data export, deletion, and consent endpoints |
| Rate limiting | 100 req/min per IP on public endpoints |
| Secrets management | AWS Secrets Manager / HashiCorp Vault |

---

## 9. Implementation Plan

### Phase 1 — Discovery & Architecture (2 weeks)
**Deliverables:**
- [ ] Finalized database ERD
- [ ] API contract (OpenAPI 3.0 spec)
- [ ] UI wireframes (mobile + web)
- [ ] Infrastructure diagram
- [ ] Dev environment setup (Docker Compose)
- [ ] GitHub repo structure with monorepo layout

### Phase 2 — Backend Core (4 weeks)
**Deliverables:**
- [ ] NestJS project scaffold with modules: auth, users, labs, clients, products, samples
- [ ] PostgreSQL migrations (all tables)
- [ ] JWT + RBAC middleware
- [ ] REST API for all core entities (CRUD)
- [ ] File upload service (S3)
- [ ] Redis caching layer
- [ ] Unit tests (>70% coverage)
- [ ] Swagger/OpenAPI docs auto-generated

### Phase 3 — Mobile App (5 weeks)
**Deliverables:**
- [ ] Flutter project scaffold
- [ ] Auth screens (login, forgot password)
- [ ] Sample registration flow
- [ ] QR/barcode scanner integration
- [ ] Photo capture + upload
- [ ] Sample status view + transitions
- [ ] Push notifications (Firebase FCM)
- [ ] Offline queue for poor connectivity

### Phase 4 — AI & Integrations (4 weeks)
**Deliverables:**
- [ ] FastAPI AI microservice scaffold
- [ ] OCR endpoint (Google Vision or Tesseract)
- [ ] AI visual identification endpoint
- [ ] Defect detection prototype
- [ ] WhatsApp notification service (Twilio)
- [ ] Email notification service (SendGrid)
- [ ] CRM webhook integration (HubSpot first)
- [ ] AI results stored and linked to images

### Phase 5 — Admin Dashboard (3 weeks)
**Deliverables:**
- [ ] React + TypeScript project scaffold
- [ ] Auth (login, session management)
- [ ] Full CRUD pages for all entities
- [ ] Sample Kanban pipeline view
- [ ] Reports page with PDF/Excel export
- [ ] Audit log viewer
- [ ] Notification template management
- [ ] Integration settings page

### Phase 6 — Deploy & Security (2 weeks)
**Deliverables:**
- [ ] Dockerfiles for all services
- [ ] Kubernetes manifests (or Docker Compose for smaller deployments)
- [ ] GitHub Actions CI/CD pipeline
- [ ] NGINX reverse proxy config
- [ ] Cloudflare setup (DNS, WAF, CDN)
- [ ] Grafana + Prometheus dashboards
- [ ] Automated DB backups
- [ ] Penetration test (basic)
- [ ] LGPD compliance review

**Total estimated duration: 20 weeks**

---

## 10. Monorepo Structure (Recommended)

```
tracelab/
├── apps/
│   ├── api/                  # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── laboratories/
│   │   │   ├── clients/
│   │   │   ├── products/
│   │   │   ├── samples/
│   │   │   ├── analyses/
│   │   │   ├── images/
│   │   │   ├── reports/
│   │   │   ├── notifications/
│   │   │   └── integrations/
│   │   ├── prisma/           # DB schema & migrations
│   │   └── test/
│   ├── ai/                   # Python FastAPI microservice
│   │   ├── app/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   └── services/
│   │   └── requirements.txt
│   ├── mobile/               # Flutter app
│   │   ├── lib/
│   │   │   ├── features/
│   │   │   ├── core/
│   │   │   └── shared/
│   │   └── pubspec.yaml
│   └── dashboard/            # React admin
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── services/
│       └── package.json
├── packages/
│   ├── shared-types/         # TypeScript types shared between api + dashboard
│   └── ui-components/        # Shared React components
├── infra/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
├── .github/
│   └── workflows/
│       ├── api.yml
│       ├── mobile.yml
│       └── dashboard.yml
└── docker-compose.yml
```

---

## 11. Claude Code — Skills & Commands

Use these prompts and skills to bootstrap TraceLab with Claude Code:

### Bootstrap Commands

```bash
# 1. Initialize monorepo
claude "Create a monorepo for TraceLab using the structure defined in the PRD. 
Use npm workspaces. Initialize git."

# 2. Backend scaffold
claude "Scaffold a NestJS application in apps/api with modules for: auth, users, 
laboratories, clients, products, samples, analyses, images, reports, notifications. 
Use Prisma ORM with PostgreSQL. Include JWT auth with RBAC guards."

# 3. Database schema
claude "Generate Prisma schema file for TraceLab based on the database tables in the PRD. 
Include all enums, relations, and indexes. Generate initial migration."

# 4. API endpoints
claude "Implement all CRUD REST endpoints for the samples module in NestJS. 
Include DTOs with class-validator, Swagger decorators, and role-based guards 
(admin, lab_manager, analyst, viewer)."

# 5. AI microservice
claude "Create a Python FastAPI microservice in apps/ai with four endpoints: 
/ai/identify, /ai/ocr, /ai/detect-fault, /ai/suggest-classification. 
Use Google Vision API for OCR. Add Docker support."

# 6. Flutter app
claude "Scaffold a Flutter app in apps/mobile for TraceLab. Create feature folders 
for: auth, samples, scanner, camera, and dashboard. Use Riverpod for state management 
and Dio for HTTP. Configure flavors for dev/staging/prod."

# 7. Admin dashboard
claude "Create a React TypeScript app in apps/dashboard using Vite, shadcn/ui, 
Tailwind CSS, and React Query. Set up routing with React Router v6 for pages: 
login, samples (Kanban), products, clients, users, reports, settings."

# 8. Docker setup
claude "Create Dockerfiles for apps/api, apps/ai, and apps/dashboard. 
Write a docker-compose.yml at root that starts all services with PostgreSQL 
and Redis. Include environment variable templates."

# 9. CI/CD
claude "Create GitHub Actions workflows for TraceLab: one for the NestJS API 
(lint, test, build, push Docker image), one for the Flutter app (test, build APK), 
and one for the React dashboard (lint, test, build)."
```

### Key Claude Code Skills to Apply

| Area | Skill / Instruction |
|------|---------------------|
| NestJS modules | Generate with full CRUD, DTOs, guards, Swagger |
| Prisma ORM | Schema design, migrations, seeding |
| Flutter state | Riverpod providers + AsyncNotifier pattern |
| React dashboard | shadcn/ui + React Query + React Router |
| FastAPI AI | Async endpoints, pydantic models, background tasks |
| Docker | Multi-stage builds, health checks, env vars |
| Testing | Jest (API), Widget tests (Flutter), Vitest (Dashboard) |
| Auth | NestJS Passport JWT strategy + refresh token rotation |
| File upload | NestJS + Multer + AWS S3 SDK |
| Notifications | NestJS Bull queue + Twilio/SendGrid workers |

---

## 12. Environment Variables

### API (.env)
```env
# App
NODE_ENV=development
PORT=3000
APP_NAME=TraceLab

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/tracelab
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=<secret>
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=<secret>
JWT_REFRESH_EXPIRES_IN=7d

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_S3_BUCKET=tracelab-files

# Notifications
TWILIO_ACCOUNT_SID=<sid>
TWILIO_AUTH_TOKEN=<token>
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
SENDGRID_API_KEY=<key>
EMAIL_FROM=noreply@tracelab.app

# CRM
HUBSPOT_ACCESS_TOKEN=<token>

# AI service
AI_SERVICE_URL=http://ai:8000
```

### AI (.env)
```env
GOOGLE_APPLICATION_CREDENTIALS=/secrets/gcp-key.json
MODEL_PATH=/models/tracelab_classifier.pt
CONFIDENCE_THRESHOLD=0.85
```

---

## 13. Estimated Monthly Infrastructure Costs

| Service | Estimated Cost (USD) |
|---------|----------------------|
| Cloud compute (2 instances) | $150 – $300 |
| Managed PostgreSQL (RDS/CloudSQL) | $50 – $150 |
| Redis (ElastiCache) | $30 – $80 |
| S3 Storage (100GB) | $25 – $50 |
| AI/GPU instance (on-demand) | $200 – $1,000 |
| External APIs (Twilio, SendGrid) | $50 – $150 |
| CDN + WAF (Cloudflare) | $20 – $50 |
| **Total** | **$525 – $1,780** |

---

## 14. Recommended Team

| Role | Responsibility |
|------|---------------|
| Tech Lead | Architecture decisions, code review, integrations |
| Backend Developer | NestJS API, database, queues |
| Flutter Developer | Mobile app (iOS + Android) |
| AI Engineer | FastAPI microservice, model training, OCR |
| UI/UX Designer | Wireframes, design system, prototypes |
| DevOps Engineer | Docker, K8s, CI/CD, monitoring |
| QA Tester | Test plans, automated tests, UAT |

---

## 15. Definition of Done

A feature is considered done when:
- [ ] Code is reviewed and merged to `main`
- [ ] Unit tests pass (coverage > 70%)
- [ ] API endpoint documented in Swagger
- [ ] Tested on staging environment
- [ ] No critical security vulnerabilities (OWASP Top 10 checked)
- [ ] LGPD-relevant data handling reviewed
- [ ] QA sign-off received

---

*TraceLab AI — PRD v1.0 — Ready for Claude Code implementation*
