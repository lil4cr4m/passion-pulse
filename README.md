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

## Next Steps

- Add image uploads/avatars for profiles and pulses
- Improve offline states and optimistic UI for notes
- Expand admin tools (moderation, pulse end controls)
- Add integration tests and accessibility audit
