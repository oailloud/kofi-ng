# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack monorepo: Angular 21 frontend + Express TypeScript backend (in `backend/`).

## Commands

### Frontend (Angular)
```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build to dist/
npm test           # Run tests with Vitest
npm run watch      # Build in watch mode (development)
```

### Backend (Express)
```bash
cd backend
npm run dev        # Dev server with hot reload at http://localhost:3000
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled server
```

No linting tooling is configured.

## Architecture

**Frontend** is Angular 21 using standalone components (no NgModules), Vite-based builds, and Vitest for testing.

**Backend** is a minimal Express API with a single `GET /coffees` endpoint returning static data from `src/data/coffees.json`. No database.

**Data flow**: Frontend (`CatalogService`) fetches `/coffees` from the backend on init → `CoffeeListComponent` displays results and manages additional local state via signals → `UpdateForm` component handles user input via `input()`/`output()` functions.

## Angular Coding Standards

These rules come from `cursor.md` and apply to all `.ts`, `.html`, `.scss` files:

**Components:**
- Always use standalone components — do NOT set `standalone: true` explicitly (it's implied)
- Always set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `input()` and `output()` functions, not `@Input()`/`@Output()` decorators
- Use `inject()` function, not constructor injection
- Put host bindings in the `host` object of `@Component`/`@Directive`, not `@HostBinding`/`@HostListener`

**State:**
- Use `signal()` for local state, `computed()` for derived state
- Use `update()` or `set()` on signals — never `mutate()`

**Templates:**
- Use built-in control flow: `@if`, `@for` (with `track`), `@switch` — not `*ngIf`, `*ngFor`, `*ngSwitch`
- Use native class/style bindings: `[class.active]="..."` — not `[ngClass]`/`[ngStyle]`
- Keep logic out of templates; delegate to TypeScript

**Services:**
- Always use `providedIn: 'root'`
