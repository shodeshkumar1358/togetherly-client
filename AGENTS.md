<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

This repository is a Next.js 16 app using the App Router. The project is intentionally small and opinionated, so keep changes tight, dependency-light, and aligned with the existing conventions below.

## Project overview

- App root: `src/app/`
- UI building blocks: `src/components/ui/`
- Shared utilities: `src/lib/`
- Package manager: npm (`package-lock.json` present; do not add pnpm/yarn lockfiles)
- Goal: a modern React + Tailwind client application with Base UI primitives and no unnecessary framework churn

## Commands

- `npm run dev` — start the dev server with Turbopack
- `npm run build` — production build
- `npm run lint` — lint the project with ESLint
- `npx tsc --noEmit` — type-check when a quick TS validation is needed

## Important stack constraints

- React Compiler is enabled in `next.config.ts` and `babel-plugin-react-compiler` is installed. Write compiler-friendly code.
- Tailwind CSS v4 is used via `@tailwindcss/turbopack`; there is no `tailwind.config.js` to modify.
- Use `@base-ui/react/*` for UI primitives in `src/components/ui/`, not Radix components.
- Import `cn` from the `cn` package or `@/lib/utils`; do not invent a custom `clsx + tailwind-merge` helper here.
- Use `lucide-react` for icons.

## Code conventions

- Use TypeScript for all new code.
- Prefer small, focused files and keep logic close to where it is used.
- Follow the App Router structure: route files in `src/app`, component files in `src/components`, shared helpers in `src/lib`.
- Use the existing `@/*` alias to reference project files.
- Preserve the current styling approach: utility classes with Tailwind v4 and CSS-first theme tokens in `src/app/globals.css`.
- When adding or editing a UI component, match the project’s shadcn/base-nova style and existing component API patterns.

## Validation expectations

- Run the smallest relevant validation command after edits. For UI or TypeScript changes, prefer `npx tsc --noEmit` and/or `npm run lint` when those are the meaningful checks.
- Do not broaden scope with extra dependencies or large refactors unless the task requires it.
- Keep changes surgical and avoid unrelated cleanup.

## Working style

- Read the existing files before making changes.
- Prefer native Next.js and React patterns already used in this codebase.
- Do not remove the required `nextjs-agent-rules` block at the top of this file.
- If a change affects app metadata, styling, or page structure, ensure it remains consistent with the repository’s existing conventions.
