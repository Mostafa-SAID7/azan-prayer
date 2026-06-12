---
name: MUI → Tailwind/shadcn Migration
description: Complete removal of Material UI from the prayer-times PWA, replaced with Tailwind CSS 3 + shadcn/ui + Radix UI primitives.
---

## The rule
All MUI packages (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`) must stay unused. All new UI uses Tailwind utility classes + shadcn components in `src/components/ui/`.

**Why:** MUI was replaced to reduce bundle size, improve RTL support, and gain dark-mode via `class` strategy (toggling `dark` on `<html>`).

**How to apply:**
- Dark mode: `document.documentElement.classList.add/remove("dark")` — handled by `ThemeProvider` in `src/theme.jsx`. No MUI ThemeProvider.
- Color mode hook: `useColorMode()` from `src/theme.jsx` returns `{ mode, toggleColorMode }`.
- Tailwind config: `darkMode: ["class"]`, custom CSS vars for shadcn tokens in `src/index.css`.
- `@tailwind base/components/utilities` + `@layer base` CSS vars block must appear before any other styles.
- lucide-react: **pin to `0.441.0`**. Version 1.x had broken `.mjs` icon files that caused esbuild resolution errors. After version change, clear `node_modules/.vite` cache and restart Vite.
