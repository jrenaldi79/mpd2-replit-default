import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
      <h1 className="text-6xl font-bold mb-4 drop-shadow-2xl">
        Hello World! 👋
      </h1>
      <p className="text-2xl mb-8 opacity-90">
        Your Next.js app is running successfully
      </p>
      <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-lg mb-8">
        <p className="text-lg">Running on Port 5000</p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link 
          href="/"
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
        >
          Main App (Port 5000)
        </Link>
        <Link 
          href="/markdown-preview"
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
        >
          Markdown Preview
        </Link>
      </div>
    </div>
  )
}