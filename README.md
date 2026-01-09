# TravelBuddy (Backend)

## Live Link (Backend)
- Live URL: https://b5a8-backend.onrender.com

## Project Overview
Backend for TravelBuddy, providing role-based authentication, travel plan management, profile features, reviews, and Stripe payment support with webhook handling.

## Tech Stack
- Node.js + Express.js (TypeScript)
- Prisma + postgresql
- Zod (validation)
- JWT auth (access + refresh token)
- Stripe payments + webhook

## Core Modules
- Auth (register/login, token issuing, refresh token flow)
- Users (profile CRUD, admin user management)
- Travel Plans (CRUD + visibility + discovery)
- Matching/Search (destination/date/interests based searching)
- Reviews (rating + review CRUD)
- Payments (subscriptions, verified badge logic, Stripe intent + webhook)

## API Endpoints
These endpoints are aligned with the project’s suggested API structure and core features.

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user. |
| POST | /api/auth/login | Login user. |
| GET | /api/users/:id | Get user profile. |
| PATCH | /api/users/:id | Update profile. |
| POST | /api/travel-plans | Create travel plan. |
| GET | /api/travel-plans | Get all travel plans. |
| GET | /api/travel-plans/match | Search/match travelers. |
| POST | /api/reviews | Add review. |
| POST | /api/payments/create-intent | Create payment intent. |



## Environment Variables (Example)
Create `.env` and set:
- PORT=5000
- NODE_ENV=development
- MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
- JWT_ACCESS_SECRET=<ACCESS_SECRET>
- JWT_REFRESH_SECRET=<REFRESH_SECRET>
- JWT_ACCESS_EXPIRES_IN=15m
- JWT_REFRESH_EXPIRES_IN=7d
- STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
- STRIPE_WEBHOOK_SECRET=<YOUR_STRIPE_WEBHOOK_SECRET>
- CLIENT_URL=<YOUR_FRONTEND_URL>

## Local Setup
1. Install dependencies:
   - `bun install`
2. Run development server:
   - `bun run dev`
3. Ensure CORS allows requests from the frontend domain.



