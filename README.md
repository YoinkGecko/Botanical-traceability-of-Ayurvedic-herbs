# Botanical Traceability of Ayurvedic Herbs

Traceability platform for Ayurvedic herb supply chains, from farmer collection to manufacturer output, with admin verification and blockchain-style immutable record storage.

## Overview

This repository contains:

- A Node.js + Express + MySQL backend API (`server.js`) for stakeholder registration, submissions, approvals, dashboards, and map data.
- A blockchain service (`bcserver.js`) that stores approved batches as chained, hashed blocks with backup and tamper recovery.
- Two React + Vite dashboards:
  - `admin_site/` for district/admin operations and approvals.
  - `ayush_admin_portal/` for central monitoring and blockchain visibility.
- A standalone QR viewer page (`qrcode.html`) to fetch and display block details by batch IDs.

## Architecture

- `server.js` runs on `http://localhost:5001`
- `bcserver.js` runs on `http://localhost:3000`
- `server.js` sends approved stakeholder rows to blockchain via `POST /add` on the blockchain service.
- Frontend apps call backend APIs directly on `localhost`.

## Tech Stack

- Backend: Node.js, Express, MySQL (`mysql2`), CORS
- Frontend: React 18, Vite, Tailwind CSS, Redux Toolkit, Recharts, Framer Motion
- Storage:
  - Relational data in MySQL (`sih27` database)
  - Chain data in `chain/chain.json` + `chain/backup/*.json`

## Repository Structure

```text
.
├── server.js                  # Main backend API (port 5001)
├── bcserver.js                # Blockchain service (port 3000)
├── sih27db.sql                # Database schema
├── qrcode.html                # Public QR/block lookup page
├── chain/
│   ├── chain.json
│   └── backup/
├── admin_site/                # District/admin frontend
└── ayush_admin_portal/        # Central AYUSH admin frontend
```

## Prerequisites

- Node.js 18+ (Node 18+ recommended because backend uses global `fetch`)
- npm 9+
- MySQL 8+

## Setup

### 1. Database setup

Create DB and tables:

```bash
mysql -u root -p < sih27db.sql
```

This creates:

- `sih27` database
- Stakeholder/admin tables
- Data collection tables
- Linking table (`manufacturer_labtester_link`)

### 2. Configure backend DB connection

Update credentials in `server.js` if needed:

- `host`
- `user`
- `password`
- `database`

Current defaults in code:

- Host: `localhost`
- User: `root`
- Password: `root`
- Database: `sih27`

### 3. Configure blockchain file paths

`bcserver.js` currently uses absolute paths for:

- `chainFile`
- `backupDir`

Update these to match your local project path before running.

## Install Dependencies

### Root (backend services)

```bash
npm install
```

### Admin frontend

```bash
cd admin_site
npm install
```

### AYUSH portal frontend

```bash
cd ayush_admin_portal
npm install
```

## Run Locally

Use separate terminals.

### 1. Start blockchain server (port 3000)

```bash
node bcserver.js
```

### 2. Start backend API (port 5001)

```bash
npm start
```

### 3. Start district/admin frontend

```bash
cd admin_site
npm start
```

### 4. Start AYUSH portal frontend

```bash
cd ayush_admin_portal
npm start
```

## Key API Areas

`server.js`:

- Admin management and login: `/api/admins/*`
- Registration:
  - `/api/farmers`
  - `/api/processors`
  - `/api/labtesters`
  - `/api/manufacturers`
- Dashboard data:
  - `/api/dashboard/kpis`
  - `/api/dashboard/funneldata`
  - `/api/admin/dashboard/recentsubmissions`
  - `/api/admin/dashboard/submission/:submissionId`
- Verification workflow:
  - `/api/stakeholders/approve` (pushes approved row to blockchain)
  - `/api/stakeholders/reject`
- Map data: `/api/map-locations`

`bcserver.js`:

- Add block: `POST /add`
- Read block: `GET /block/:id`
- Lookup by batch IDs:
  - `/block/fbatch/:fbatchid`
  - `/block/processor/:pid`
  - `/block/labtester/:lid`
  - `/block/manufacturer/:mid`
- Chain/status:
  - `/chain`
  - `/verify`
  - `/count`
  - `/logs`

## QR Page

`qrcode.html` reads query params:

- `farmer`
- `processor`
- `labtester`
- `manufacturer`

It then fetches matching blocks and renders collapsible cards.  
Note: it currently points to a hardcoded dev tunnel URL in `qrcode.html`; update that base URL for local or production use.

## Notes and Limitations

- API URLs in frontend files are hardcoded to `localhost` ports.
- Secrets/credentials are currently hardcoded in source files.
- No production deployment config or env-based configuration is set up yet.

## License

No license file is currently defined in this repository.
