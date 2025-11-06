import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const PROJECT_ROOT = path.resolve(process.cwd())

async function findMarkdownFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const excludedDirs = ['node_modules', '.git', '.cache', '.config', '.npm', '.next']
  
  for (const file of files) {
    const filePath = path.join(dir, file.name)
    
    if (file.isDirectory() && !excludedDirs.includes(file.name)) {
      try {
        await findMarkdownFiles(filePath, fileList)
      } catch (err) {
        continue
      }
    } else if (file.isFile() && file.name.endsWith('.md')) {
      // Return relative paths instead of absolute paths
      const relativePath = path.relative(PROJECT_ROOT, filePath)
      fileList.push(relativePath)
    }
  }
  
  return fileList
}

export async function GET() {
  try {
    const files = await findMarkdownFiles(PROJECT_ROOT)
    return NextResponse.json(files)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}