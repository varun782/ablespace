# Dexter — Task Management System
Full Stack Developer (Fresher) Assessment — Part 1

A Trello/Linear-style task management workspace built with **Next.js (App Router) + Tailwind CSS**
on the frontend and **NestJS + TypeORM (SQLite)** on the backend, implemented against the provided
Figma file.

## Live demo & repo
- **Live app:https://ablespace-task-management-phi.vercel.app/
- **Part 2 submission:** [`part2/AbleSpace_Product_Understanding.docx`](./part2/AbleSpace_Product_Understanding.docx)

> **Note:** the backend is on Render's free tier, which spins down after inactivity. The **first**
> request after a period of no traffic can take ~30–50 seconds to wake up — this is expected, not
> a bug. Subsequent requests are fast.

## Tech stack
|   Layer  |                             Choice                                           |
|----------|------------------------------------------------------------------------------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Zustand |
| Backend  | NestJS, TypeORM, better-sqlite3, class-validator                             |
|  Auth    | Guest login (no password) — matches the Figma "Continue as Guest" flow       |

## Features implemented
- **Guest login** screen matching the Figma design (`Continue as Guest` / `Login with Google` UI,
  Google button is presentational only — no real OAuth was in scope for the design).
- **Kanban board** — To Do / Doing / Completed / On Hold columns, drag-and-drop between columns,
  animated column/card entry with Framer Motion.
- **List view** — grouped table with a toggleable **Fields** menu (Priority / Members / Due Date),
  matching the Figma "Fields" dropdown.
- **Task detail panel** — slide-over with editable title/description, labels, a **standalone
  "Details" card** (Status, Priority, Members, Date range, Team, Reporter — with gear/add-field
  icons) matching the Figma sidebar block, a subtasks table, and a comment thread.
- **Fields menu** — Status, Priority, Members, Due Date, Labels, Reporter are all independently
  toggleable columns in list view, matching the full Figma Fields dropdown (not just 3 fields).
- **Projects page** — table of projects with priority, lead, due date.
- **Settings — Theme & Color** — Light/Dark theme toggle and 6 accent colors
  (Amber, Blue, Pink, Rose, Emerald, Black), exactly matching the Figma "Change Theme" /
  "Color Mode" menus. **Both persist across refresh** via `localStorage` (zustand `persist`).
- **NestJS REST API** for tasks and projects (`GET/POST/PATCH/DELETE`), with `class-validator` DTOs,
  a global `ValidationPipe`, and CORS enabled for the frontend origin.
- The frontend **works standalone** (seeded local data) if the backend isn't reachable yet, and
  automatically switches to live backend data once `hydrateTasks()` succeeds — so the UI is never
  blank while you wire up deployment.

## Project structure
```
ablespace-task-management/
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   └── lib/            # types, seed data, zustand store, API client
├── backend/            # NestJS app
│   └── src/
│       ├── tasks/       # entity, dto, service, controller, module
│       ├── projects/
│       ├── app.module.ts
│       └── main.ts
├── part2/               # Part 2 — AbleSpace product understanding submission
│   └── AbleSpace_Product_Understanding.docx
└── README.md
```

## Running locally

### Backend
```bash
cd backend
npm install
npm run start:dev        # http://localhost:4000, SQLite file data.sqlite created automatically
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev               # http://localhost:3000
```
Open http://localhost:3000, click **Continue as Guest**.

## Deployment

This project is already deployed and live (see links at the top). For reference, here's how it
was set up:


### 2. Backend → Render (free tier)
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`
- **Environment variables:**
  - `CORS_ORIGIN` → `https://ablespace-task-management-mauve.vercel.app`
- Deployed URL: `https://ablespace-task-management-3770.onrender.com`
- Demo data was seeded once via Render's **Shell** tab: `node dist/seed.js`

### 3. Frontend → Vercel (free tier)
- **Root Directory:** `frontend`
- **Environment variable:** `NEXT_PUBLIC_API_URL` → `https://ablespace-task-management-3770.onrender.com/api`
- Deployed URL: `https://ablespace-task-management-mauve.vercel.app`

### To redeploy after a change
- **Frontend:** push to `main` — Vercel auto-deploys.
- **Backend:** push to `main` — Render auto-deploys on commit (Auto-Deploy: On Commit).

### Verify it's working
1. Open the live app link above.
2. Click **Continue as Guest**.
3. Confirm tasks load (allow up to 50s on first load if the backend was idle).
4. Drag a card between columns, open a task, add a comment.
5. Switch theme/color in Settings, refresh — the theme should persist.

Both the repo and the deployment will stay public/accessible for at least 45 days as required.

## Known deviations from the Figma design
- The "Sign up to comment, edit, inspect and more" Figma-editor banner and the Figma toolbar
  itself are Figma's own UI chrome, not part of the product design — not implemented.
- Real Google OAuth was out of scope; both login buttons currently create the same guest session.
- Calendar/date-picker popover (seen in one Figma frame) is simplified to a text label
  ("Start → End") in the Details card rather than a full custom calendar widget, given the
  assessment's time constraints — clicking to edit dates isn't wired up yet.
- The Figma "Details" card's gear icon (configure visible fields) and "+" (add a custom field)
  are rendered but not functional yet — visible affordance only, not full custom-field creation.
- Backend uses SQLite for simplicity/zero external setup; swapping to Postgres/Mongo only requires
  changing the `TypeOrmModule.forRoot` config in `backend/src/app.module.ts`.
- Backend is hosted on Render's free tier, so the very first request after inactivity is slow
  (cold start, ~30–50s) — a paid tier or a keep-alive ping would remove this in production.

## AI tool usage
Parts of this implementation were built with AI assistance (Claude). I understand the code
end-to-end and can walk through any part of it — component structure, the Zustand store, the
NestJS module/DTO/validation pipeline, and the SQLite schema — in the interview.
