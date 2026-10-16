# Base44 Setup Notes

## Project Overview
- **App**: "Thuê Xe Máy Đà Lạt v2.1" — a Vietnamese motorbike rental interactive mobile prototype (390×844 phone frame).
- **Stack**: Vite 8 + React 19 + TypeScript + Tailwind CSS v4.
- **Package manager**: npm (no lockfile committed).

## Running the App
```
docker compose -f docker-compose.base44.yml up -d --build
```
- The dev server runs `vite --port=3000 --host=0.0.0.0` (defined in `package.json` `dev` script).
- Dependencies are installed on container startup via `npm install --legacy-peer-deps` (no lockfile exists; `--legacy-peer-deps` is required because `esbuild` versions in devDependencies conflict with Vite 8's peer deps).
- Source is bind-mounted at `/app`; edits hot-reload via Vite HMR.

## Key Details
- **No external credentials needed.** Despite `metadata.json` listing `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` and `.env.example` referencing `GEMINI_API_KEY`, no source code imports or uses the Gemini API, Express, or dotenv. The app is purely client-side with mock data.
- **No backend/database.** All data is static mock data in `src/data/mockData.ts`.
- Vite host allowlist is handled via `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` env var (set by the platform).
- `DISABLE_HMR` env var in `vite.config.ts` controls HMR/watching — left unset in preview so HMR is active.

## Verification
- Curl `http://localhost:3000/` returns the HTML page with title "Thuê Xe Máy Đà Lạt v2.1".
- The app renders a phone-frame prototype with a screen switcher bar at the top.
