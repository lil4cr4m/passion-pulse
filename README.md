# SkillCast

**A neo-brutalist live casting platform for knowledge sharing, skill discovery, and gratitude-driven community engagement.**

SkillCast is a community platform where experts and learners connect through live "casts" (video broadcasts), organized by skill channels. Users can launch casts, join colleagues, send gratitude notes to build "credit" (social currency), and compete on the leaderboard.

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Local Setup

1. **Clone & install dependencies:**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up environment variables** (`backend/.env`):
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/skillcast
   JWT_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   PORT=5001
   ```

3. **Initialize database:**
   ```bash
   cd backend
   node test-db.js  # runs schema.sql and seed-admin.js
   ```

4. **Start servers:**
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

5. **Access the app:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001
   - Admin login: `admin@skillcast.com` / `AdminPass123!`

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios, Lucide Icons |
| **Backend** | Node.js, Express.js, PostgreSQL, JWT, bcrypt |
| **Design** | Neo-brutalist (4px borders, 8px shadows, #000000 ink) |
| **Authentication** | JWT + Refresh Tokens + bcrypt password hashing |

## Key Features

✅ **Authentication** – Register, login, refresh tokens, password management  
✅ **Live Casts** – Create skill-based broadcasts with meeting links  
✅ **Skill Catalog** – Admin-managed channel-organized skill taxonomy  
✅ **Gratitude System** – Send credit notes to cast creators (+10 credit per note)  
✅ **Leaderboard** – Rank users by total credit earned  
✅ **User Profiles** – View stats (casts created, notes received)  
✅ **Admin Panel** – Full user management (create, edit, delete, update role/credit)  
✅ **Role-Based Access** – Member vs Admin permissions  

## Project Structure

```
skillcast/
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── pages/           # Home, Login, Profile, CreateCast, AdminUsers
│   │   ├── components/      # UI components, CastFeed, CastCard, CreditForm
│   │   ├── context/         # AuthContext (JWT state)
│   │   ├── api/             # Axios instance & endpoints
│   │   └── App.jsx          # Router & layout
│   └── tailwind.config.js   # Color palette (#00FF85, #A358FF, etc.)
│
└── backend/                  # Node.js + Express + PostgreSQL
    ├── src/
    │   ├── controllers/      # Business logic (auth, users, casts, skills)
    │   ├── routes/          # API endpoints
    │   ├── middleware/      # JWT auth, error handling
    │   ├── config/          # Database connection
    │   └── utils/           # Logger, helpers
    ├── db/                  # SQL migrations & schema
    └── seed-admin.js        # Admin account seeder
```

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Broadcast Neon | `#00FF85` | Primary actions, "active" states |
| Cast Violet | `#A358FF` | Brand, admin badges, identities |
| Credit Yellow | `#FFD100` | Leaderboard, social currency |
| Signal Pink | `#FF3BFF` | Deletions, gratitude |
| System Cyan | `#00E0FF` | Utility buttons (Edit, Logout) |
| Ink Black | `#000000` | Borders, shadows, text |
| Off-White | `#F8F8F8` | Canvas background |

## API Overview

See [DOCUMENTATION.md](DOCUMENTATION.md) for complete reference:
- Database schema with types and constraints
- Entity relationship diagram
- All API endpoints with request/response examples
- React component tree
- Detailed feature descriptions

**Quick API Examples:**
- `POST /api/auth/register` – Create account
- `POST /api/auth/login` – Sign in
- `POST /api/casts` – Launch cast
- `GET /api/casts` – List casts
- `POST /api/notes` – Send gratitude
- `GET /api/users/leaderboard` – Top 10 users
- `GET /api/users/admin/all` – All users (admin)
- `DELETE /api/users/:id` – Delete user (admin)

## Development

### Code Standards
- **Frontend:** React hooks, context API, Tailwind classes
- **Backend:** Async/await, prepared SQL statements, centralized error handling
- **Naming:** camelCase (JS), UPPERCASE (UI text), snake_case (db)

### Running Tests
```bash
cd backend
npm test  # Run Jest tests (when configured)
```

### Debugging
- Frontend: Open DevTools (F12), check Console/Network tabs
- Backend: Check terminal output for logs
- Database: Use `psql` CLI or GUI (pgAdmin, DataGrip, DBeaver)

## Features Explained

### Authentication
- Secure password hashing (bcrypt, 12 rounds)
- JWT access tokens (15 min expiry)
- Long-lived refresh tokens (7 days)
- Auto-logout on both token expiration and manual logout
- Token revocation on password change

### Live Casts
- Create broadcast with skill, title, description, Zoom/Teams link
- Join via external meeting link
- Filter by skill channel
- Search by title/keywords
- Owner can edit or end cast

### Gratitude System
- Attendees send gratitude notes (+10 credit to creator)
- Self-gratitude prevention
- Public visibility of notes on cast details
- Creator sees accumulated credit on profile

### Leaderboard
- Top 10 users ranked by total credit
- Real-time updates as notes are sent
- Display on home page sidebar
- Encourages healthy competition

### Admin Panel
- View all users in database
- Create new user accounts
- Edit user details (name, credit, role)
- Delete user accounts with confirmation
- Manage skill catalog (CRUD)

## Presentation Highlights

**For Stakeholders:**
- 🎨 Modern, bold neo-brutalist design with intentional aesthetic
- 💪 Complete CRUD operations with role-based security
- 🏆 Gamified engagement (credit system, leaderboard)
- 📊 Scalable architecture (UUID keys, stateless auth)
- 🔒 Enterprise-ready security (bcrypt, JWT, HTTPS-ready)

**For Developers:**
- ⚡ Fast dev setup with Vite + Tailwind hot reload
- 🧩 Modular React architecture (hooks, context, components)
- 📚 Well-organized backend (controllers, routes, middleware)
- 🗄️ Clean database schema with relationships documented
- 📖 Comprehensive API documentation (DOCUMENTATION.md)

## Future Plans

### Short-term (Q2 2026)
- Real-time notifications (WebSocket)
- Advanced search & filtering
- Cast recording & replay

### Mid-term (Q3-Q4 2026)
- Mobile app (React Native)
- Analytics dashboard (admin)
- Skill proficiency badges
- Premium features

### Long-term (2027+)
- OAuth2 / SSO integration
- LMS connectivity
- AI-powered recommendations
- Internationalization (i18n)

See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed roadmap and technical debt items.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "feat: describe change"`
4. Push and open a pull request

## Support

- **Issues:** GitHub Issues
- **Questions:** DM maintainers or check team Slack
- **Full Docs:** See [DOCUMENTATION.md](DOCUMENTATION.md) for API, database schema, component tree, and roadmap

## License

MIT – See LICENSE file for details

---

**Last Updated:** February 12, 2026  
**Built by:** SEB-60-Projects Team
