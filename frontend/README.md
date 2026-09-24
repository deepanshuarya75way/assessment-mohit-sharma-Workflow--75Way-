# WorkFlow HRMS — Frontend

React-based single page application for the WorkFlow Human Resource Management System.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI Library with type safety |
| Vite 8 | Build tooling & dev server |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Apollo Client 4 | GraphQL data fetching |
| Redux Toolkit | Global state management |
| Zustand | UI local state |
| TanStack Table | Headless data grids |
| Lucide React | SVG icon system |
| Zod | Schema validation |

## Getting Started

```bash
npm install
npm run dev       # Starts on http://localhost:3000
```

## Project Structure

```
src/
├── pages/           # Route-level page components (16 modules)
├── components/      # Shared layout & UI components
├── context/         # React Context providers (Session, User)
├── store/           # Redux slices (auth)
├── stores/          # Zustand stores (UI state)
├── graphql/         # GraphQL queries, mutations, subscriptions
├── lib/             # Core utilities (Apollo client, auth, mock data)
├── types/           # TypeScript type declarations
├── App.tsx          # Route configuration
├── providers.tsx    # Context/store provider composition
└── main.tsx         # Application entry point
```

## Environment Variables

Create a `.env` file:

```env
VITE_GRAPHQL_URL=http://localhost:5000/graphql
VITE_API_URL=http://localhost:5000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linter |
