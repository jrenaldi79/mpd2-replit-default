# Project Rules & Guidelines

## Overview

This project is a Next.js 16 application built for the Replit platform. It utilizes TypeScript, Tailwind CSS, the App Router architecture, and the Turbopack bundler. Its primary purpose is to provide a platform for a welcome page and an interactive markdown previewer with live rendering and XSS protection.

The project strictly adheres to a Test-Driven Development (TDD) methodology and incorporates the BMad Method framework for AI-driven agile development.

## User Preferences

- **Preferred communication style**: Simple, everyday language.

---

## 🚨 MANDATORY: Test-Driven Development (TDD) First

**EVERY feature request MUST start with writing tests before any implementation.**

When receiving ANY feature request, your FIRST response should be:
1. "Let me start by writing the tests that define what success looks like for this feature."
2. Write comprehensive failing tests using the Red-Green-Refactor cycle.
3. Only then proceed with implementation to make tests pass.

### TDD Process - ALWAYS FOLLOW:

1.  **Red Phase** (REQUIRED FIRST STEP):
    -   Write failing tests for the functionality you want to implement.
    -   Run tests to confirm they fail (shows "red" in test runner). This validates that your test actually tests something.

2.  **Green Phase**:
    -   Implement the simplest code that makes the test pass.
    -   Focus on making it work, not making it optimal.
    -   Run tests to confirm they now pass (shows "green").

3.  **Refactor Phase**:
    -   Clean up and optimize your implementation without changing behavior.
    -   Run tests after each refactor to ensure nothing is broken.
    -   Improve both implementation code AND test code.

4.  **Finalization Phase**:
    -   Run the full test suite: `npm run test`
    -   Validate test coverage >90%: `npm run test:coverage`

**⚠️ If you start implementing before writing tests, STOP and write tests first.**

### TDD Enforcement Checklist

**Before writing ANY implementation code, you MUST:**

1.  ✅ **Explicitly state**: "Following TDD - writing tests first."
2.  ✅ **Create a test file** in the appropriate `tests/` directory.
3.  ✅ **Write failing tests** that define expected behavior.
4.  ✅ **Run tests and show RED output** proving tests fail.
5.  ✅ **Only then write implementation code.**
6.  ✅ **Run tests again and show GREEN output** proving tests pass.

### When TDD Can Be Skipped

TDD may be relaxed ONLY for:
-   Documentation-only changes (`*.md` files)
-   Configuration files (`package.json`, `tsconfig.json`)
-   Simple refactoring with existing test coverage
-   Emergency hotfixes (with tests added immediately after)

**All other code changes require tests first.**

---

## Project Structure

This Next.js application follows a modern monorepo structure with all code organized in the `app` directory using the App Router pattern.

```
├── app/                          # Next.js App Router directory
│   ├── api/                      # API Route Handlers
│   │   ├── files/                # File discovery API
│   │   │   └── route.ts         # GET endpoint for markdown file tree
│   │   └── markdown/             # Markdown rendering API
│   │       └── route.ts         # GET endpoint for markdown content
│   ├── markdown-preview/         # Markdown preview feature
│   │   ├── page.tsx             # Main preview page (Client Component)
│   │   └── FileTree.tsx         # File tree navigation component
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page (Server Component)
│
├── tests/                        # Test suite organized by test type
│   ├── integration/              # Integration tests
│   │   └── markdown-preview.test.tsx
│   └── unit/                     # Unit tests
│       └── app/
│           ├── api/
│           │   ├── files.test.ts
│           │   └── markdown.test.ts
│           └── page.test.tsx
│
├── types/                        # Shared TypeScript type definitions
│   └── index.ts
│
├── web-bundles/                  # BMad Method framework resources
│   ├── agents/                   # AI agent definitions
│   ├── expansion-packs/          # Domain-specific extensions
│   └── teams/                    # Team configuration templates
│
├── attached_assets/              # User-uploaded files and screenshots
│
├── jest.config.js               # Jest test configuration
├── jest.setup.js                # Jest setup and global test utilities
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

### Key Features

#### 1. Main Application (Port 5000)
- **Home Page**: Welcome screen with gradient background and navigation links
- **Purpose**: Entry point to the application with links to all features
- **Type**: React Server Component for optimal performance

#### 2. Markdown Preview System
- **Interactive File Browser**: Sidebar with expandable folder tree structure
- **Live Rendering**: Real-time markdown to HTML conversion with sanitization
- **Mermaid Diagrams**: Full support for Mermaid diagram rendering
- **Security**: Path traversal protection and XSS prevention via DOMPurify
- **Styling**: Replit-inspired markdown rendering with light code blocks and clean typography

#### 3. API Endpoints

**GET /api/files**
- Recursively scans project for markdown files
- Excludes sensitive directories (`node_modules`, `.git`, `.cache`, `.next`)
- Returns hierarchical file tree structure
- Sorts folders before files, alphabetically within each category

**GET /api/markdown?file={path}**
- Reads and renders specified markdown file
- Converts markdown to HTML using `marked` library
- Sanitizes HTML on server-side using `isomorphic-dompurify`
- Validates file paths to prevent directory traversal attacks
- Returns: `{ content, html, file }` JSON response

### Security Features

- **Path Traversal Protection**: Validates all file paths against project root
- **XSS Prevention**: Server-side HTML sanitization using DOMPurify
- **File Type Validation**: Only allows `.md` files
- **CORS Configuration**: Properly configured for Replit environment

### Styling Approach

- **Tailwind CSS v3.4.x**: Utility-first CSS framework
- **Typography Plugin**: `@tailwindcss/typography` for markdown prose styling
- **Replit-Inspired Design**: 
  - Light gray code blocks (`bg-gray-100`) with dark text
  - Red inline code (`text-red-700`)
  - Bold black headings for strong hierarchy
  - Clean, minimal aesthetic matching Replit's markdown rendering

---

## System Architecture

The application is built on **Next.js 16** with the stable **Turbopack** bundler, leveraging the **App Router** for modern React Server Components. **TypeScript** ensures type safety, and **Tailwind CSS v3.4.x** is used for utility-first styling. **Jest** with **React Testing Library** facilitates our TDD approach. The server-side logic uses Node.js within Next.js Route Handlers.

-   **Port Configuration**: The application is configured to run on **Port 5000** for seamless Replit webview integration.

### UI/UX Decisions:
-   **Home Page**: A Server Component with a Tailwind CSS gradient background and responsive design, providing navigation links.
-   **Markdown Preview**: A Client Component featuring an interactive sidebar for markdown file selection and a sanitized markdown renderer with Replit-style typography.
-   **Responsive Design**: Achieved through Tailwind CSS utility classes.

### Technical Implementations:
-   **File System API**: A Route Handler (`/api/files`) recursively scans for markdown files, excluding sensitive directories, and returns a structured tree of relative paths sorted by folder/file type and name.
-   **Markdown Rendering API**: A Route Handler (`/api/markdown`) fetches and renders markdown content, applying server-side sanitization and validating file paths to prevent directory traversal.
-   **Mermaid Integration**: Client-side Mermaid initialization and rendering of diagram code blocks within markdown content.

---

## External Dependencies

### NPM Packages:
-   **Core Framework**: `next` (v16.x), `react` (v19.2.0), `react-dom` (v19.2.0), `typescript` (v5.x)
-   **Styling**: `tailwindcss` (v3.4.x), `autoprefixer`, `postcss`
-   **Testing**: `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-environment-jsdom`
-   **Logging**: `winston`
-   **Security & Utilities**: `marked` (v16.4.1), `isomorphic-dompurify`
-   **Type Definitions**: `@types/node`, `@types/react`, `@types/react-dom`, `@types/jest`

### Runtime Environment:
-   **Node.js**
-   **Replit Platform**

### Databases:
-   **Supabase**: Preferred database provider. Use the Supabase SDK for all data interactions.

---

## Workflow & Maintenance

-   **FIRST PRIORITY**: Follow the mandatory TDD process.
-   **Test File Naming**: Match implementation files: `src/utils/foo.ts` → `tests/unit/test_foo.test.ts`.
-   **Linting**: Always use appropriate linting to check for errors (Next.js has this built-in).
-   **Dev Server Validation**: After starting any development server, ALWAYS check the server output for warnings or errors and address them immediately.
-   **Maintenance**: Update this file when adding major dependencies, changing architecture, or modifying core patterns.

## Error Handling & Resilience
-   Implement comprehensive error handling at all levels (API, component, utility).
-   Use Next.js App Router's `error.js` and `loading.js` files.
-   Create standardized error response formats for APIs.
-   Implement retry logic for network requests.
-   Validate and sanitize all inputs at API boundaries.

## Security Best Practices
-   Implement proper authentication and authorization with Supabase.
-   Use Row Level Security (RLS) policies in Supabase for data access control.
-   Sanitize all user inputs to prevent XSS attacks (using `isomorphic-dompurify`).
-   Configure CORS policies appropriately for API Route Handlers.
-   Implement rate limiting on API endpoints.
-   Store sensitive configuration in environment variables.
-   Validate JWT tokens and handle expiration gracefully.

## Secrets Management

**NEVER commit secrets to version control.** Use Replit's native secrets management and follow these best practices:

### Replit Secrets Tool
-   **Use Replit's Secrets Workspace Tool**: All API keys, tokens, and sensitive credentials should be stored in Replit's encrypted Secrets tool, not in `.env` files committed to the repository.
-   **App Secrets**: Specific to this Replit App, managed in the `App Secrets` tab.
-   **Account Secrets**: Shareable across all your Replit Apps, managed in the `Account Secrets` tab.
-   **Access in Code**: Use standard environment variable methods:
    ```typescript
    // Next.js / Node.js
    const apiKey = process.env.MY_API_KEY
    ```

### Environment File Hierarchy
-   **`.env.local`**: Development-only values, **gitignored**, never committed.
-   **`.env.example`**: Template with dummy/placeholder values, **committed** to repository as documentation.
-   **Replit Secrets**: Production values, managed through Replit's encrypted Secrets tool.
-   **Predefined Variables**: Replit automatically provides `REPLIT_DOMAINS`, `REPLIT_USER`, `REPLIT_DEPLOYMENT`, `REPLIT_DEV_DOMAIN`.

### Secret Protection
-   **Pre-commit Hooks**: Use tools like `git-secrets` or `husky` to scan for accidentally committed API keys, tokens, or passwords.
-   **Code Review**: Always review PRs for hardcoded secrets before merging.
-   **`.gitignore`**: Ensure `.env.local`, `.env.development.local`, and similar files are in `.gitignore`.

### Environment Variable Validation
-   **Use Zod Schemas**: Validate all required environment variables at application startup to fail fast if configuration is missing.
    ```typescript
    import { z } from 'zod'
    
    const envSchema = z.object({
      DATABASE_URL: z.string().url(),
      API_KEY: z.string().min(1),
      NODE_ENV: z.enum(['development', 'production', 'test']),
    })
    
    const env = envSchema.parse(process.env)
    ```
-   **Startup Validation**: Add validation logic in `app/layout.tsx` or a dedicated config file to ensure critical secrets are present before the app starts.

### Secret Rotation
-   **Document Rotation Schedule**: Maintain a schedule for rotating API keys and tokens (e.g., every 90 days).
-   **Emergency Rotation**: Have a process to immediately rotate secrets if they're accidentally exposed.
-   **Audit Trail**: Document when secrets were last rotated in team documentation or project management tools.

### Database & Integration Secrets
-   **Auto-Generated**: When using Replit's PostgreSQL database or object storage, credentials like `DATABASE_URL`, `PGHOST`, `PGUSER`, `PGPASSWORD` are automatically created as secrets.
-   **Supabase**: Store `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Replit Secrets, never in code.

## Testing Guidelines
-   **Unit Tests**:
    -   Focus on critical functionality (business logic, utility functions).
    -   Mock dependencies (API calls, external modules) until they are built.
    -   Test various data scenarios (valid, invalid, edge cases).
    -   Place unit tests in their own directory.
-   **Integration & Component Tests**:
    -   Create integration tests for API endpoints (full request/response cycle).
    -   Use React Testing Library for component testing, focusing on user interactions.
    -   Test component behavior with different props, states, and error/loading states.

## Code Quality & Style
-   **Formatting**: Use ESLint and Prettier for consistent code formatting.
-   **Type Safety**: Use TypeScript in strict mode.
-   **Structure**:
    -   Write concise, technical code. Use functional and declarative patterns; avoid classes.
    -   Co-locate backend (Route Handlers) and frontend (pages, components) logic within the `app` directory.
    -   File Structure Order: exported component, subcomponents, helpers, static content, types.
    -   Place shared types in a `types` directory.
-   **Imports**:
    -   Use path aliases (`@/components/...`).
    -   Use explicit `type` imports: `import type { MyType } from '@/types/index'`.
-   **Naming Conventions**:
    -   `PascalCase` for types and components.
    -   `camelCase` for variables and functions.
    -   `UPPER_CASE` for constants.

## React & Frontend Development
-   **Favor React Server Components (RSC)**. Minimize the use of `'use client'`, `useEffect`, and `useState`.
-   Use `function`, not `const`, for components.
-   Use a mobile-first approach for responsive design.
-   Use Zod for form validation.
-   Optimize images using `next/image`.
-   **Component Structure Order**:
    1.  `useState` declarations
    2.  Computed values (`const isRunning = status === 'RUNNING'`)
    3.  Function definitions
    4.  `useEffect` hooks
    5.  JSX return

## UI and Styling (Tailwind CSS)
-   Utilize Tailwind CSS utility classes for all styling.
-   Follow Shadcn UI component guidelines and best practices.
-   **ALWAYS use Tailwind CSS v3.4.x**: `npm install -D tailwindcss@^3.4.0`.
-   Use traditional PostCSS configuration and `@tailwind` directives.
-   If styles aren't loading, restart the dev server completely.

## API Design
-   Use consistent HTTP methods in Route Handlers (GET, POST, PUT/PATCH, DELETE).
-   Implement standardized pagination, filtering, and sorting.
-   Use consistent response formats and proper status codes.
-   Implement health check endpoints for services.

---

## Structured Logging & Observability

We use an enterprise-grade structured logging approach for production-ready observability. **NEVER use `console.log` in application code.**

### Core Components
1.  **Centralized Logger Utility**: All logging should go through a central Winston-based logger utility, located at `src/utils/logger.ts`.
2.  **Correlation ID Tracking**: Every incoming request must be assigned a unique correlation ID (e.g., via middleware). This ID **must** be included in every log entry related to that request to enable end-to-end distributed tracing.
3.  **Environment-Driven Configuration**: Logging behavior is controlled via environment variables, not code changes.

### Environment Configuration
```bash
# .env.local
LOG_LEVEL=info      # Winston log levels: error, warn, info, debug
LOG_FORMAT=simple   # 'json' for production, 'simple' for development console output
```

### Logging Best Practices
-   **NEVER use `console.log()`**. Always use the centralized `Logger` methods.
-   **Always include the `correlationId`** in log calls when it's available from the request context.
-   **Use appropriate log levels**:
    -   `Logger.error()`: For application errors, unexpected failures, and exceptions. Must include error object and stack trace.
    -   `Logger.warn()`: For recoverable issues or potential problems that don't crash the app (e.g., API retries, bad user input).
    -   `Logger.info()`: For important lifecycle events (server start, API request/response, significant user actions).
    -   `Logger.debug()`: For detailed, verbose information useful only during development.
-   **Include Rich Metadata**: Pass a structured `meta` object to your log calls. This makes logs searchable and provides context (e.g., `{ userId: '123', file: 'example.md' }`).
-   **Log API Requests**: Automatically log all API requests and their responses, including status code, timing, and correlation ID.
-   **Consider Specialized Loggers**: For highly critical or complex domains (e.g., security events, file parsing), consider creating specialized methods in the logger utility to ensure consistent and detailed logging for that domain.

---

## Database (Supabase)
-   Use the Supabase SDK for all data fetching and querying.
-   Use Supabase's schema builder for data model creation.
-   Use TypeScript for type safety when interacting with Supabase.
-   Enforce data access control with Row Level Security (RLS).

## Response Constraints
-   Do not remove any existing code or comments unless necessary.
-   Do not change the formatting of existing code unless important for new functionality.