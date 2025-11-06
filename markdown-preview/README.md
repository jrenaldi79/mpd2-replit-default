# Markdown Preview Server

Automatically discovers and renders markdown files with full Mermaid diagram support.

## Directory Structure

```
markdown-preview/
├── server.js      # Express server
└── public/        # Frontend static files
    └── index.html # Markdown preview UI
```

## Running the Server

```bash
cd markdown-preview
node server.js
```

The server runs on port 3000 and discovers all `.md` files in the project root.

## Features

- Automatic markdown file discovery
- Mermaid diagram rendering
- Security: Path traversal protection
- Clean file browser interface
