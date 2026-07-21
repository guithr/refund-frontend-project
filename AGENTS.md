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
- Named exports for all components and pages

### Pages

```
src/pages/layout.tsx  →  export function Layout()
src/pages/home.tsx  →  export function Home()
src/pages/refund-detail.tsx  →  export function RefundDetail()
src/pages/new-refund.tsx  →  export function NewRefund()
src/pages/refund-sent.tsx  →  export function RefundSent()
src/pages/playground.tsx  →  export function Playground()
```

### Domain Components

Domain-specific components (e.g. refund list/row) live inside the domain module under `contexts/<domain>/components/`. Use a plain interface (not `tv()` variants) for props that don't need styling variants:

```tsx
import { Icon } from "../../../components/Icon";
import { Text } from "../../../components/Text";
import { categoryIcons } from "../../../utils/helpers";

interface RefundRowProps {
  title: string;
  category: keyof typeof categoryIcons;
  value: number;
}

export function RefundRow({ title, category, value }: RefundRowProps) {
  const IconComponent = categoryIcons[category].icon;
  ...
}
```

### Components Patterns

Every component must follow this structure:

```
import { tv, type VariantProps } from "tailwind-variants";

const componentVariants = tv({
  base: "...",
  variants: { ... },
  defaultVariants: { ... },
});

interface ComponentProps
  extends Omit<React.ComponentProps<"element">, "conflictingNativeProp">,
    VariantProps<typeof componentVariants> {}

export function Component({ variantProp, className, children, ...props }: ComponentProps) {
  return (
    <element className={componentVariants({ variantProp, className })} {...props}>
      {children}
    </element>
  );
}
```

Rules:
- Import `tv` and `VariantProps` from `tailwind-variants`
- Define `tv()` config first, then interface, then component
- Extend `React.ComponentProps<"element">` omitting only props that conflict with variants
- Use `VariantProps<typeof componentVariants>` for variant types
- Spread `...props` on the native element to forward all native props
- Never use `React.createElement` — use JSX with dynamic `Tag`

### Disabled Variant Pattern

For interactive components that need a disabled state, create a `disabled` variant in `tv()` and use `enabled:` prefix on interactive pseudo-classes to prevent them when disabled:

```ts
const buttonVariants = tv({
  base: `...`,
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "disabled">,
    VariantProps<typeof buttonVariants> {}

export function Button({ disabled, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ disabled })}
      disabled={disabled}
      {...props}
    />
  );
}
```

When defining hover/active styles, prefix with `enabled:` (e.g. `enabled:hover:bg-green-200`) so they don't apply when the element is disabled. Omit `disabled` from `React.ComponentProps` and handle it explicitly.

### Styling

- Use Tailwind utility classes directly in JSX
- Use `tailwind-variants` (`tv()`) for component variants and reusable styles
- Avoid inline styles (`style={{}}`)
- Avoid CSS modules and plain CSS files — prefer Tailwind + tv()
- Use backtick template literals (`` ` ``) in `tv()` base/variants for multi-line class strings — never inline single-line strings

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
├── components/    # Reusable UI components (Button, Card, Input, etc.)
├── contexts/
│   ├── refund-context.tsx  # Legacy — use contexts/refunds/ instead
│   ├── refunds/            # Refund domain module
│   │   ├── models/
│   │   │   └── refund.ts   # Refund entity type
│   │   ├── hooks/
│   │   │   └── use-refunds.ts  # Fetch refunds via React Query
│   │   └── components/
│   │       ├── refund-list.tsx  # List screen consumed by pages/home
│   │       ├── refund-row.tsx   # Single row with dynamic icon & category
│   │       ├── refund-pagination.tsx
│   │       └── refund-search.tsx
│   └── receipts/           # Receipt domain module
│       ├── models/
│       │   └── receipt.ts  # Receipt entity type
│       ├── hooks/
│       │   └── use-receipt.ts  # Upload receipt via POST /receipts
│       └── components/
│           └── receipt-viewer.tsx  # Dialog to view receipt (image/PDF)
├── pages/         # Route pages / screens (kebab-case, e.g. home.tsx, new-refund.tsx)
├── hooks/         # Custom React hooks
├── utils/
│   └── helpers.ts # Category data (categoryIcons, categoryOptions)
├── types/         # Shared TypeScript types (legacy — prefer domain models)
├── services/
│   └── api.ts     # Axios instance + fetcher helper
├── App.tsx
└── main.tsx
```

## API & Data Fetching

- **HTTP client**: Axios (configured in `src/services/api.ts`)
- **Server state**: `@tanstack/react-query` — all data fetching via React Query hooks
- **Base URL**: `VITE_API_URL` from `.env` (`http://localhost:3333`)
- **Fetcher helper**: `fetcher(url)` wraps `api.get(url).then(res => res.data)`

### `useRefunds()` Hook

Located at `src/contexts/refunds/hooks/use-refunds.ts`. Returns:

```ts
{
  refunds: Refund[] | undefined;        // data.refunds.data
  meta: Meta | undefined;               // data.refunds.meta (total, perPage, currentPage, lastPage)
  isLoadingRefunds: boolean;
  filters: { q: string | null; setQ };
  pagination: { page: number; setPage };
  setSearch: (value: string) => void;   // sets q and resets page to 1
}
```

Uses `nuqs` for URL query state (`q`, `page`) and fetches via React Query.

### API Response Shape (Paginated)

```ts
{
  refunds: {
    meta: { total, perPage, currentPage, lastPage, ... },
    data: Refund[]
  }
}
```

### Domain Module Pattern

Each feature domain lives in `src/contexts/<domain>/` with this structure:

```
contexts/<domain>/
├── models/       # Entity types
├── hooks/        # React Query hooks
└── components/   # Screen components consumed by pages
```

### Category Helpers (`src/utils/helpers.ts`)

Central source of truth for category-related data:

- `categoryIcons` — Object mapping category keys to `{ icon, label }`. Used by `RefundRow` to render the correct Phosphor icon dynamically via `categoryIcons[category].icon`.
- `categoryOptions` — Pre-computed `{ label, value }[]` array for `<SelectField>` options. Import directly in pages: `import { categoryOptions } from "../utils/helpers"`.

### Legacy Context

The old `src/contexts/refund-context.tsx` uses mock data and `useRefund()`. New code should use the structured domain modules with React Query hooks under `contexts/refunds/`. Migrate pages one by one.

## Package Manager

- Always use `pnpm` (never npm or yarn)
- Commands: `pnpm add <pkg>`, `pnpm remove <pkg>`, `pnpm update <pkg>`

## Git

- Feature branches: `feature/<name>`
- Fix branches: `fix/<name>`
- Always commit in English following conventional commits format
- **Never auto-commit** — wait for explicit user request before committing
