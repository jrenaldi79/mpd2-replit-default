# Project Overview

This project contains two separate Node.js applications running on different ports.

## Project Structure

```
├── main-app/              # Main application (Port 5000)
│   ├── src/               # Application source code
│   │   └── app.js        # Main server file
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── public/           # Static assets (HTML, CSS, JS, images)
│   ├── package.json      # Dependencies and scripts
│   └── README.md         # Main app documentation
│
├── markdown-preview/      # Markdown preview server (Port 3000)
│   ├── server.js         # Express server with markdown rendering
│   ├── public/           # Frontend static files
│   │   └── index.html   # Markdown preview UI
│   └── README.md         # Markdown preview documentation
│
└── .bmad-core/           # BMad Method Framework
    └── ...               # AI-driven development methodology system
```

## Running the Applications

Both applications run simultaneously on different ports:

### Main App (Port 5000)
- **Default webview**: This app shows in the main Replit preview
- **Access**: Automatic in Replit preview
- **Start**: `node main-app/src/app.js`

### Markdown Preview (Port 3000)
- **Purpose**: Preview markdown files with Mermaid diagram support
- **Access**: Via Replit Ports panel → Select port 3000
- **Start**: `node markdown-preview/server.js`

## Quick Start

Both servers are already configured and running via Replit workflows:
- **main-app** workflow → Port 5000 (webview)
- **markdown-preview** workflow → Port 3000 (console)

## Features

### Main App
- Express.js server
- Static file serving
- Structured directory layout for scaling

### Markdown Preview
- Automatic markdown file discovery across the entire project
- Full Mermaid diagram support
- Security: Path traversal protection
- Clean file browser interface
- No changes needed to existing markdown files

## Development

Each application has its own README with detailed information:
- See `main-app/README.md` for main app details
- See `markdown-preview/README.md` for markdown preview details
