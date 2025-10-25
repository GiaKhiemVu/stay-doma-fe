Stay Doma — Frontend

A Next.js (App Router) frontend for Stay Doma.

<p align="left"> <a href="https://nodejs.org/"><img alt="Node" src="https://img.shields.io/badge/Node-22.21.0-339933?logo=node.js&logoColor=white"></a> <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14+-000000?logo=next.js&logoColor=white"></a> <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white"></a> <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000"></a> <a href="https://eslint.org/"><img alt="ESLint" src="https://img.shields.io/badge/ESLint-configured-4B32C3?logo=eslint&logoColor=white"></a> </p>
📚 Table of Contents

Tech Stack

Setup

Project Structure

Routes

Conventions & Helpers

NPM Scripts

Notes & Next Steps

License

🧰 Tech Stack

Next.js (App Router) with TypeScript

React 18

PostCSS (Tailwind optional)

ESLint for linting

⚙️ Setup
Prerequisites

Node.js 22.21.0

nvm use 22.21.0
git clone https://github.com/GiaKhiemVu/stay-doma-fe.git
cd stay-doma-fe
npm install

Run locally
npm run dev
# open http://localhost:3000

Build & start (production)
npm run build
npm start


💡 Add a .env.local (gitignored) for runtime config and commit a non-secret .env.example to document variables.

🗂 Project Structure
stay-doma-fe/
├─ api/                      # Next.js Route Handlers (server functions under /api/*)
├─ app/                      # App Router (pages, layouts, metadata)
│  ├─ layout.tsx             # Root layout (fonts, <html>, <body>, providers)
│  ├─ page.tsx               # Root route: "/"
│  ├─ auth/
│  │  ├─ forget-password/page.tsx
│  │  ├─ sign-in/page.tsx
│  │  └─ sign-up/page.tsx
│  ├─ dashboard/
│  │  ├─ bookings/page.tsx
│  │  ├─ chat/page.tsx
│  │  ├─ custom-website/page.tsx
│  │  ├─ guests/page.tsx
│  │  ├─ hotels/page.tsx
│  │  ├─ payment/page.tsx
│  │  └─ page.tsx
│  ├─ providers/page.tsx
│  └─ public/page.tsx
├─ public/                   # Static assets (served at /)
├─ components/               # Shared UI components
├─ lib/                      # Utilities, API clients
├─ styles/                   # Global styles (optional)
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json


app/layout.tsx — root layout that wraps every page (HTML shell, providers, global UI)

app/globals.css — global styles imported by the root layout

🧭 Routes

Each folder with a page.tsx is a route. Use query params (searchParams) for optional filters; use dynamic routes ([id]) for required resources.

URL	File path	Notes
/	                        app/page.tsx	                        Root page that redirects to /public.
/public	                    app/public/page.tsx	                    Public page to present hotels/rooms via filters (e.g., ?hotel=...&room=...).
/auth/forget-password	    app/auth/forget-password/page.tsx	    Reset user password page.
/auth/sign-in	            app/auth/sign-in/page.tsx	            Login page.
/auth/sign-up	            app/auth/sign-up/page.tsx	            Register page.
/dashboard	                app/dashboard/page.tsx	                Dashboard landing (should be auth-guarded).
/dashboard/bookings	        app/dashboard/bookings/page.tsx	        List all bookings. Optional filters: ?hotel=....
/dashboard/payment	        app/dashboard/payment/page.tsx	        Payment page. (fixed typo from “dashboord”)
/dashboard/chat	            app/dashboard/chat/page.tsx	            Chatbox for user & customer. Optional ?id=... to focus a thread.
/dashboard/guests	        app/dashboard/guests/page.tsx	        List all customers. Optional ?id=....
/dashboard/hotels	        app/dashboard/hotels/page.tsx	        List hotels/rooms. Optional filters: ?hotel=...&room=....
/dashboard/custom-website	app/dashboard/custom-website/page.tsx	Customize the user’s public page.