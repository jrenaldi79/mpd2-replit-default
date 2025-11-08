# Northwestern MPD2 Starter Template

## Overview
This project is a Next.js 16 starter template for Northwestern MPD2 students, featuring a dual-app architecture: a **Document Viewer** (`/markdown-preview`) for BMAD methodology documentation and a **Shell Main App** (`/`) for student project customization. Its purpose is to provide a production-ready foundation with TypeScript, Tailwind CSS, a TDD framework, and Turbopack, accelerating student development by focusing on innovation over setup complexities.

## User Preferences
- **Preferred communication style**: Simple, everyday language.
- **Workflow preference**: Every code change MUST start by writing tests before any implementation, following a strict TDD process (Red, Green, Refactor, Finalization).
- **Interaction preference**: AI must explicitly state "Following TDD - writing tests first," create failing tests, show RED output, then implement code, and finally show GREEN output.
- **Code modification preference**: Do not remove existing code unless necessary. Do not remove comments or commented-out code unless necessary. Do not change formatting unless important for functionality.
- You are an expert in TypeScript, Node.js, React, Next.js, and Tailwind. We are using the **Next.js 15** stack, with a focus on the **App Router** and **Turbopack** for development and production builds. Use Node.js for backend logic within Next.js Route Handlers. If needed, Supabase is our preferred database provider.

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
- Mobile-first, responsive design.
- Tailwind CSS utility classes for styling.
- Follow Shadcn UI component guidelines.
- Favor React Server Components (RSC); minimize `'use client'`, `useEffect`, `useState`.
- Use functional components and TypeScript interfaces.

**Technical Implementations**:
- **Mandatory TDD**: All features must follow a Red-Green-Refactor cycle.
- **Code Quality**: ESLint, Prettier, TypeScript strict mode.
- **Error Handling**: `error.js`, React Error Boundaries, standardized API errors, retry logic.
- **Security**: Supabase authentication/authorization (RLS), input sanitization, CORS, rate limiting, HTTPS.
- **Performance**: Next.js caching, immutable data structures, optimized fetching, RSCs, streaming.
- **Monitoring & Observability**: Structured logging, API logging, error tracking, metrics, correlation IDs.

**Feature Specifications**:
- **Document Viewer** (`/markdown-preview`): Dedicated for BMAD methodology documentation.
- **Main App** (`/`): Placeholder for student projects.

**System Design Choices**:
- Dual-app architecture.
- Feature-based file organization within `app/`.
- Strict separation of concerns (e.g., `app/api/`, `app/components/`, `types/`, `tests/`).
- Secrets management via Replit Secrets.
- Consistent RESTful API design.

## External Dependencies
- **Database**: Supabase (SDK, schema builder, RLS)
- **Markdown Rendering**: `marked`
- **Markdown Sanitization**: `isomorphic-dompurify`
- **Syntax Highlighting**: `highlight.js`
- **Diagrams**: Mermaid
- **Logging**: Winston