# Northwestern MPD2 Starter Template

## Overview
This project is a Next.js 16 starter template for Northwestern MPD2 students, featuring a dual-app architecture: a **Document Viewer** (`/markdown-preview`) for BMAD methodology documentation and a **Shell Main App** (`/`) for student project customization. Its purpose is to provide a production-ready foundation with TypeScript, Tailwind CSS, a TDD framework, and Turbopack, accelerating student development by focusing on innovation over setup complexities. The project's ambition is to equip students with a robust, modern development environment that reduces setup overhead and allows them to concentrate on innovative project development.

## User Preferences
- **Preferred communication style**: Simple, everyday language.
- **Workflow preference**: Every code change MUST start by writing tests before any implementation, following a strict TDD process (Red, Green, Refactor, Finalization).
- **Interaction preference**: AI must explicitly state "Following TDD - writing tests first," create failing tests, show RED output, then implement code, and finally show GREEN output.
- **Code modification preference**: Do not remove existing code unless necessary. Do not remove comments or commented-out code unless necessary. Do not change formatting unless important for functionality.
- **TDD Enforcement**: If you start implementing before writing tests, STOP and write tests first. Your FIRST response to any feature request should be to write tests.
- **Development Server Validation**: After starting any development server, ALWAYS check the server output for warnings, errors, or compilation issues using the BashOutput tool.
- **General Working Preferences**: You are an expert in TypeScript, Node.js, React, Next.js, and Tailwind. We are using the **Next.js 15** stack, with a focus on the **App Router** and **Turbopack**. Use Node.js for backend logic within Next.js Route Handlers. Supabase is our preferred database provider.

## System Architecture

**Technology Stack**:
- **Framework**: Next.js 16.x (App Router, Turbopack)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.4.x
- **Testing**: Jest, React Testing Library
- **Markdown**: `marked`, `isomorphic-dompurify`
- **Syntax Highlighting**: `highlight.js`
- **Diagrams**: Mermaid 10.x
- **Schema Validation**: Zod
- **Logging**: Winston
- **Pre-commit Hooks**: Husky

**UI/UX Decisions**:
- Mobile-first, responsive design using Tailwind CSS.
- Adherence to Shadcn UI component guidelines.
- Favor React Server Components (RSC) to minimize client-side interactivity, utilizing functional components and TypeScript interfaces.
- Static content and interfaces placed at the end of files, with content variables for static content outside render functions.

**Technical Implementations**:
- **Mandatory TDD**: All features adhere to a Red-Green-Refactor cycle.
- **Code Quality**: Enforced via ESLint, Prettier, and TypeScript strict mode.
- **Error Handling**: Comprehensive patterns including `error.js`, React Error Boundaries, standardized API errors, and retry logic.
- **Security**: Supabase authentication/authorization (RLS), input sanitization, CORS, rate limiting, and HTTPS.
- **Performance**: Leverages Next.js caching, immutable data structures, optimized fetching (co-locating fetches in RSCs), and streaming.
- **Monitoring & Observability**: Structured logging (Winston), API request/response logging, error tracking, and correlation IDs.
- **API Design**: RESTful API design using Next.js Route Handlers with consistent HTTP methods, pagination, filtering, and standardized response formats.
- **Component Development**: Prioritizes `useState` and computed value declarations before `useEffect` hooks to prevent TDZ errors, following a specific component structure order.
- **Database Querying**: Utilizes Supabase SDK for data fetching and schema building, with TypeScript for type safety.

**Feature Specifications**:
- **Document Viewer** (`/markdown-preview`): Dedicated for BMAD methodology documentation.
- **Main App** (`/`): Placeholder for student projects, customizable by students.

**System Design Choices**:
- Dual-app architecture for distinct functionalities.
- Feature-based file organization within the `app/` directory.
- Strict separation of concerns (e.g., `app/api/`, `app/components/`, `types/`, `tests/`).
- Secrets management via Replit Secrets.
- Use of path aliases (`@/components/...`) for clean imports.

## External Dependencies
- **Database**: Supabase (SDK, schema builder, RLS)
- **Markdown Rendering**: `marked`
- **Markdown Sanitization**: `isomorphic-dompurify`
- **Syntax Highlighting**: `highlight.js`
- **Diagrams**: Mermaid
- **Logging**: Winston