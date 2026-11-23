import { Router } from 'express'

const router = Router()

// Example in-memory data. Replace with a real database when you're ready.
let nextId = 3
const items = [
  { id: 1, name: 'First item' },
  { id: 2, name: 'Second item' },
]

router.get('/', (req, res) => {
  res.json(items)
})

router.post('/', (req, res) => {
  const name = req.body?.name?.trim()
  if (!name) {
    return res.status(400).json({ error: 'name is required' })
  }
  const item = { id: nextId++, name }
  items.push(item)
  res.status(201).json(item)
})

export default router
