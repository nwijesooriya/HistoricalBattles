# Historical Atlas

A CMS-based web application for exploring world war history — regions, eras, kingdoms, wars, campaigns, battles, commanders, weapons, maps, and sources.

## Architecture

The application consists of two separate parts that share the same backend and database:

### 1. Public Website (Read Only)
- Accessible to all visitors without authentication
- Browse Regions, Eras, Kingdoms, Wars, Battles, Commanders, Weapons, and Sources
- No administrative functionality exposed

### 2. Admin CMS
- Protected administration area for content management
- JWT-based authentication with role-based access control
- Roles: `super_admin` (full access) and `editor` (content management only)
- Full CRUD operations for all historical entities

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4
- **Backend:** Node.js + Express, TypeScript, MVC pattern
- **Database:** MongoDB (Mongoose 8)
- **Auth:** JWT-based admin authentication with role-based access control

## Project Structure

```
HistoricalBattles/
├── client/          # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── admin/    # Admin CMS pages
│   │   │   │   ├── login/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── regions/
│   │   │   │   ├── eras/
│   │   │   │   ├── kingdoms/
│   │   │   │   ├── wars/
│   │   │   │   ├── battles/
│   │   │   │   ├── commanders/
│   │   │   │   ├── weapons/
│   │   │   │   └── sources/
│   │   │   └── region/   # Public pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # API client, utilities
│   │   └── types/         # TypeScript interfaces
│   └── package.json
├── server/          # Express backend
│   ├── src/
│   │   ├── config/        # DB connection, env validation
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/    # Auth, error handling, role-based access
│   │   ├── models/        # Mongoose schemas (Admin, Region, Era, Kingdom, War, Battle, Commander, Weapon, Source)
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
   This creates:
   - Default admin account: username `admin`, password `admin123` (change after first login)
   - Sample regions and eras
5. Start development servers:
   ```bash
   # Terminal 1 — Backend
   cd server && npm run dev

   # Terminal 2 — Frontend
   cd client && npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) for public website
7. Access admin CMS at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## API Endpoints

All API routes are versioned under `/api/v1/`.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Admin login (username + password) |
| POST | `/auth/register` | Register admin (super_admin only) |
| GET | `/auth/me` | Get current admin |

### Regions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/regions` | List all regions (public) |
| GET | `/regions/:slug` | Get region by slug (public) |
| POST | `/regions` | Create region (admin) |
| PUT | `/regions/:id` | Update region (admin) |
| DELETE | `/regions/:id` | Delete region (admin) |

### Eras
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/eras` | List all eras (public) |
| GET | `/eras/:slug` | Get era by slug (public) |
| GET | `/eras/region/:regionId` | Get eras by region (public) |
| POST | `/eras` | Create era (admin) |
| PUT | `/eras/:id` | Update era (admin) |
| DELETE | `/eras/:id` | Delete era (admin) |

### Kingdoms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/kingdoms` | List all kingdoms (public) |
| GET | `/kingdoms/slug/:slug` | Get kingdom by slug (public) |
| GET | `/kingdoms/region/:regionId` | Get kingdoms by region (public) |
| GET | `/kingdoms/era/:eraId` | Get kingdoms by era (public) |
| POST | `/kingdoms` | Create kingdom (admin) |
| PUT | `/kingdoms/:id` | Update kingdom (admin) |
| DELETE | `/kingdoms/:id` | Delete kingdom (admin) |

### Wars
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wars` | List all wars (public) |
| GET | `/wars/slug/:slug` | Get war by slug (public) |
| GET | `/wars/region/:regionId` | Get wars by region (public) |
| GET | `/wars/era/:eraId` | Get wars by era (public) |
| POST | `/wars` | Create war (admin) |
| PUT | `/wars/:id` | Update war (admin) |
| DELETE | `/wars/:id` | Delete war (admin) |

### Battles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/battles` | List all battles (public) |
| GET | `/battles/slug/:slug` | Get battle by slug (public) |
| GET | `/battles/war/:warId` | Get battles by war (public) |
| GET | `/battles/region/:regionId` | Get battles by region (public) |
| GET | `/battles/era/:eraId` | Get battles by era (public) |
| POST | `/battles` | Create battle (admin) |
| PUT | `/battles/:id` | Update battle (admin) |
| DELETE | `/battles/:id` | Delete battle (admin) |

### Commanders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/commanders` | List all commanders (public) |
| GET | `/commanders/slug/:slug` | Get commander by slug (public) |
| POST | `/commanders` | Create commander (admin) |
| PUT | `/commanders/:id` | Update commander (admin) |
| DELETE | `/commanders/:id` | Delete commander (admin) |

### Weapons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/weapons` | List all weapons (public) |
| GET | `/weapons/slug/:slug` | Get weapon by slug (public) |
| GET | `/weapons/era/:eraId` | Get weapons by era (public) |
| POST | `/weapons` | Create weapon (admin) |
| PUT | `/weapons/:id` | Update weapon (admin) |
| DELETE | `/weapons/:id` | Delete weapon (admin) |

### Sources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sources` | List all sources (public) |
| GET | `/sources/:id` | Get source by id (public) |
| POST | `/sources` | Create source (admin) |
| PUT | `/sources/:id` | Update source (admin) |
| DELETE | `/sources/:id` | Delete source (admin) |

## Admin CMS Features

- **Dashboard**: Overview statistics and quick navigation
- **Regions Management**: Full CRUD for geographical regions
- **Eras Management**: Full CRUD for historical time periods
- **Kingdoms Management**: Full CRUD for historical kingdoms
- **Wars Management**: Full CRUD for historical wars
- **Battles Management**: Full CRUD for individual battles
- **Commanders Management**: Full CRUD for military commanders
- **Weapons Management**: Full CRUD for historical weapons
- **Sources Management**: Full CRUD for bibliographic sources

## Role-Based Access Control

- **super_admin**: Full access including admin account management
- **editor**: Can manage all historical content but cannot manage admin accounts

## Development Philosophy

This application is designed as a production-ready CMS:
- No hardcoded historical content in the frontend
- All data retrieved through backend API
- Clean separation between public website, backend API, and admin CMS
- Modular and scalable for future enhancements
