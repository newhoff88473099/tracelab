# TraceLab AI — UI Wireframes

> **Format:** Figma mid-fidelity wireframes  
> **Tool:** [Figma](https://figma.com)  
> **Status:** To be created during Week 1 of Phase 1

---

## Figma Project Link

> **📌 Update this link once the Figma file is created:**
> 
> `https://www.figma.com/file/<FILE_ID>/TraceLab-AI-Wireframes`

---

## Screen Inventory

### Mobile Screens (Flutter — 11 screens)

| # | Screen | Description | Key Components |
|---|---|---|---|
| M01 | **Splash / Onboarding** | App launch + brand intro | Logo, tagline, CTA button |
| M02 | **Login** | Email + password login | Email field, password field, forgot password link, login button |
| M03 | **Forgot Password** | Request reset email | Email field, submit button, back link |
| M04 | **Home Dashboard** | Overview with quick actions | Sample counters by status, recent samples list, FAB (new sample), bottom nav |
| M05 | **Sample List** | Filterable/searchable list | Search bar, status filter chips, sample cards, pull-to-refresh |
| M06 | **Sample Detail + Timeline** | Full sample view with status history | Sample header, status badge, timeline, analyses list, actions (transition, photo) |
| M07 | **Scanner** | QR code and barcode scanner | Camera view, scanner overlay, flashlight toggle, manual entry fallback |
| M08 | **Photo Capture + Review** | Capture and review photos | Camera preview, capture button, gallery access, image preview, upload/retake |
| M09 | **New Sample Registration** | Sample form | Client selector, product selector (with scan option), code field, metadata fields |
| M10 | **Analysis Entry** | Fill analysis form | Analysis type, result fields (dynamic per type), notes, complete button |
| M11 | **Notifications List** | In-app notification center | Notification cards with channel icon, read/unread state, timestamp |

### Web Admin Screens (React — 11 screens)

| # | Screen | Description | Key Components |
|---|---|---|---|
| W01 | **Login** | Admin portal login | Email + password, TraceLab logo, login button |
| W02 | **Main Dashboard** | KPI overview | Metric cards (total samples, by status, today's count), recent activity feed, quick actions |
| W03 | **Sample Kanban Board** | Pipeline view | Kanban columns per status, draggable sample cards, filter bar (client, date, analyst) |
| W04 | **Sample Detail** | Full sample page | Header (code, status, client), tabs (analyses, images, history, reports), action buttons |
| W05 | **Products CRUD** | Product catalog | Data table with search/filter, create/edit modal, barcode/QR display |
| W06 | **Clients CRUD** | Client management | Data table, create/edit drawer, contact info panel |
| W07 | **Users + Role Management** | User administration | Users table, role badge, activate/deactivate toggle, invite modal |
| W08 | **Reports** | Report generation + download | Filters (date range, format), generate button, report history table, download links |
| W09 | **Audit Log Viewer** | Immutable event log | Timeline view, filters (user, entity type, date), changes diff view |
| W10 | **Notification Template Editor** | Manage message templates | Template list, editor (with placeholders), WhatsApp/Email preview panels |
| W11 | **Integration Settings** | CRM and external service config | HubSpot OAuth connect flow, webhook URL display, event mapping table |

---

## Design System Tokens (to be defined in Figma)

### Colors
| Token | Usage |
|---|---|
| `--color-brand-primary` | Primary actions, CTAs |
| `--color-brand-secondary` | Accents, highlights |
| `--color-status-received` | Sample status badge — received |
| `--color-status-in-analysis` | Sample status badge — in analysis |
| `--color-status-pending` | Sample status badge — pending review |
| `--color-status-approved` | Sample status badge — approved |
| `--color-status-rejected` | Sample status badge — rejected |
| `--color-status-archived` | Sample status badge — archived |

### Typography
- **Body:** Inter (16px / 400)
- **Headings:** Inter (24–40px / 600–700)
- **Monospace:** JetBrains Mono (code, sample codes, barcodes)

### Spacing
- Base unit: 4px (0.25rem)
- Component padding: 16px (1rem) mobile, 24px (1.5rem) web

---

## Figma Setup Instructions

1. Create a new Figma file named **"TraceLab AI — Wireframes v1"**
2. Create two pages: **"Mobile (Flutter)"** and **"Web (React Admin)"**
3. Set up a component library with the design tokens above
4. Build screens M01–M11 on the Mobile page
5. Build screens W01–W11 on the Web page
6. Export screens as PNG for embedding in sprint reviews
7. Paste the Figma share link in this file (top of document)
