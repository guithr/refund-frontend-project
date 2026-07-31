# Refund Frontend

Frontend for managing expense refund requests (expense reports). Built with React 19, Vite, TypeScript (strict) and Tailwind CSS v4.

## Tech Stack

| Concern | Technology |
|---------|------------|
| Framework | React 19 |
| Build tool | Vite 8 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + `tailwind-variants` (`tv()`) |
| Server state | `@tanstack/react-query` |
| Forms | `react-hook-form` + `@hookform/resolvers` + `zod` |
| Routing | `react-router` (v8) |
| URL state | `nuqs` (search + pagination query params) |
| HTTP client | Axios |
| Toasts | `sonner` |
| Font | Open Sans (Google Fonts) |
| Package manager | pnpm |

## Getting Started

Prerequisites: Node.js and `pnpm`.

```bash
pnpm install   # install dependencies
pnpm dev       # start dev server
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:3333
```

`VITE_API_URL` is the base URL of the refund API consumed by the Axios instance in `src/services/api.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + production build |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm preview` | Preview production build |

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | `Home` | Refund list with search, pagination and categories |
| `/novo` | `NewRefund` | Create a new refund request (receipt upload + form) |
| `/detalhe/:id` | `RefundDetail` | View a single request, preview its receipt and delete it |
| `/sent` | `RefundSent` | Success screen after submitting a request |

## Project Structure

```
src/
├── assets/icons/        # SVG icons (no fill — use currentColor)
├── components/          # Reusable UI components (Button, Card, Input, SelectField, FileInput, ...)
├── contexts/            # Feature domain modules
│   ├── refunds/
│   │   ├── models/      # Refund entity type
│   │   ├── hooks/       # useRefund(s), useRefundForm (React Query + react-hook-form)
│   │   ├── components/  # refund-list, refund-row, refund-search, refund-pagination
│   │   └── schema.ts    # Zod schemas (refundSchema, refundCreateFormSchema, ...)
│   └── receipts/
│       ├── models/      # Receipt entity type
│       ├── hooks/       # useReceipt (upload), useReceiptUrl (download)
│       ├── components/  # receipt-viewer (image/PDF dialog)
│       └── schema.ts    # Zod schema for file validation (size, mime type)
├── pages/               # Route screens (home, new-refund, refund-detail, refund-sent, layout)
├── services/api.ts      # Axios instance + fetcher helper
├── utils/               # helpers (categoryIcons/categoryOptions), debounce
├── types/               # Shared API types (legacy — domain models preferred)
└── App.tsx              # Routes + QueryClientProvider + NuqsAdapter
```

## Key Features

- **Refund list** — server-paginated list fetched via React Query, with search (`q`) and page (`page`) kept in the URL query string via `nuqs`.
- **New refund form** — built with `react-hook-form` and `zod` (`refundCreateFormSchema`). Uploads the receipt first (`POST /receipts`), then creates the refund (`POST /refunds`) with the returned receipt id. Validation is handled entirely by the resolver — no manual field state.
- **Receipt viewer** — dialog that shows a receipt image or PDF from the API download endpoint.
- **Delete refund** — `DELETE /refunds/:id` mutation with loading state, confirmation dialog and success/error toasts.

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/refunds` | Paginated refund list (`?q=&page=`) |
| GET | `/refunds/:id` | Single refund detail |
| POST | `/refunds` | Create refund (`RefundCreatePayload`) |
| DELETE | `/refunds/:id` | Delete refund |
| POST | `/receipts` | Upload receipt (multipart form-data) |

## Conventions

- Commits follow **Conventional Commits** (English).
- Use `pnpm` — never npm or yarn.
- Components are written with `function` declarations, named exports, `tv()` variants and spread native props (see `AGENTS.md` for the full pattern).
- Only the design tokens listed in `AGENTS.md` are available in the Tailwind theme — no arbitrary color values.

## Roadmap / Future Requests

- Migrate the remaining screens that still rely on the legacy `refund-context.tsx` mock data to the domain modules + React Query hooks.
- Remove legacy `src/types/` types in favor of the domain models under `contexts/<domain>/models/`.
- Edit an existing refund request (PATCH/PUT endpoint + edit screen).
- Refund status tracking / workflow states (pending, approved, rejected).
- Code-split the app (`lazy()` + route-level dynamic imports) — current bundle exceeds the 500 kB Vite warning threshold.
- Add e2e/component tests and a linting setup (the project currently relies on `tsc` only).
- Internationalization (UI text is currently hardcoded in Portuguese).
