# Market Dashboard (WIP)

A real-time, web-based dashboard that consolidates market data
(indexes, crypto, earnings calendar, news sentiment, etc.).

## Tech stack

| Layer          | Choice                    | Notes                          |
| -------------- | ------------------------- | ------------------------------ |
| Front-end      | Next.js 15 (Pages Router) | React 19 + TypeScript          |
| Styling        | Tailwind CSS 3.x         | Dark-mode first                |
| Icons / UI     | Headless UI, Heroicons    | Accessible menus + drawer      |
| State          | Zustand (preferences)     | To be wired in Phase 2         |
| Package mgr    | **pnpm**                  | Stick to pnpm for all installs |

## Getting started (dev)

```bash
# 1. Clone
git clone https://github.com/<you>/market-dashboard.git
cd market-dashboard

# 2. Install deps
pnpm install        # use npm install if you prefer npm

# 3. Run dev server
pnpm dev            # or: npm run dev

# 4. Open
# http://localhost:3000

