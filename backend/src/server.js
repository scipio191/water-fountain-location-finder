import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import itemsRouter from './routes/items.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())

// --- API routes -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.use('/api/items', itemsRouter)

// Any other /api path is a 404 (JSON, not the frontend's index.html)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// --- Serve the built frontend (after `npm run build`) -------------------------
// In development the Vite dev server handles the frontend and proxies /api here,
// so this only kicks in when frontend/dist exists.
const distDir = path.resolve(__dirname, '../../frontend/dist')

if (fs.existsSync(path.join(distDir, 'index.html'))) {
  app.use(express.static(distDir))
  // SPA fallback: let the React app handle client-side routes
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

// --- Error handler ----------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
