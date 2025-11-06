# Overview

This project is a Next.js 15 application with TypeScript and Tailwind CSS, utilizing the App Router architecture. Its primary purpose is to provide a platform for a welcome page and an interactive markdown previewer with live rendering and XSS protection. The project adheres to a Test-Driven Development (TDD) methodology and incorporates the BMad Method framework for AI-driven agile development.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

The application is built on Next.js 15, leveraging the App Router for modern React Server Components. TypeScript ensures type safety, and Tailwind CSS v3.4.x is used for utility-first styling. Jest with React Testing Library facilitates a TDD approach. Markdown parsing is handled by the `marked` library, with `isomorphic-dompurify` providing XSS sanitization. The server-side logic uses Node.js with Next.js Route Handlers.

**UI/UX Decisions:**
- **Home Page**: A Server Component with a Tailwind CSS gradient background and responsive design, providing navigation links.
- **Markdown Preview**: A Client Component featuring an interactive sidebar for markdown file selection and a sanitized markdown renderer.
- **Responsive Design**: Achieved through Tailwind CSS utility classes.

**Technical Implementations:**
- **File System API**: A Route Handler (`/api/files`) recursively scans for markdown files, excluding sensitive directories, and returns relative paths.
- **Markdown Rendering API**: A Route Handler (`/api/markdown`) fetches and renders markdown content, applying server-side sanitization and validating file paths to prevent directory traversal.
- **Security**: Includes path validation, DOMPurify for XSS protection, and restrictive API access (e.g., GET only, non-descriptive error messages).

**System Design Choices:**
- **Next.js 15 App Router**: Chosen for performance and modern React architecture.
- **TypeScript**: For enhanced developer experience and code quality.
- **Tailwind CSS**: For rapid UI development.
- **TDD**: A core methodology ensuring robust and well-tested features.
- **Port 5000**: Configured for Replit webview integration.

# External Dependencies

**NPM Packages:**
- **Core Framework**: `next` (v15.x), `react` (v19.2.0), `react-dom` (v19.2.0), `typescript` (v5.x)
- **Styling**: `tailwindcss` (v3.4.x), `autoprefixer`, `postcss`
- **Testing**: `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-environment-jsdom`
- **Security & Utilities**: `marked` (v16.4.1), `isomorphic-dompurify`
- **Type Definitions**: `@types/node`, `@types/react`, `@types/react-dom`, `@types/jest`

**Runtime Environment:**
- **Node.js**
- **Replit Platform**

**Databases:**
- **Supabase**: Preferred database provider, with an emphasis on Row Level Security (RLS) and TypeScript integration.