import { useEffect, useState } from 'react'
import { api } from '../services/api.js'

// Example custom hook: loads data from an API path on mount.
export function useFetch(path) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    api
      .get(path)
      .then((result) => !cancelled && setData(result))
      .catch((err) => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [path])

  return { data, error, loading }
}
