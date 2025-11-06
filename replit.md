# Overview

This project contains **two separate Node.js applications** running on different ports:

1. **Main App** (Port 5000) - Primary application with structured Node.js architecture
2. **Markdown Preview Server** (Port 3000) - Utility for previewing markdown files with Mermaid diagrams

The project also contains the **BMad Method framework** in the `.bmad-core` directory, which is an AI-driven agile development methodology system with specialized agent personas for different development roles.

# User Preferences

Preferred communication style: Simple, everyday language.

# Project Structure

```
├── main-app/              # Main application (Port 5000)
│   ├── src/               # Application source code
│   │   └── app.js        # Main Express server
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Custom middleware functions
│   ├── config/           # Configuration files
│   ├── public/           # Static assets (HTML, CSS, JS, images)
│   ├── package.json      # App-specific dependencies
│   └── README.md         # App documentation
│
├── markdown-preview/      # Markdown preview utility (Port 3000)
│   ├── server.js         # Express server with markdown rendering
│   ├── public/           # Frontend static files
│   │   └── index.html   # Markdown viewer UI
│   └── README.md         # Preview documentation
│
├── .bmad-core/           # BMad Method Framework
│   └── ...               # AI-driven development methodology
│
├── package.json          # Root-level shared dependencies
└── README.md             # Project overview
```

# System Architecture

## Main App (Port 5000)

**Purpose**: Primary application for user-facing functionality

**Architecture Pattern**: Traditional Express.js MVC structure ready for scaling

**Directory Organization**:
- **src/**: Application source code and main server file
- **routes/**: Modular route handlers (organized by feature/resource)
- **middleware/**: Custom middleware for authentication, validation, logging, etc.
- **config/**: Environment-specific configuration
- **public/**: Static assets served directly to clients

**Current State**: Hello World implementation demonstrating the basic setup

**Technology Stack**:
- Node.js with Express.js 5.x
- Organized for future expansion with database, authentication, APIs, etc.

## Markdown Preview Server (Port 3000)

**Purpose**: Developer utility for previewing markdown files with Mermaid diagram support

**Problem Solved**: Developers need a quick way to preview markdown files with Mermaid diagrams without leaving their development environment or installing additional tools.

**Architecture Pattern**: Simple client-server architecture with file-based markdown storage

**Technology Stack**:
- **Backend**: Node.js with Express.js 5.x
- **Markdown Parsing**: `marked` library (v16.4.1)
- **Diagram Rendering**: Mermaid.js (v10, loaded from CDN)
- **Frontend**: Vanilla JavaScript with ES modules

### Markdown Preview Components

**Backend (markdown-preview/server.js)**

**File Discovery System**:
- Recursive filesystem traversal starting from project root
- Searches entire project for `.md` files
- Excludes specific directories: `node_modules`, `.git`, `.cache`, `.config`, `.npm`
- Maintains in-memory cache of discovered files
- Searches from project root (parent of markdown-preview directory)

**Security Measures**:
- Whitelist-based file access (only discovered markdown files)
- Defense-in-depth path validation:
  - Resolve all paths to absolute for normalization
  - Validate using path.relative() to detect escape attempts
  - Cross-check against whitelist cache
  - Returns relative paths to avoid leaking filesystem structure
  - Rejects any paths attempting to escape project root

**API Endpoints**:
- `GET /api/files` - Returns list of all markdown files (relative paths from project root)
- `GET /api/markdown?file={path}` - Returns rendered HTML for specific file with security validation

**Frontend (markdown-preview/public/index.html)**

**UI Structure**:
- Fixed sidebar (300px) with file list navigation
- Main content area for rendered markdown
- Responsive styling with modern font stack

**Rendering Flow**:
1. Fetch file list on page load
2. User clicks file in sidebar
3. Fetch markdown content via API
4. Parse markdown with `marked`
5. Initialize Mermaid and render diagrams
6. Display in main content area

**Mermaid Integration**:
- Loaded as ES module from jsdelivr CDN
- Initialized with default theme
- Manual rendering trigger after markdown insertion
- Handles code blocks with `mermaid` language tag

### Design Decisions

**Multi-Application Structure**:
- **Chosen**: Separate directories for main app and utilities
- **Rationale**: Clean separation of concerns, independent scaling, easier maintenance
- **Implementation**: Each app has its own directory, README, and can have its own dependencies

**File Discovery Scope**:
- **Chosen**: Scan entire project root, not just markdown-preview directory
- **Rationale**: Users want to preview all markdown files in project (including .bmad-core, docs, etc.)
- **Implementation**: Server runs from markdown-preview/ but scans parent directory

**Port Allocation**:
- **Port 5000**: Main app (webview default in Replit)
- **Port 3000**: Markdown preview (accessible via Replit Ports panel)
- **Rationale**: Port 5000 as default preview keeps main app front and center

# External Dependencies

## NPM Packages (Shared)

- **express** (v5.1.0) - Web server framework for both applications
- **marked** (v16.4.1) - Markdown parsing library for markdown preview
- **@types/node** (v22.13.11) - TypeScript type definitions for Node.js APIs

## CDN Resources

- **Mermaid.js** (v10) - Diagram rendering library loaded from jsdelivr CDN
  - Source: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`
  - Used for rendering diagrams in markdown code blocks

## Runtime Environment

- **Node.js** - JavaScript runtime (uses modern ES features)
- **Replit Platform** - Configured for dual-app deployment:
  - Main app: Port 5000 (webview)
  - Markdown preview: Port 3000 (console/background)

## Workflows

Two Replit workflows configured:

1. **main-app**: 
   - Command: `node main-app/src/app.js`
   - Port: 5000
   - Output: webview (default preview)

2. **markdown-preview**:
   - Command: `node markdown-preview/server.js`
   - Port: 3000
   - Output: console (accessible via Ports panel)

# Development Notes

## Accessing Applications

**Main App**: 
- Automatically visible in Replit webview (default)
- URL: Main Replit preview URL

**Markdown Preview**:
- Access via Replit Ports panel → Click port 3000
- Or append `:3000` to Replit URL in new tab

## Adding Features to Main App

The main app is structured for easy expansion:
- Add routes in `main-app/routes/`
- Add middleware in `main-app/middleware/`
- Add config in `main-app/config/`
- Add static assets in `main-app/public/`


# Project Rules

#You are an expert in TypeScript, Node.js, React, Next.js, and Tailwind. We are using the **Next.js 15** stack, with a focus on the **App Router** and **Turbopack** for development and production builds. Use Node.js for backend logic within Next.js Route Handlers. If needed, Supabase is our preferred database provider.

## 🚨 MANDATORY: Test-Driven Development (TDD) First

**EVERY feature request MUST start with writing tests before any implementation.**

When receiving ANY feature request, your FIRST response should be:
1. "Let me start by writing the tests that define what success looks like for this feature"
2. Write comprehensive failing tests using the Red-Green-Refactor cycle
3. Only then proceed with implementation to make tests pass

**TDD Process - ALWAYS FOLLOW:**

1. **Red Phase** (REQUIRED FIRST STEP):
   - Write failing tests for the functionality you want to implement
   - Run tests to confirm they fail (shows "red" in test runner)
   - This validates that your test actually tests something

2. **Green Phase**:
   - Implement the simplest code that makes the test pass
   - Focus on making it work, not making it optimal
   - Run tests to confirm they now pass (shows "green")

3. **Refactor Phase**:
   - Clean up and optimize your implementation without changing behavior
   - Run tests after each refactor to ensure nothing is broken
   - Improve both implementation code AND test code

4. **Finalization Phase**:
   - Run full test suite: `npm run test`
   - Validate test coverage >90%: `npm run test:coverage`

**⚠️ If you start implementing before writing tests, STOP and write tests first.**

## 🚨 TDD Enforcement Checklist

**Before writing ANY implementation code, Claude MUST:**

1. ✅ **Explicitly state**: "Following TDD - writing tests first"
2. ✅ **Create test file** in appropriate `tests/` directory
3. ✅ **Write failing tests** that define expected behavior
4. ✅ **Run tests and show RED output** proving tests fail
5. ✅ **Only then write implementation**
6. ✅ **Run tests again and show GREEN output** proving tests pass

**Red Flags - STOP immediately if:**
- ❌ Creating files in `src/` before creating tests
- ❌ Using `Write` tool for implementation before tests exist
- ❌ Planning describes implementation details before test strategy
- ❌ User asks for feature and you immediately start coding

**Correct TDD Pattern:**
```
User: "Add streaming tracing support"
Assistant: "Following TDD - I'll write tests first to define what success looks like"
Assistant: *Creates tests/unit/test_streaming_tracing.test.ts*
Assistant: *Runs tests - shows RED (failing)*
Assistant: *Now creates src/utils/streaming-tracer.ts*
Assistant: *Runs tests - shows GREEN (passing)*
```

**Incorrect Pattern (DO NOT DO THIS):**
```
User: "Add streaming tracing support"
Assistant: *Immediately creates src/utils/streaming-tracer.ts*
Assistant: *Then writes tests afterward*
```

## TDD Self-Check Questions

Before writing implementation, ask yourself:
1. Have I written tests that will fail without this code?
2. Have I run those tests and confirmed they're RED?
3. Can I describe what "passing" looks like in concrete test assertions?

If the answer to ANY of these is "no", STOP and write tests first.

## When TDD Can Be Skipped

TDD may be relaxed ONLY for:
- Documentation-only changes (*.md files)
- Configuration files (package.json, tsconfig.json)
- Simple refactoring with existing test coverage
- Emergency hotfixes (with tests added immediately after)

**All other code changes require tests first.**


## Workflow
- **FIRST PRIORITY**: Follow the mandatory TDD process above - always write tests before implementation.
- **TDD Verification**: Before using Write/Edit tools on src/, verify tests exist and are RED
- **Test File Naming**: Match implementation files: `src/utils/foo.ts` → `tests/unit/test_foo.test.ts`
- Always use appropriate linting to check for errors in code formatting and syntax (Next.js has this built-in).
- **Development Server Validation**: After starting any development server, ALWAYS check the server output for warnings, errors, or compilation issues. Use BashOutput tool to monitor server logs and address any issues before proceeding with development.
- Test authentication and external API connections with simple scripts before building features.
- When encountering styling issues, check CSS framework version compatibility first.

## Maintenance Guidelines

Update this file when:

- [ ] Adding new major dependencies
- [ ] Changing architectural patterns
- [ ] Modifying directory structure
- [ ] Adding new environment variables
- [ ] Changing API response formats
- [ ] Implementing new testing patterns
- [ ] Discovering performance bottlenecks
- [ ] Making security changes

## Error Handling & Resilience
- Implement comprehensive error handling patterns at all levels (API, component, utility functions).
- Use Next.js App Router's `error.js` files for component-level error catching and React Error Boundaries for more granular control.
- Create standardized error response formats for APIs with consistent status codes and messages.
- Implement retry logic for network requests and external API calls.
- Handle loading states (`loading.js`), error states (`error.js`), and empty states in UI components.
- Use proper error logging with contextual information for debugging.
- Implement graceful degradation for non-critical features.
- Validate and sanitize all inputs at API boundaries.

## Security Best Practices
- Implement proper authentication and authorization patterns with Supabase.
- Use Row Level Security (RLS) policies in Supabase for data access control.
- Sanitize all user inputs to prevent XSS and injection attacks.
- Configure CORS policies appropriately for API Route Handlers.
- Implement rate limiting on API endpoints to prevent abuse.
- Store sensitive configuration in environment variables, never in code.
- Use HTTPS for all production communications.
- Validate JWT tokens and handle token expiration gracefully.
- Follow the principle of least privilege for database access and API permissions.

## Unit Testing Focus
- Prefer running single tests, and not the whole test suite, for performance.
- Run unit tests after completing medium-sized tasks so we find bugs while we build.
- Create unit tests that focus on critical functionality (business logic, utility functions).
- Mock dependencies (API calls, external modules) until they are built; once they are built, then swap to use the real API calls or modules.
- Test various data scenarios (valid inputs, invalid inputs, edge cases).
- Write maintainable tests with descriptive names grouped in describe blocks.
- Unit tests should be easily runnable via the configured test runner (e.g., Jest, Vitest).
- Unit tests should be placed in their own directory.

## Integration & Component Testing
- Create integration tests for API endpoints that test the full request/response cycle.
- Use React Testing Library for component testing, focusing on user interactions.
- Test component behavior with different props and state combinations.
- Mock external dependencies (APIs, third-party libraries) in component tests.
- Test error states and loading states in components.
- Use test data factories for consistent test data generation.
- Test API contract compliance between frontend and backend.

## Code Quality Tools
- Use ESLint and Prettier for consistent code formatting - let tooling suggest appropriate configurations. Next.js has built-in support.
- Implement pre-commit hooks to run linting and basic tests.
- Use TypeScript in strict mode for maximum type safety.
- Set up automated quality checks in the development workflow.
- Use consistent import ordering and structure.

## Best Practices
- Follow RESTful API design principles and best practices for Route Handlers.
- Implement input validation for API endpoints.
- Implement global logging of functions so we can set various debug levels in an environment variable and not have to go back and add logging manually to code blocks in order to debug. Every function should have appropriate logging to help with our unit tests. Logs should be available to the backend so you can access them via terminal. Avoid console logs where possible.
- Apply best practices for logging, project structure, and environment variable usage.

## API Design Details
- Use consistent HTTP methods in Route Handlers: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal.
- Implement standardized pagination using limit/offset or cursor-based patterns.
- Provide filtering and sorting capabilities with query parameters.
- Use consistent response formats with data, metadata, and error information.
- Implement proper status codes (200, 201, 400, 401, 403, 404, 422, 500).
- Use middleware for request/response validation.
- Design APIs to be idempotent where appropriate.
- Use nested routes for related data (e.g., `/api/users/[id]/posts`).

## Monitoring & Observability (Must-Haves)
- Implement structured logging with consistent log levels (error, warn, info, debug).
- Log all API requests and responses with timing information.
- Set up error tracking to capture and alert on application errors.
- Monitor critical application metrics (response times, error rates).
- Use correlation IDs to track requests across services.
- Implement health check endpoints for services.

## Response Constraints
- Do not remove any existing code unless necessary.
- Do not remove my comments or commented-out code unless necessary.
- Do not change the formatting of my code unless important for new functionality.

## Code Style and Structure
- Write concise, technical code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Co-locate backend (Route Handlers) and frontend (pages, components) logic within the Next.js `app` directory structure.
- Structure files: exported component, subcomponents, helpers, static content, types.
- Place shared types in a `types` directory.
- Co-locate component props with their components.
- Write clear and concise comments, focusing on why rather than what.
- Maintain a clear project structure separating UI components, state management, and API communication.

## TypeScript Import/Export Best Practices
- Use path aliases (`@/components/...`) for clean, maintainable imports.
- Use explicit `type` imports for TypeScript types: `import type { MyType } from '@/types/index'`.
- Use explicit file paths for type imports: `../types/index` instead of `../types`.
- When encountering module resolution errors, check import syntax, file extensions, and `tsconfig.json` paths.
- Prefer explicit imports over barrel exports in complex projects to improve tree-shaking.

## Naming Conventions
- Use meaningful and descriptive names for variables, functions, and components.
- Use PascalCase for type names and interfaces.
- Use camelCase for variables and functions.
- Use UPPER_CASE for constants.
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`).
- Use descriptive names with auxiliary verbs (e.g., `isLoading`, `hasError`).

## Front End Guidance
- **Favor React Server Components (RSC)**. Minimize the use of `'use client'`, `useEffect`, and `useState`.
- Use functional components and TypeScript interfaces.
- Use curly braces for all conditionals. Favor simplicity over cleverness.
- Avoid enums; use maps instead.
- Use `function`, not `const`, for components.
- Use a mobile-first approach for responsive design.
- Place static content and interfaces at the end of the file.
- Use content variables for static content outside render functions.
- Use Zod for form validation.
- Use `next/dynamic` for dynamic loading of non-critical components.
- Optimize images using `next/image`: WebP format, size data, lazy loading.
- Prefer async/await over Promises.

## React Component Development Best Practices
- **Variable Declaration Order**: Always declare all variables and computed values BEFORE `useEffect` hooks and other React hooks.
- **Hook Dependencies**: Ensure all variables used in `useEffect` are declared before the `useEffect` call.
- **Avoid TDZ Errors**: Be mindful of the Temporal Dead Zone - variables must be declared before use in any scope.
- **Component Structure Order**:
  1. `useState` declarations
  2. Computed values (`const isRunning = status === 'RUNNING'`)
  3. Function definitions
  4. `useEffect` hooks
  5. JSX return
- **Testing**: Always test component rendering after major refactors to catch declaration order issues early.

## UI and Styling
- Utilize Tailwind CSS utility classes for styling components.
- Follow Shadcn UI component guidelines and best practices.
- Ensure the UI is responsive and accessible.

## Tailwind CSS Guidelines
- ALWAYS use Tailwind CSS v3.4.x for stability: `npm install -D tailwindcss@^3.4.0`.
- Avoid Tailwind v4+ beta/alpha versions in production projects.
- Use traditional PostCSS configuration for compatibility:
  ```js
  // postcss.config.js
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```
- Use traditional Tailwind directives in your global CSS file:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- When Tailwind styles aren't loading, restart the dev server completely.

## Performance Optimization
- Look for ways to make things faster:
  - Leverage Next.js caching strategies (Data Cache, Full Route Cache, Request Memoization).
  - Use immutable data structures.
  - Optimize data fetching by co-locating fetches with components in RSCs.
  - Use efficient algorithms and data structures.
  - Use efficient rendering strategies (RSCs, Streaming).
  - Use efficient state management.

## Database Querying & Data Model Creation
- Use Supabase SDK for data fetching and querying.
- For data model creation, use Supabase's schema builder.
- Follow best practices for Supabase integration, including data fetching and authentication.
- Use TypeScript for type safety when interacting with Supabase.