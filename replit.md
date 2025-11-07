# Northwestern MPD2 Starter Template - Project Rules & Guidelines

## Overview

This is a **Next.js 16 starter template** for Northwestern MPD2 master's students, featuring a dual-app architecture:
1. **Document Viewer** (`/markdown-preview`) - A markdown viewer to help students reference BMAD methodology documentation while coding
2. **Shell Main App** (`/`) - A minimal starter application that students will **replace** with their own project ideas

The template provides a production-ready foundation with TypeScript, Tailwind CSS, TDD framework, and the Turbopack bundler pre-configured.

### 🔧 Technology Stack
- **Framework**: **Next.js 16.x** with Turbopack (App Router)
- **Language**: TypeScript 5.x with strict mode
- **Styling**: Tailwind CSS 3.4.x with Typography plugin
- **Testing**: Jest, React Testing Library
- **Markdown**: `marked` (rendering), `isomorphic-dompurify` (sanitization)
- **Syntax Highlighting**: `highlight.js` with custom Replit theme
- **Diagrams**: Mermaid 10.x
- **Schema Validation**: Zod
- **Runtime**: Node.js on Replit platform (Port: 5000)

### 📋 Project Context for Students & AI Agent
1. **This is a STARTER TEMPLATE** - The main app (`/`) is meant to be replaced with student projects
2. **Dual-App Architecture**:
   - Document Viewer (`/markdown-preview`) - Keep this for BMAD methodology reference
   - Main App (`/`) - Replace this "shell" with your unique project idea
3. **Security is critical**: All user input must be sanitized and validated
4. **TDD is mandatory**: Write tests before implementation (80% coverage required)
5. The Document Viewer uses Replit-style UI (light backgrounds, clean typography)
6. Students can style their main app independently - it doesn't affect the document viewer
7. The project uses the **App Router** (not the Pages Router)
8. **Server Components are preferred** over Client Components wherever possible

### 👤 User Preferences
- **Preferred communication style**: Simple, everyday language.

---

## 🚨 MANDATORY: Test-Driven Development (TDD)

**Every code change MUST start by writing tests.**

### TDD Process - ALWAYS FOLLOW:
1.  **Red Phase**: State: "Following TDD, I'll write the failing tests first." Write tests that define the new functionality and confirm they fail as expected (RED).
2.  **Green Phase**: Write the simplest possible code to make the tests pass. Run tests to confirm they now pass (GREEN).
3.  **Refactor Phase**: Clean up and optimize the implementation and test code without changing external behavior.
4.  **Finalization Phase**: Run the full test suite (`npm test`) and validate test coverage is >80% (`npm run test:coverage`).

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

## 🧪 Testing Guide

### Available Test Commands

```bash
# Run all tests (unit + integration)
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/unit/app/api/markdown/route.test.ts

# Run all unit tests only
npm test -- tests/unit/

# Run all integration tests only
npm test -- tests/integration/

# Run tests matching a pattern
npm test -- --testNamePattern="markdown rendering"
```

### When to Run Each Type of Test

#### 🟢 **Unit Tests** (`/tests/unit/`)
**Run these when:**
- Developing a single function, component, or API route
- Testing business logic in isolation
- Testing edge cases and error handling
- You need fast feedback (unit tests are faster)

**What they test:**
- Individual functions and utilities
- Component rendering and props
- API route handlers (mocked dependencies)
- Data validation and transformation logic

**Example workflow:**
```bash
# While developing a new utility function
npm run test:watch -- tests/unit/lib/
```

#### 🔵 **Integration Tests** (`/tests/integration/`)
**Run these when:**
- Testing complete user flows across multiple components
- Validating API endpoints with real request/response cycles
- Testing interactions between different parts of the system
- Before completing a feature

**What they test:**
- Full page interactions (clicking, typing, navigation)
- API endpoints with database interactions
- Multi-component workflows
- State management across components

**Example workflow:**
```bash
# After completing a feature
npm test -- tests/integration/markdown-preview.test.tsx
```

### Test Coverage Requirements

**Minimum coverage threshold: 80%** (enforced by Jest)
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

**Check coverage:**
```bash
npm run test:coverage
```

Coverage report is generated at: `/coverage/lcov-report/index.html`

### Testing Best Practices

#### ✅ DO THIS
```typescript
// ✅ GOOD: Test user behavior, not implementation
test('form submission displays success message', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/thank you, john doe!/i)).toBeInTheDocument();
});

// ✅ GOOD: Test API routes with real HTTP semantics
test('GET /api/markdown returns 400 for missing file param', async () => {
  const { req, res } = createMocks({ method: 'GET' });
  await GET(req);
  expect(res._getStatusCode()).toBe(400);
});
```

#### ❌ DON'T DO THIS
```typescript
// ❌ BAD: Testing implementation details
test('component has useState hook', () => {
  const component = shallow(<MyComponent />);
  expect(component.instance().state.value).toBe('initial');
});

// ❌ BAD: Testing internal state directly
test('handleClick sets clicked to true', () => {
  // Don't test internal state - test what the user sees!
});
```

### Test File Naming & Organization

**Naming convention:**
- `*.test.tsx` - Component tests (React components)
- `*.test.ts` - Logic tests (utilities, API routes, types)

**File location mirrors app structure:**
```
app/api/markdown/route.ts       → tests/unit/app/api/markdown/route.test.ts
app/markdown-preview/page.tsx   → tests/unit/app/markdown-preview/page.test.tsx
                                → tests/integration/markdown-preview.test.tsx
```

### Debugging Failed Tests

**Step 1: Read the error message**
```bash
npm test
# Look for: Expected vs Received, stack traces, line numbers
```

**Step 2: Run the specific failing test in watch mode**
```bash
npm run test:watch -- tests/unit/app/api/markdown/route.test.ts
```

**Step 3: Add console.log or use the debugger**
```typescript
test('my failing test', () => {
  const result = myFunction();
  console.log('Result:', result); // Add temporary logging
  expect(result).toBe(expected);
});
```

**Step 4: Check test setup and mocks**
- Verify mocks are configured correctly
- Check jest.setup.js for global test configuration
- Ensure test environment matches production

### TDD Workflow Reminder

```bash
# 1. Write failing test (RED)
npm test -- tests/unit/app/lib/utils.test.ts
# Expected: FAIL (test should fail)

# 2. Write minimal implementation (GREEN)
# ... edit app/lib/utils.ts ...
npm test -- tests/unit/app/lib/utils.test.ts
# Expected: PASS

# 3. Refactor if needed
# ... improve code quality ...
npm test -- tests/unit/app/lib/utils.test.ts
# Expected: PASS (tests still pass after refactoring)

# 4. Run full suite before committing
npm test
npm run test:coverage
```

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