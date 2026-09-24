<div align="center">

# WorkFlow HRMS

**Enterprise-Grade Human Resource Management System**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A comprehensive, production-ready HRMS platform that centralizes the entire employee lifecycle — from onboarding and attendance through payroll, performance, recruitment, and AI-powered HR assistance.

[Getting Started](#getting-started) · [Architecture](#architecture) · [Features](#features) · [API Reference](#api-reference) · [Contributing](#contributing)

</div>

---

## Features

| Module | Description |
|--------|-------------|
| **Dashboard** | Role-specific widgets, charts, and quick actions |
| **Onboarding** | Phased checklist (pre-joining → day 1 → month 1) with progress tracking |
| **Attendance** | Multi-method clock in/out with location & IP verification |
| **Leave Management** | Multi-level approval workflows with balance tracking |
| **Payroll & Compliance** | Localized payroll for India (PF, ESI, PT) and US (Federal/State Tax, 401k) |
| **Documents** | Centralized repository with verification status & expiry tracking |
| **Expenses** | Receipt-based submissions with policy validation & approval flow |
| **Performance & Goals** | OKR management with key results, reviews, and 360° feedback |
| **Contributions** | Value-contribution system with points, leaderboard, and badges |
| **Training** | Learning hub with mixed content, progress tracking, and certificates |
| **Recruitment** | Job postings and candidate pipeline with interview scheduling |
| **Recognition** | Peer-to-peer appreciation feed with likes and comments |
| **Announcements** | Targeted company communications with engagement metrics |
| **Team Management** | Direct reports view with reporting relationships |
| **Analytics** | Role-scoped workforce analytics and HR dashboard |
| **AI HR Copilot** | Context-aware AI assistant powered by Groq (LLaMA 3.3 70B) |

### Role-Based Access Control (RBAC)

Four distinct user roles with tailored navigation, dashboards, and permissions:

| Role | Access Level |
|------|-------------|
| **Employee** | Self-service: attendance, leave, payroll, goals, training |
| **Manager** | Team oversight: approvals, team performance, attendance monitoring |
| **HR Specialist** | Organization-wide: recruitment, onboarding, compliance, analytics |
| **Admin** | Full system: all modules, configuration, org-wide analytics |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│                                                                     │
│   React 19 + TypeScript  │  Tailwind CSS 4  │  Redux + Zustand     │
│   React Router 7         │  Lucide Icons    │  Apollo Client        │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │  GraphQL / REST API
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                       BACKEND SERVER (Express)                      │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Middleware: CORS → JSON Parser → Request Logger            │   │
│   └─────────────┬───────────────────────────┬───────────────────┘   │
│                 │                           │                       │
│   ┌─────────────▼──────────┐  ┌─────────────▼──────────────────┐   │
│   │   Apollo Server        │  │   REST Routes                  │   │
│   │   /graphql             │  │   /api/copilot                 │   │
│   │                        │  │   /health                      │   │
│   │   Queries:             │  │                                │   │
│   │   - getAllJobPostings  │  │   Controllers → Services       │   │
│   │   - getAllCandidates   │  │   (Groq AI SDK)                │   │
│   │                        │  │                                │   │
│   │   Mutations:           │  └────────────────────────────────┘   │
│   │   - updateCandidate   │                                        │
│   └─────────────┬──────────┘                                       │
│                 │                                                   │
│   ┌─────────────▼──────────────────────────────────────────────┐   │
│   │             Mongoose ODM (Models + Validation)              │   │
│   └─────────────┬──────────────────────────────────────────────┘   │
│                 │                                                   │
│   ┌─────────────▼──────────────────────────────────────────────┐   │
│   │    MongoDB  │  In-Memory Fallback (auto-detected)           │   │
│   └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
workflow-hrms/
│
├── backend/                          # Express API Server
│   ├── src/
│   │   ├── config/
│   │   │   ├── environment.js        # Centralized env configuration
│   │   │   ├── database.js           # MongoDB connection + fallback
│   │   │   └── cors.js               # CORS allowed origins
│   │   │
│   │   ├── models/
│   │   │   ├── JobPosting.model.js   # Job posting schema
│   │   │   └── Candidate.model.js    # Candidate schema
│   │   │
│   │   ├── graphql/
│   │   │   ├── typeDefs.js           # GraphQL type definitions
│   │   │   └── resolvers.js          # Query & mutation resolvers
│   │   │
│   │   ├── routes/
│   │   │   └── copilot.routes.js     # AI copilot REST routes
│   │   │
│   │   ├── controllers/
│   │   │   └── copilot.controller.js # Request handling logic
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js         # Groq AI SDK integration
│   │   │
│   │   ├── seeders/
│   │   │   └── seed.js               # Database seed data
│   │   │
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Global error handling
│   │   │   └── requestLogger.js      # HTTP request logging
│   │   │
│   │   └── app.js                    # Express app assembly
│   │
│   ├── server.js                     # Entry point
│   ├── .env.example                  # Environment template
│   └── package.json
│
├── frontend/                         # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── pages/                    # 16 route-level page components
│   │   ├── components/               # Shared layout & UI components
│   │   ├── context/                  # React context providers
│   │   ├── store/                    # Redux state slices
│   │   ├── stores/                   # Zustand stores
│   │   ├── graphql/                  # GraphQL operations
│   │   ├── lib/                      # Utilities, auth, Apollo client
│   │   ├── types/                    # TypeScript declarations
│   │   ├── App.tsx                   # Route configuration
│   │   ├── providers.tsx             # Provider composition
│   │   └── main.tsx                  # Application entry
│   │
│   ├── vite.config.ts
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (optional — automatically falls back to in-memory storage)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/workflow-hrms.git
cd workflow-hrms
```

**2. Setup Backend**

```bash
cd backend
cp .env.example .env      # Configure your environment variables
npm install
npm start                  # Starts on http://localhost:5000
```

**3. Setup Frontend**

```bash
cd frontend
npm install
npm run dev                # Starts on http://localhost:3000
```

**4. Open the application**

Navigate to `http://localhost:3000` in your browser.

### Demo Credentials

| Role | Email |
|------|-------|
| Employee | `employee@hrms.com` |
| Manager | `manager@hrms.com` |
| HR Specialist | `hr@hrms.com` |
| Admin | `admin@hrms.com` |

> Use any password — authentication is handled via mock data for demonstration purposes.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/workflow_hrms` |
| `GROQ_API_KEY` | Groq API key for AI Copilot | — |
| `NODE_ENV` | Environment mode | `development` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_GRAPHQL_URL` | GraphQL API endpoint | `http://localhost:5000/graphql` |
| `VITE_API_URL` | REST API base URL | `http://localhost:5000` |

---

## API Reference

### GraphQL Endpoint — `/graphql`

**Queries**

```graphql
# Fetch all job postings
query GetAllJobPostings {
  getAllJobPostings {
    data {
      jobPostings {
        jobPostingId
        title
        department
        location
        jobType
        experienceRequired
        salaryRange
        status
        description
        totalCandidates
      }
    }
  }
}

# Fetch all candidates
query GetAllCandidates {
  getAllCandidates {
    data {
      candidates {
        candidateId
        fullName
        appliedRole
        status
        rating
        skills
      }
    }
  }
}
```

**Mutations**

```graphql
# Update candidate pipeline stage
mutation UpdateCandidateStage($request: UpdateCandidateStageRequestInput!) {
  updateCandidateStage(request: $request) {
    data { candidateId }
    success
    message
  }
}
```

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/copilot` | AI HR Copilot chat |
| `GET` | `/health` | Server health check |

**POST `/api/copilot`**

```json
// Request
{
  "messages": [{ "role": "user", "content": "What is my leave balance?" }],
  "userContext": {
    "name": "Sarah Johnson",
    "role": "Employee",
    "department": "Engineering"
  }
}

// Response
{
  "reply": "Here are your leave balances:\n• Casual Leave: 12 days..."
}
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI library |
| **TypeScript** | Static type safety |
| **Vite 8** | Build tooling & HMR dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Apollo Client 4** | GraphQL client |
| **Redux Toolkit** | Global state management |
| **Zustand** | Lightweight UI state |
| **TanStack React Table** | Headless data grids |
| **Lucide React** | SVG icon system |
| **Zod** | Runtime schema validation |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js 18+** | JavaScript runtime |
| **Express 4** | HTTP framework |
| **Apollo Server 4** | GraphQL API gateway |
| **MongoDB + Mongoose** | Database & ODM |
| **Groq SDK** | AI chat completions (LLaMA 3.3 70B) |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `refactor:` — Code refactoring
- `chore:` — Maintenance tasks

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
