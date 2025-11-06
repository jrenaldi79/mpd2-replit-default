import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

const PROJECT_ROOT = path.resolve(process.cwd())

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const file = searchParams.get('file')
    
    if (!file) {
      return NextResponse.json(
        { error: 'File parameter is required' },
        { status: 400 }
      )
    }
    
    // Resolve the file path
    const filePath = path.join(PROJECT_ROOT, file)
    const resolvedPath = path.resolve(filePath)
    const relativePath = path.relative(PROJECT_ROOT, resolvedPath)
    
    // Security check: prevent directory traversal
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return NextResponse.json(
        { error: 'Access denied: path outside project root' },
        { status: 403 }
      )
    }
    
    // Check if file exists and is a markdown file
    if (!file.endsWith('.md')) {
      return NextResponse.json(
        { error: 'Only markdown files are allowed' },
        { status: 403 }
      )
    }
    
    // Read the file
    const content = await fs.readFile(resolvedPath, 'utf-8')
    
    // Convert markdown to HTML
    const rawHtml = await marked(content)
    
    // Sanitize HTML on the server side
    const html = DOMPurify.sanitize(rawHtml)
    
    return NextResponse.json({ content, html, file: relativePath })
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    )
  }
}