# Northwestern MPD2 Starter Template

## Overview
This project is a Next.js 16 starter template for Northwestern MPD2 students, featuring a dual-app architecture: a **Document Viewer** (`/markdown-preview`) for BMAD methodology documentation and a **Shell Main App** (`/`) for student project customization. Its purpose is to provide a production-ready foundation with TypeScript, Tailwind CSS, a TDD framework, and Turbopack, accelerating student development by focusing on innovation over setup complexities. The project's ambition is to equip students with a robust, modern development environment that reduces setup overhead and allows them to concentrate on innovative project development.

-   **Your Role**: You are an expert in TypeScript, Node.js, React, Next.js 16, and Tailwind.
-   **Dual-App Architecture**:
    1.  **A Document Viewer (`/markdown-preview`)**: For referencing BMAD methodology documentation. This part of the app is maintained as is.
    2.  **A Shell Main App (`/`)**: A starter structure for students to replace with their own projects. This is where you will build.

## Recent Changes

### November 8, 2024 - Mermaid Diagram Rendering Fix
-   **Issue**: Mermaid diagrams in documentation files (e.g., `.bmad-core/user-guide.md`) were displaying as plain text instead of rendered diagrams.
-   **Root Cause**: 
    1. DOMPurify was stripping `class` attributes (including `language-mermaid`) during HTML sanitization on both server and client side.
    2. Mermaid rendering method (`mermaid.run`) was failing with DOM access errors.
-   **Fix**: 
    -   Updated `app/api/markdown/route.ts` to pass marked.js options (`gfm: true, breaks: true`) and configure DOMPurify to preserve class attributes.
    -   Updated `app/markdown-preview/page.tsx` client-side sanitization to preserve class attributes needed for syntax highlighting and Mermaid rendering.
    -   Changed Mermaid rendering approach from `mermaid.run()` to `mermaid.render()` for more reliable diagram generation.
    -   Created `app/markdown-preview/mermaid-styles.css` with explicit CSS rules to force vertical stacking of diagram containers using `display: block !important`, `width: 100% !important`, and `clear: both !important`.
    -   Added integration test in `tests/integration/markdown-preview.test.tsx` to verify Mermaid class preservation.
-   **Result**: All Mermaid diagrams now render correctly with vertical layout. Test coverage: 90 tests passing, 88.69% statement coverage, 81.06% branch coverage.

## 1. AI Agent Pre-Implementation Checklist

Before writing ANY implementation code, the AI MUST verify:
- [ ] Have I written failing tests that define success?
- [ ] Have I run those tests to confirm they're RED?
- [ ] Can I describe what "passing" looks like in concrete assertions?

If ANY answer is "no" → STOP and write tests first.

## 2. 🚨 THE LAW: Test-Driven Development (TDD) First

**EVERY feature request or code change MUST start by writing tests *before* any implementation. This is the most important rule. There are no exceptions for feature work.**

### TDD Process - ALWAYS FOLLOW:

1.  **Red Phase (REQUIRED FIRST STEP)**:
    -   Your FIRST response to a feature request MUST be: **"Let me start by writing the tests that define what success looks like for this feature."**
    -   Write comprehensive failing tests in the `tests/` directory.
    -   Run tests to confirm they fail (shows "red" in the test runner). This proves the test works.

2.  **Green Phase**:
    -   Implement the **simplest possible code** in the `app/` directory that makes the tests pass.
    -   Run tests to confirm they now pass (shows "green").

3.  **Refactor Phase**:
    -   Clean up and optimize your implementation and test code without changing behavior.
    -   Run tests after each refactor to ensure nothing is broken.

4.  **Finalization Phase**:
    -   Run the full test suite: `npm run test`
    -   Validate test coverage is over 90%: `npm run test:coverage`

### TDD Self-Check Questions
Before writing implementation code, ask yourself:
1.  Have I written tests that will fail without this code?
2.  Have I run those tests and confirmed they are RED?
3.  Can I describe what "passing" looks like in concrete test assertions?
**If the answer to ANY of these is "no", STOP and write the tests first.**

### Correct TDD Pattern:
```
User: "Add streaming tracing support"
Assistant: "Following TDD - I'll write tests first to define what success looks like."
Assistant: *Creates tests/unit/test_streaming_tracing.test.ts*
Assistant: *Runs tests - shows RED (failing)*
Assistant: *NOW creates app/utils/streaming-tracer.ts*
Assistant: *Runs tests again - shows GREEN (passing)*
```

## 3. General Workflow & Verification

-   **Server Validation**: After starting any development server, **ALWAYS** check the server output for warnings, errors, or compilation issues before proceeding.
-   **Library Verification**: Always verify library versions before installation, especially for CSS frameworks.
-   **Initial Connection Tests**: Test authentication and external API connections with simple scripts before building out major features.
-   **Styling Issues**: When encountering styling issues, check CSS framework version compatibility and restart the dev server completely first.

## 4. Project Structure & Naming Conventions

All file paths must conform to this structure.

```
.
├── app/                          # Main application (App Router)
│   ├── components/              # Shared or single-use components
│   │   └── auth-wizard/         # Example: directory for a complex component
│   ├── api/                     # API Route Handlers
│   │   └── users/[id]/posts/    # Example: nested API route
│   │       └── route.ts
│   └── markdown-preview/        # Document viewer app (do not modify)
│
├── tests/                       # All tests live here
│   ├── unit/                    # Unit tests (mirror `app` structure)
│   └── integration/             # Integration tests
│
├── types/                       # Shared TypeScript type definitions
└── ...
```

-   **Directories**: `lowercase-with-dashes` (e.g., `components/auth-wizard`).
-   **Components/Types/Interfaces**: `PascalCase`.
-   **Variables/Functions**: `camelCase`.
-   **Constants**: `UPPER_CASE`.
-   **Test Files**: Match implementation: `app/utils/foo.ts` → `tests/unit/test_foo.test.ts`.

## 5. Front-End & React Best Practices

-   **RSC First**: Favor React Server Components. Minimize `'use client'`, `useEffect`, and `useState`.
-   **Component Structure Order (MANDATORY)**:
    1.  `useState` declarations.
    2.  Computed values (`const isRunning = status === 'RUNNING'`).
    3.  Function definitions (`handle...`, `fetch...`).
    4.  `useEffect` hooks (Ensure all dependencies are declared *before* the `useEffect` call).
    5.  The JSX `return` statement.
-   **File Structure**: Inside a component file, the order should be: exported component, subcomponents, helpers, static content, and finally type definitions. Co-locate props interfaces with their components.
-   **Component Definition**: Use `function`, not `const`, for components.
-   **Performance**: Use `next/dynamic` for non-critical components and `next/image` for optimized images.
-   **Async**: Prefer async/await over raw Promises.

## 6. UI & Styling (Tailwind CSS)

-   **Version**: ALWAYS use Tailwind CSS v3.4.x for stability: `npm install -D tailwindcss@^3.4.0`.
-   **Configuration**: Use traditional PostCSS configuration.
    ```js
    // postcss.config.js
    export default {
      plugins: { tailwindcss: {}, autoprefixer: {} },
    }
    ```
-   **Directives**: Use traditional directives in `app/globals.css`.
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
-   **Best Practices**: Utilize Tailwind utility classes, follow Shadcn UI guidelines, and ensure responsive, mobile-first design.

## 7. API Design & Backend

-   **Logic**: Use Node.js within Next.js Route Handlers for all backend logic.
-   **REST Principles**: Use consistent HTTP methods (`GET`, `POST`, `PUT`/`PATCH`, `DELETE`) and proper status codes (2xx, 4xx, 5xx).
-   **Standardized Responses**: Use a consistent response format (e.g., `{ data, metadata, error }`).
-   **Features**: Implement standardized pagination, filtering, and sorting via query parameters.
-   **Validation**: Implement input validation for all API endpoints using **Zod**.

## 8. TypeScript Best Practices

-   **Strict Mode**: Always use TypeScript in strict mode.
-   **Path Aliases**: Use `@/components/...` for clean, maintainable imports.
-   **Type Imports**: Use explicit `type` imports: `import type { MyType } from '@/types/index'`.
-   **Import Order**: Use consistent import ordering and structure, managed by the linter.
-   **Barrel Files**: Prefer explicit file paths (`../types/index`) over barrel file directories (`../types`) to improve tree-shaking.

## 9. Testing & Quality

-   **TDD is Law**: See Section 2.
-   **Performance**: Prefer running single tests for speed during development, and run the whole suite after completing medium-sized tasks.
-   **Unit Tests**: Focus on critical functionality. Mock dependencies until they are built. Test all data scenarios (valid, invalid, edge cases).
-   **Component Tests**: Use React Testing Library to test user interactions. Test component behavior with different props, states, loading, and error conditions.
-   **Integration Tests**: Test API endpoints for the full request/response cycle.
-   **Code Quality Tools**: Use ESLint and Prettier. Implement pre-commit hooks to run linting and basic tests.

## 10. Database (Supabase)

-   **Interaction**: Use the Supabase SDK for all data fetching and querying.
-   **Security**: Use Row Level Security (RLS) policies in Supabase for all data access control.
-   **Schema**: Create data models using Supabase's schema builder.
-   **Type Safety**: Use TypeScript for type safety when interacting with Supabase.

## 11. Logging, Monitoring & Error Handling

-   **Global Logging**: Every function must have appropriate logging using **Winston**. Avoid `console.log`.
-   **Structured Logging**: Implement structured logs with consistent levels (error, warn, info, debug) and correlation IDs.
-   **Monitoring**: Implement health check endpoints (`/api/health`) for services.
-   **Error Handling**:
    -   Use Next.js `error.js` for boundaries and React Error Boundaries for granularity.
    -   Implement retry logic for network requests.
    -   Gracefully handle `loading.js`, error, and empty states in all UI components.
    -   Validate and sanitize all inputs at API boundaries.

## 12. Security Best Practices

-   **Authentication**: Implement proper authentication and authorization using Supabase. Validate JWTs and handle expiration.
-   **Data Access**: Adhere to the principle of least privilege via RLS policies.
-   **Input Sanitization**: Sanitize all user inputs to prevent XSS and injection attacks.
-   **API Security**: Configure CORS policies and implement rate limiting on API endpoints.
-   **Secrets**: Store all sensitive configuration in environment variables. **Never commit secrets to code.**

## 13. Your Response Constraints

-   **Communication Style**: Simple, everyday language.
-   **Code Modification**: Do not remove existing code, comments, or commented-out code unless necessary. Do not change formatting unless important for new functionality.

## 14. Maintenance Guidelines

Update this rules file when:
-   Adding new major dependencies or architectural patterns.
-   Modifying directory structure or environment variables.
-   Changing API response formats or testing patterns.