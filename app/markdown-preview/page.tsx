'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import mermaid from 'mermaid'
import FileTree from './FileTree'
import { FileNode } from '@/app/api/files/route'

interface MarkdownContent {
  content: string
  html: string
  file: string
}

export default function MarkdownPreviewPage() {
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    const renderMermaidDiagrams = async () => {
      if (!contentRef.current || !html) return

      try {
        const codeBlocks = contentRef.current.querySelectorAll('code.language-mermaid')
        
        codeBlocks.forEach((codeBlock) => {
          const pre = codeBlock.parentElement
          if (!pre || pre.tagName !== 'PRE') return

          const mermaidCode = codeBlock.textContent || ''
          
          const mermaidDiv = document.createElement('div')
          mermaidDiv.className = 'mermaid'
          mermaidDiv.textContent = mermaidCode
          
          pre.replaceWith(mermaidDiv)
        })

        if (codeBlocks.length > 0) {
          await mermaid.run({
            querySelector: '.mermaid',
          })
        }
      } catch (error) {
        console.error('Failed to render Mermaid diagrams:', error)
      }
    }

    renderMermaidDiagrams()
  }, [html])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFileTree(data)
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
          <FileTree
            tree={fileTree}
            onFileSelect={fetchMarkdown}
            selectedFile={selectedFile}
          />
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
              ref={contentRef}
              className="prose max-w-none
                prose-h1:text-gray-900 prose-h1:font-bold prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
                prose-h2:text-gray-800 prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-bold
                prose-h3:text-gray-700 prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-code:bg-gray-200 prose-code:text-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-800 prose-pre:my-6 prose-pre:font-mono
                prose-pre:code:bg-transparent prose-pre:code:text-gray-100 prose-pre:code:p-0 prose-pre:code:text-sm prose-pre:code:leading-relaxed
                prose-pre:p-5 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:italic
                prose-ul:my-4 prose-ul:list-disc prose-ol:my-4 prose-ol:list-decimal
                prose-li:text-gray-700 prose-li:my-1
                prose-hr:border-t prose-hr:border-gray-300 prose-hr:my-8
                prose-table:border-collapse prose-table:w-full prose-table:my-6
                prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-800
                prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 prose-td:text-gray-700"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </main>
      </div>
    </div>
  )
}