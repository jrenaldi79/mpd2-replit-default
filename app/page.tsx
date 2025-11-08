import React from 'react'
import Link from 'next/link'
import ExampleComponent from './components/ExampleComponent'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              My Next.js App
            </h1>
            <nav className="flex gap-4">
              <Link 
                href="/markdown-preview"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                📚 BMAD Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🚀 Northwestern MPD2 Starter Template
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome to your Next.js starter project! This is a "shell" app that you'll replace with your own amazing idea.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800 font-semibold mb-2">💡 Quick Start Guide:</p>
              <ol className="list-decimal list-inside text-blue-700 space-y-1">
                <li>Replace this page with your app's home page</li>
                <li>Add your components in the <code className="bg-blue-100 px-1 rounded">app/components</code> folder</li>
                <li>Create API routes in <code className="bg-blue-100 px-1 rounded">app/api</code></li>
                <li>Use the BMAD Docs viewer to understand the methodology while you code</li>
                <li>Customize <code className="bg-blue-100 px-1 rounded">replit.md</code> to guide your AI coding assistant</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/markdown-preview"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                View BMAD Documentation
              </Link>
              <a 
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Next.js Docs →
              </a>
            </div>
          </div>

          {/* AI Agent Instructions Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🤖 AI Coding Assistant Instructions
            </h3>
            <p className="text-gray-600 mb-4">
              The <code className="bg-purple-100 px-2 py-1 rounded text-purple-700 font-mono">replit.md</code> file is your command center for AI coding assistants. 
              It contains comprehensive rules and guidelines that any AI agent will follow when helping you code.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
              <p className="text-purple-800 font-semibold mb-2">What's in replit.md:</p>
              <ul className="list-disc list-inside text-purple-700 space-y-1">
                <li><strong>Project Architecture</strong> - Tech stack, dependencies, and structure</li>
                <li><strong>TDD Requirements</strong> - Mandatory test-first development (80% coverage)</li>
                <li><strong>Coding Standards</strong> - TypeScript, React, and Next.js best practices</li>
                <li><strong>Security Rules</strong> - Input validation, authentication patterns</li>
                <li><strong>API Design</strong> - RESTful conventions and response formats</li>
                <li><strong>Performance Guidelines</strong> - Optimization strategies</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 Pro Tip:</strong> As you develop your app, update <code className="bg-gray-200 px-1 rounded">replit.md</code> with:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Your specific API endpoints and their purposes</li>
                <li>Custom business logic rules</li>
                <li>Database schema decisions</li>
                <li>UI/UX preferences for your app</li>
                <li>Any unique patterns or conventions you establish</li>
              </ul>
            </div>
          </div>

          {/* TDD Framework Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🧪 Test-Driven Development (TDD) Framework
            </h3>
            <p className="text-gray-600 mb-6">
              This template enforces TDD methodology. Every feature must start with tests!
            </p>

            <div className="space-y-4">
              {/* Red Phase */}
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold text-red-700 mb-1">🔴 Red Phase - Write Failing Tests</h4>
                <p className="text-gray-600 text-sm mb-2">Start by writing tests that define what success looks like.</p>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <div className="text-gray-600"># Create test file first</div>
                  <div className="text-blue-600">tests/unit/app/api/users/route.test.ts</div>
                  <div className="text-gray-600 mt-2"># Run tests - they should fail!</div>
                  <div className="text-red-600">npm test -- ❌ FAIL (0 passing, 3 failing)</div>
                </div>
              </div>

              {/* Green Phase */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-green-700 mb-1">🟢 Green Phase - Make Tests Pass</h4>
                <p className="text-gray-600 text-sm mb-2">Write the simplest code to make your tests pass.</p>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <div className="text-gray-600"># Now create implementation</div>
                  <div className="text-blue-600">app/api/users/route.ts</div>
                  <div className="text-gray-600 mt-2"># Run tests again</div>
                  <div className="text-green-600">npm test -- ✓ PASS (3 passing)</div>
                </div>
              </div>

              {/* Refactor Phase */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-blue-700 mb-1">🔵 Refactor Phase - Optimize Code</h4>
                <p className="text-gray-600 text-sm mb-2">Clean up and optimize while keeping tests green.</p>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <div className="text-gray-600"># Refactor implementation</div>
                  <div className="text-gray-600"># Run tests after each change</div>
                  <div className="text-green-600">npm test -- ✓ Still passing!</div>
                  <div className="text-gray-600 mt-2"># Check coverage</div>
                  <div className="text-purple-600">npm run test:coverage -- 85% coverage ✓</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> The AI assistant will refuse to write implementation code until tests are written first. 
                This ensures you always have a safety net and clear specifications for your features.
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                npm test
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">
                npm run test:watch
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                npm run test:coverage
              </button>
            </div>
          </div>

          {/* Example Component Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Example Component
            </h3>
            <p className="text-gray-600 mb-4">
              Below is a simple example component to show you the structure. Feel free to modify or delete it!
            </p>
            <ExampleComponent />
          </div>

          {/* Resources Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Helpful Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">Tailwind CSS</h4>
                <p className="text-sm text-gray-600">Utility-first CSS framework</p>
              </a>
              <a 
                href="https://www.typescriptlang.org/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">TypeScript</h4>
                <p className="text-sm text-gray-600">JavaScript with syntax for types</p>
              </a>
              <a 
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">React</h4>
                <p className="text-sm text-gray-600">Library for web and native UIs</p>
              </a>
              <a 
                href="https://jestjs.io/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">Jest</h4>
                <p className="text-sm text-gray-600">Testing framework (TDD)</p>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            Northwestern MPD2 Starter Template | Built with Next.js 16, TypeScript & Tailwind CSS
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            💡 Tip: Start by editing <code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code> and check <code className="bg-gray-100 px-2 py-1 rounded">replit.md</code> for AI instructions
          </p>
        </div>
      </footer>
    </div>
  )
}