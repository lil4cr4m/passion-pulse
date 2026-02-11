# Passion Pulse

![Passion Pulse Logo](frontend/public/vite.svg)

Modern community platform for live “pulses” (events/rooms), gratitude notes, and a cyber-brutal leaderboard. Users can authenticate, share signals with meeting links, post gratitude, track karma, and view profiles.

## Getting Started

- Deployed app: https://your-deploy-url.example.com (replace with production link)
- Planning materials: https://your-planning-docs.example.com (replace with planning/board)
- Backend repository: https://github.com/SEB-60-Projects/passion-pulse/tree/main/backend

### Local Setup

1. Install deps: `npm install` in root, then `npm install` in `backend` and `frontend`.
2. Environment: set `JWT_SECRET`, `JWT_REFRESH_SECRET`, and database creds in `backend/.env`.
3. Run backend: `cd backend && npm run dev`.
4. Run frontend: `cd frontend && npm run dev`.

## Attributions

- UI icons: [Lucide](https://lucide.dev)
- Build tooling: [Vite](https://vitejs.dev)
- If AI/LLM outputs were used, cite per your policy (replace with specific prompts/links as needed).

## Technologies Used

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, PostgreSQL, JWT, bcrypt
- Tooling: ESLint, prettier-style configs, npm

## Features

- Auth (login/register) with refresh tokens and password change
- Create, list, and search live pulses with meeting links
- Gratitude notes and karma-based leaderboard
- Profile view/edit with responsive design

## API Surface Used (10+)

- POST /auth/register – create user
- POST /auth/login – sign in and receive tokens
- POST /auth/refresh – renew access token
- POST /auth/change-password – rotate password and revoke sessions
- GET /pulses – feed with search/category filters
- POST /pulses – create pulse (creator-only)
- PUT /pulses/:id – update pulse (owner/admin)
- DELETE /pulses/:id – delete pulse (owner/admin)
- GET /users/profile/:id – fetch profile + stats
- PUT /users/profile/:id – update profile (owner/admin)
- GET /users/leaderboard – top karma list
- GET /interests – categories for pulse creation
- POST /notes – send gratitude (non-owner)
- GET /notes/user/:userId – notes on a creator’s pulses

## CRUD Coverage

- Pulses: create, read (feed/search), update, delete from UI with owner/admin checks.
- Notes: create and read; self-thank prevention enforced server-side.
- Users: create (register), read (profile), update (profile/password).

## How to Use CRUD in the UI

- Create: Use “Create Signal” (Home sidebar) to launch a pulse with title, description, category, and meeting link.
- Read: Browse the Live_Signals feed (search and category filter) and profile pages; leaderboard for karma.
- Update: For your own pulses, open the card’s Edit control to change title/description/link; edit your profile bio/name; change password in Settings.
- Delete: For your own pulses, use the Delete control on the pulse card (admins can also delete). Notes cannot be deleted by senders.

## Next Steps

- Add image uploads/avatars for profiles and pulses
- Improve offline states and optimistic UI for notes
- Expand admin tools (moderation, pulse end controls)
- Add integration tests and accessibility audit
