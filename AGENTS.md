# Project Guidelines

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Variants**: tailwind-variants
- **Font**: Open Sans (Google Fonts)
- **Package Manager**: pnpm
- **Linting**: TypeScript (no linter)

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + production build |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm preview` | Preview production build |

## Commits

All commits must follow **Conventional Commits** in **English**:

```
<type>: <short description in English>
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Maintenance, tooling, deps |
| `refactor` | Code change without feature/fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc |
| `test` | Adding/updating tests |
| `ci` | CI/CD changes |
| `perf` | Performance improvement |

### Examples

```
feat: add refund status filter component
fix: prevent crash on empty form submission
refactor: extract validation logic to hook
chore: update tailwindcss to v4.3
```

## Code Standards

### TypeScript

- Strict mode enabled
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and primitives
- Avoid `any` — use `unknown` when type is not known
- Use `as const` for literal types

### React

- Functional components with hooks
- No class components
- Use `function` declaration for components, not arrow functions
- Named exports for components, default export only for pages

### Styling

- Use Tailwind utility classes directly in JSX
- Use `tailwind-variants` (`tv()`) for component variants and reusable styles
- Avoid inline styles (`style={{}}`)
- Avoid CSS modules and plain CSS files — prefer Tailwind + tv()

### Design Tokens (Colors)

Only these colors are available in the Tailwind theme — do not use arbitrary values:

| Token | Hex | Usage |
|-------|-----|-------|
| `gray-100` | `#1F2523` | Text primary |
| `gray-200` | `#4D5C57` | Text secondary / icons |
| `gray-300` | `#CDD5D2` | Borders / dividers |
| `gray-400` | `#E4ECE9` | Surface background |
| `gray-500` | `#F9FBFA` | Page background |
| `white` | `#FFFFFF` | White surface |
| `green-100` | `#1F8459` | Primary / active states |
| `green-200` | `#2CB178` | Hover states |

### File Structure

```
src/
├── assets/
│   └── icons/     # SVG icons (no fill — use currentColor)
├── components/    # Reusable UI components
├── pages/         # Route pages / screens
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── types/         # Shared TypeScript types
├── services/      # API calls
├── App.tsx
└── main.tsx
```

## Package Manager

- Always use `pnpm` (never npm or yarn)
- Commands: `pnpm add <pkg>`, `pnpm remove <pkg>`, `pnpm update <pkg>`

## Git

- Feature branches: `feature/<name>`
- Fix branches: `fix/<name>`
- Always commit in English following conventional commits format
