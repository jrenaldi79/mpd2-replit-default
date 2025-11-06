const express = require('express');
const { marked } = require('marked');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const PROJECT_ROOT = path.resolve('.');

let markdownFilesCache = new Set();

app.use(express.static('public'));

async function findMarkdownFiles(dir, fileList = []) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const excludedDirs = ['node_modules', '.git', '.cache', '.config', '.npm'];
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory() && !excludedDirs.includes(file.name)) {
      await findMarkdownFiles(filePath, fileList);
    } else if (file.isFile() && file.name.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function refreshMarkdownCache() {
  const files = await findMarkdownFiles('.');
  markdownFilesCache = new Set(files.map(f => path.resolve(f)));
  return files;
}

app.get('/api/files', async (req, res) => {
  try {
    const files = await refreshMarkdownCache();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/markdown', async (req, res) => {
  try {
    const { file } = req.query;
    if (!file) {
      return res.status(400).json({ error: 'File parameter is required' });
    }
    
    const resolvedPath = path.resolve(file);
    const relativePath = path.relative(PROJECT_ROOT, resolvedPath);
    
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return res.status(403).json({ error: 'Access denied: path outside project root' });
    }
    
    if (!markdownFilesCache.has(resolvedPath)) {
      await refreshMarkdownCache();
      if (!markdownFilesCache.has(resolvedPath)) {
        return res.status(403).json({ error: 'Access denied: file not in whitelist' });
      }
    }
    
    const content = await fs.readFile(resolvedPath, 'utf-8');
    const html = marked(content);
    
    res.json({ content, html, file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Markdown preview server running on port ${PORT}`);
});
