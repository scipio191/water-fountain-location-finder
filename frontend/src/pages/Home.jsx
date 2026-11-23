import { useState } from 'react'
import { useFetch } from '../hooks/useFetch.js'

export default function Home() {
  const [count, setCount] = useState(0)
  const { data, error, loading } = useFetch('/health')

  return (
    <section>
      <h2>Home</h2>
      <p>Your React app is up and running.</p>

      <p>
        Backend:{' '}
        {loading && 'checking...'}
        {error && 'unreachable (is the API running?)'}
        {data && `${data.status} at ${new Date(data.time).toLocaleTimeString()}`}
      </p>

      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </section>
  )
}
