# My Project

Fullstack repo: a React frontend (Vite) and an Express backend, managed together
with npm workspaces.

# Code Owners
Tiernan Da Cruz,
Alanya Yildirim,
Matthew Tweed,

## Structure

```
my-project/
├── frontend/              React app (Vite)
│   ├── public/            Static files served as-is
│   └── src/
│       ├── assets/        Images, fonts, icons
│       ├── components/    Reusable UI pieces
│       ├── hooks/         Custom React hooks
│       ├── pages/         Top-level views / routes
│       ├── services/      API client (talks to the backend)
│       └── styles/        Global CSS
├── backend/               Express API
│   └── src/
│       ├── routes/        One file per resource (items.js is an example)
│       └── server.js      App setup, API mounting, serves built frontend
├── package.json           Workspace root with combined scripts
├── .gitignore
└── README.md
```

## Getting started

Requires Node 20 or newer.

```bash
npm install     # installs frontend and backend dependencies in one go
npm run dev     # runs the API and the frontend together
```

- Frontend: http://localhost:5173
- API: http://localhost:3000 (try http://localhost:3000/api/health)

During development Vite proxies any `/api/...` request to the backend, so the
frontend just calls `fetch('/api/...')` with no CORS setup.

## Production

```bash
npm run build   # builds the frontend into frontend/dist
npm start       # Express serves the API and the built frontend on one port
```

## Scripts (run from the repo root)

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Start backend (auto-restart) and frontend together |
| `npm run build` | Build the frontend for production                 |
| `npm start`     | Run the backend, serving `frontend/dist` if built |

## Adding an API endpoint

1. Create `backend/src/routes/<resource>.js` exporting an Express `Router`.
2. Mount it in `backend/src/server.js`: `app.use('/api/<resource>', router)`.
3. Call it from the frontend via `api.get('/<resource>')` in `src/services/api.js`.
