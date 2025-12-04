README.md
# Cash for Cars! (Scaffold)

## What this contains
- Frontend: `index.html`, `css/` and `js/` files (single-page layout, sticky header/nav/sidebar)
- Backend: `server/server.js` (Express), SQLite DB using `better-sqlite3`
- DB init SQL script and `.env.example`

## Quick local setup (development)
1. Clone repo or copy files.
2. Install Node:
   - Node 18+ recommended.
3. From the `server` folder:
   ```bash
   cd server
   npm install



Create DB folder and file:
mkdir -p server/data
# if you want to create manually:
# sqlite3 server/data/contacts.db < server/db_init.sql



Create .env file based on .env.example (or rely on defaults).


Run server:
npm run dev    # uses nodemon if installed, or
npm start



Open http://localhost:3000 in your browser.


Notes for production


Protect /api/contacts with authentication (admin UI).


Use HTTPS (reverse proxy like nginx / cloud provider).


Consider migrating to Postgres for scale, and queueing (Redis) if traffic grows.


Add rate limiting, CAPTCHA, and server-side sanitization for inputs if you expect abuse.


Add tests.


Files to customize


index.html — branding, copy.


css/* — styles split for scalability.


server/server.js — adapt DB and authentication.


Use a proper hosting plan with persistent storage for SQLite, or prefer PostgreSQL.


Contact
Phone shown across site: 279-675-1575
Location: Sacramento (used for UX / copy)

---

### Implementation notes (important)
- The contact form POSTs JSON to `/api/contact`. The server stores it in `server/data/contacts.db` by default.
- I used **SQLite** for quick local setup — easy to replace with Postgres or another DB. The server uses `better-sqlite3` for synchronous prepared statements (simple and safe).
- If you want emails sent on form submit, add an async job or use a transactional email provider (SendGrid, Mailgun) and call it from `server/server.js` after successful DB insert.
- For production, protect `GET /api/contacts` and add admin authentication.

---

If you want, I can:
- Add an admin UI to view/export contacts (CSV).
- Convert the backend to PostgreSQL and provide Docker Compose.
- Add reCAPTCHA or HoneyPot to reduce spam.
- Provide SASS/SCSS variants and bundle config (Vite/Webpack).

Tell me which of the above you'd like next and I’ll add it directly into the codebase.
