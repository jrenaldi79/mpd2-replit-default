# Project Rules & Guidelines (v3)

## Overview

This project is a Next.js 14 application built for the Replit platform. It utilizes TypeScript, Tailwind CSS, the App Router architecture, and the Turbopack bundler. Its primary purpose is to provide a platform for a welcome page and an interactive markdown previewer with live rendering and XSS protection.

### 🔧 Technology Stack
- **Framework**: **Next.js 14.x** with Turbopack (App Router)
- **Language**: TypeScript 5.x with strict mode
- **Styling**: Tailwind CSS 3.4.x with Typography plugin
- **Testing**: Jest, React Testing Library
- **Markdown**: `marked` (rendering), `isomorphic-dompurify` (sanitization)
- **Syntax Highlighting**: `highlight.js` with custom Replit theme
- **Diagrams**: Mermaid 10.x
- **Schema Validation**: Zod
- **Runtime**: Node.js on Replit platform (Port: 5000)

### 📋 Project Context for Agent
1. This is a markdown preview application with real-time rendering.
2. **Security is critical**: All user input must be sanitized and validated.
3. The app uses Replit-style UI conventions (light backgrounds, clean typography).
4. **TDD is mandatory**: Write tests before implementation.
5. All new features must integrate with the existing navigation and architecture.
6. The project uses the **App Router** (not the Pages Router).
7. **Server Components are preferred** over Client Components wherever possible.

### 👤 User Preferences
- **Preferred communication style**: Simple, everyday language.

---

## 🚨 MANDATORY: Test-Driven Development (TDD)

**Every code change MUST start by writing tests.**

### TDD Process - ALWAYS FOLLOW:
1.  **Red Phase**: State: "Following TDD, I'll write the failing tests first." Write tests that define the new functionality and confirm they fail as expected (RED).
2.  **Green Phase**: Write the simplest possible code to make the tests pass. Run tests to confirm they now pass (GREEN).
3.  **Refactor Phase**: Clean up and optimize the implementation and test code without changing external behavior.
4.  **Finalization Phase**: Run the full test suite (`npm test`) and validate test coverage is >90% (`npm run test:coverage`).

### TDD Enforcement Checklist
Before writing ANY implementation code, you MUST:
1.  ✅ **Explicitly state**: "Following TDD - writing tests first."
2.  ✅ **Create the test file** in the appropriate `/tests/` directory.
3.  ✅ **Write failing tests** that define the expected behavior.
4.  ✅ **Run tests and show RED output**, proving they fail correctly.
5.  ✅ **Only then, write implementation code** to make the tests pass.
6.  ✅ **Run tests again and show GREEN output**, proving the feature works.

### When TDD Can Be Relaxed
-   **Documentation**: Changes to `.md` files.
-   **Configuration**: `package.json`, `tsconfig.json`, etc.
-   **Prototyping**: You must explicitly state: "I am creating a prototype... This code is temporary and will be rewritten using TDD."
-   **Emergency Hotfixes**: With tests added immediately after.

---

## 🚀 Common Development Workflows

### Adding a New Feature
**Example: Adding a "Code Editor" feature**
```bash
# Step 1: Write tests first (TDD)
Create: /tests/unit/app/code-editor/page.test.tsx
Create: /tests/integration/code-editor.test.tsx

# Step 2: Implement feature after tests fail
Create: /app/code-editor/page.tsx
Create: /app/code-editor/components/Editor.tsx
Create: /types/code-editor.types.ts

# Step 3: Add navigation
Update: /app/page.tsx (add link to new feature)

# Step 4: Run tests to confirm they pass
npm test
```

### Adding an API Endpoint
**Example: Adding a "save file" endpoint**
```bash
# Step 1: Write API tests first
Create: /tests/unit/app/api/save-file/route.test.ts

# Step 2: Implement endpoint after tests fail
Create: /app/api/save-file/route.ts

# Step 3: Add types if needed
Update: /types/api.types.ts

# Step 4: Run tests to confirm passing
npm test -- tests/unit/app/api/save-file/route.test.ts
```

---

## 📁 System Architecture & Directory Rules

This Next.js application follows a feature-based structure. **ALWAYS follow these conventions.**

```
.
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   ├── [feature]/                # Feature-based routes
│   │   ├── page.tsx, loading.tsx, error.tsx
│   │   └── components/           # Feature-specific components
│   ├── components/               # SHARED components (UI, common)
│   ├── lib/                      # Shared utilities (logger, etc.)
│   └── ...                       # Other root app files
├── tests/                        # ALL TESTS (mirrors app structure)
├── types/                        # Shared TypeScript types
├── public/                       # Static assets
└── [CONFIG FILES]                # Root configuration files
```

### 🔍 Quick Reference
| What I'm Building | Where It Goes | Test Location |
|------------------|---------------|---------------|
| New page | `/app/[name]/page.tsx` | `/tests/unit/app/[name]/` |
| API endpoint | `/app/api/[name]/route.ts` | `/tests/unit/app/api/[name]/` |
| Shared component | `/app/components/[name].tsx` | `/tests/unit/components/` |
| Utility function | `/app/lib/[name].ts` | `/tests/unit/lib/` |
| Type definitions | `/types/[name].types.ts` | N/A |

### ❌ NEVER DO THIS
-   Don't create files outside the defined structure.
-   Don't use the `/pages/` directory.
-   Don't skip TDD.
-   Don't modify `/web-bundles/` (BMad framework files).
-   Don't commit `attached_assets/` to git.
-   Don't create `.env` files for secrets (use Replit Secrets).

---

## 💻 Code Quality & Style
-   **Formatting**: Adhere to existing ESLint and Prettier rules.
-   **Type Safety**: Use TypeScript in `strict` mode. Use `zod` for all data validation.
-   **Imports**: Use path aliases (`@/components/...`) and explicit type imports (`import type { ... }`).
-   **Structure**: Use `function` declarations, not `const` for components. Avoid classes except for Error Boundaries.
-   **Component Structure Order**:
    1.  `useState` / `useReducer` declarations
    2.  Other hooks (`useMemo`, `useCallback`, etc.)
    3.  Function definitions
    4.  `useEffect` hooks
    5.  JSX return statement

---

## ⚛️ React, Frontend & Performance

### Component Patterns & State Management
-   **Composition Over Configuration**: Build components that accept `children` rather than using a multitude of boolean props.
-   **Favor Server Components (RSC)**: Only use `'use client'` when interactivity is essential.
-   **State Colocation**: Keep state as close to where it's used as possible.
-   **Context for Global State**: Use React Context for truly global, infrequently updated state (e.g., theme, user session).

### Performance Optimization
-   **Strategic Memoization**: Do not memoize everything. Use `React.memo`, `useMemo`, and `useCallback` only for specific, measured performance gains.
-   **Lazy Loading & Streaming**: Use `React.lazy()` or `<Suspense>` to code-split heavy components and stream UI from the server.
-   **Optimize Images**: Always use the `next/image` component.

---

## 🌐 API & Data Fetching
-   **API Design**: Use consistent HTTP methods, status codes, and response formats. Implement pagination, filtering, and sorting where appropriate.
-   **Parallel Fetching in RSC**: Fetch data in parallel in Server Components to minimize waterfalls.
-   **Optimistic Updates**: For client-side mutations, update the UI immediately and have a clear rollback mechanism.

---

## ♿ Accessibility (A11y)
-   **Semantic HTML**: Use HTML elements for their intended purpose (`<button>`, `<nav>`).
-   **ARIA Attributes**: Use ARIA attributes to provide context for screen readers.
-   **Focus Management**: Ensure focus is managed logically, especially in modals or drawers.
-   **Keyboard Navigation**: All interactive elements must be fully operable with a keyboard.

---

## 🎭 Error Handling & Resilience
-   **Route-Level Boundaries**: Use Next.js's `error.tsx` file for route-level error handling.
-   **Component-Level Boundaries**: Wrap individual components in a custom `ErrorBoundary` to isolate UI failures. **Note**: `ErrorBoundary` components **must be class components**.

---

## 🔒 Security

### Input Validation & Sanitization
-   **Validate all API inputs with Zod.**
-   **Sanitize rendered HTML**: React escapes content by default. If you must render HTML, **ALWAYS** sanitize it first with `isomorphic-dompurify`.
    ```typescript
    // ✅ SAFE: Sanitize before rendering
    import DOMPurify from 'isomorphic-dompurify';
    const sanitizedHtml = DOMPurify.sanitize(userProvidedHtml);
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    ```

### Secrets Management
-   **Use Replit Secrets**: All API keys, tokens, and sensitive credentials **must** be stored in Replit's encrypted Secrets tool.
-   **`.env.example`**: Commit this file with dummy values as documentation.
-   **`.gitignore`**: Ensure `.env.local` and similar files are ignored.
-   **Startup Validation**: Use a Zod schema to validate `process.env` on application startup to fail fast if secrets are missing.
-   **Pre-commit Hooks**: Use `husky` to scan for accidentally committed secrets.

---

## ✍️ Structured Logging & Observability
**NEVER use `console.log` in application code.**
-   **Logger**: Use the central Winston logger at `/app/lib/logger.ts`.
-   **Correlation ID**: Generate a unique ID for every request using Next.js Middleware.
-   **Log Levels**: Use `error`, `warn`, `info`, and `debug` levels appropriately, with rich metadata.

---

## 🧪 Testing Guidelines
-   **TDD is Mandatory**: Write tests first (Red-Green-Refactor).
-   **Test Behavior, Not Implementation**: Focus tests on the user's perspective.
    ```typescript
    // ✅ GOOD: Test what the user experiences
    test('form submission displays a success message', async () => {
      const user = userEvent.setup();
      render(<MyForm />);
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.click(screen.getByRole('button', { name: /submit/i }));
      expect(await screen.findByText(/thank you, john doe!/i)).toBeInTheDocument();
    });
    ```
-   **Unit Tests**: Focus on business logic and utilities. Mock dependencies and test edge cases.
-   **Integration Tests**: Test full request/response cycles for API endpoints and user flows across multiple components.

---

## 🥅 Response Constraints
-   Do not remove any existing code or comments unless strictly necessary for the requested change.
-   Do not change the formatting of existing code unless it is important for the new functionality.ry.
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