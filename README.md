# Historical Atlas

A web application for exploring world war history — regions, eras, kingdoms, wars, campaigns, battles, commanders, weapons, maps, and sources.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4
- **Backend:** Node.js + Express, TypeScript, MVC pattern
- **Database:** MongoDB (Mongoose 8)
- **Auth:** JWT-based admin authentication

## Project Structure

```
HistoricalBattles/
├── client/          # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # API client, utilities
│   │   └── types/         # TypeScript interfaces
│   └── package.json
├── server/          # Express backend
│   ├── src/
│   │   ├── config/        # DB connection, env validation
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/    # Auth, error handling
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API route definitions
│   │   ├── seed/          # Database seed scripts
│   │   ├── services/      # Business logic layer
│   │   ├── utils/         # Shared utilities
│   │   └── validations/   # Zod schemas
│   └── package.json
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

1. Clone the repository
2. Copy `.env.example` to `server/.env` and `client/.env.local`, fill in values
3. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. Seed the database:
   ```bash
   cd server && npm run seed
   ```
5. Start development servers:
   ```bash
   # Terminal 1 — Backend
   cd server && npm run dev

   # Terminal 2 — Frontend
   cd client && npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

All API routes are versioned under `/api/v1/`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Admin login |
| POST | `/auth/register` | Register admin (protected) |
| GET | `/auth/me` | Get current admin |
| GET | `/regions` | List all regions |
| GET | `/regions/:slug` | Get region by slug |
| POST | `/regions` | Create region (admin) |
| PUT | `/regions/:id` | Update region (admin) |
| DELETE | `/regions/:id` | Delete region (admin) |
| GET | `/eras` | List all eras |
| GET | `/eras/:slug` | Get era by slug |
| GET | `/eras/region/:regionId` | Get eras by region |
| POST | `/eras` | Create era (admin) |
| PUT | `/eras/:id` | Update era (admin) |
| DELETE | `/eras/:id` | Delete era (admin) |

## Phased Roadmap

1. **Phase 1 – Foundation** ✅ Project scaffolding, Region & Era modules, auth, seed data
2. **Phase 2 – Core History:** Kingdom, Commander, War, Campaign modules
3. **Phase 3 – Battles:** Full Battle module, timeline, maps, related battles
4. **Phase 4 – Exploration:** Global search, filters, comparison, statistics
5. **Phase 5 – Premium:** Interactive maps, animated timelines, NLP search
