'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'

interface MarkdownFile {
  path: string
  name: string
}

interface MarkdownContent {
  content: string
  html: string
  file: string
}

export default function MarkdownPreviewPage() {
  const [files, setFiles] = useState<MarkdownFile[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      const formattedFiles = data.map((path: string) => ({
        path,
        name: path.split('/').pop()
      }))
      setFiles(formattedFiles)
    } catch (err) {
      setError('Failed to fetch files')
    }
  }

  const fetchMarkdown = async (file: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/markdown?file=${encodeURIComponent(file)}`)
      const data: MarkdownContent = await response.json()
      
      if (response.ok) {
        setMarkdown(data.content)
        // Sanitize HTML before setting it
        const sanitizedHtml = DOMPurify.sanitize(data.html)
        setHtml(sanitizedHtml)
        setSelectedFile(file)
      } else {
        setError((data as any).error || 'Failed to load file')
      }
    } catch (err) {
      setError('Failed to load markdown file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-purple-600 text-white px-8 py-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Markdown Preview</h1>
        <Link 
          href="/"
          className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          ← Back to Home
        </Link>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Markdown Files</h2>
          {files.length === 0 ? (
            <p className="text-gray-500">No markdown files found</p>
          ) : (
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={file.path}
                  onClick={() => fetchMarkdown(file.path)}
                  className={`p-3 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-gray-100 break-words
                    ${selectedFile === file.path ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}`}
                >
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main className="flex-1 p-8 overflow-y-auto bg-white">
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {!selectedFile && !loading && !error && (
            <p className="text-center text-gray-500 text-xl mt-12">
              Select a markdown file to preview
            </p>
          )}
          {selectedFile && !loading && html && (
            <div
              className="prose prose-lg max-w-none
                prose-h1:border-b-2 prose-h1:border-gray-200 prose-h1:pb-2
                prose-h2:mt-8 prose-h2:mb-4
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-100 prose-pre:p-4
                prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-4
                prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </main>
      </div>
    </div>
  )
}