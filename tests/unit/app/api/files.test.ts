/**
 * @jest-environment node
 */
import { GET } from '../../../../app/api/files/route'
import fs from 'fs/promises'

// Mock the fs module
jest.mock('fs/promises')

describe('GET /api/files', () => {
  const mockReaddir = fs.readdir as jest.MockedFunction<typeof fs.readdir>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns markdown files from the project', async () => {
    // Mock file system responses
    mockReaddir
      .mockResolvedValueOnce([
        { name: 'README.md', isFile: () => true, isDirectory: () => false },
        { name: 'test.js', isFile: () => true, isDirectory: () => false },
        { name: 'docs', isFile: () => false, isDirectory: () => true },
        { name: 'node_modules', isFile: () => false, isDirectory: () => true },
      ] as any)
      .mockResolvedValueOnce([
        { name: 'guide.md', isFile: () => true, isDirectory: () => false },
      ] as any)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    
    const hasReadme = data.some((item: any) => item.name === 'README.md' && item.type === 'file')
    const hasTestJs = data.some((item: any) => item.name === 'test.js')
    const hasDocsFolder = data.some((item: any) => item.name === 'docs' && item.type === 'folder')
    
    expect(hasReadme).toBe(true)
    expect(hasTestJs).toBe(false)
    expect(hasDocsFolder).toBe(true)
  })

  it('excludes specified directories', async () => {
    mockReaddir.mockResolvedValueOnce([
      { name: 'node_modules', isFile: () => false, isDirectory: () => true },
      { name: '.git', isFile: () => false, isDirectory: () => true },
      { name: '.next', isFile: () => false, isDirectory: () => true },
      { name: 'README.md', isFile: () => true, isDirectory: () => false },
    ] as any)

    const response = await GET()
    const data = await response.json()

    expect(mockReaddir).toHaveBeenCalledTimes(1)
    const hasReadme = data.some((item: any) => item.name === 'README.md')
    expect(hasReadme).toBe(true)
  })

  it('handles errors gracefully', async () => {
    mockReaddir.mockRejectedValueOnce(new Error('File system error'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error')
  })
})