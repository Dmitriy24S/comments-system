import { useCallback, useEffect, useState } from 'react'

// useQuery?

// returns results
export const useAsync = (func, dependencies = []) => {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true) // true = inital loading

  useEffect(() => {
    execute()
  }, [execute])
  // everytime our dependencies change -> 'execute' func. changes -> then useEffect reruns also
  return state
}

// return function to us
export const useAsyncFn = (func, dependencies = []) => {
  return useAsyncInternal(func, dependencies, false) // false = initial loading
}

function useAsyncInternal(func, dependencies, initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  // v1
  //  const execute = useCallback((...params) => {
  //     setLoading(true)
  //     return func(...params)
  //       .then((data) => {
  //         setValue(data)
  //         setError(undefined)
  //         return data
  //       })
  //       .catch((error) => {
  //         setError(error)
  //         setValue(undefined)
  //         return Promise.reject(error)
  //       })
  //       .finally(() => {
  //         setLoading(false)
  //       })
  //   }, dependencies)

  // v2
  const execute = useCallback(async (...params) => {
    setLoading(true)
    try {
      const data = await func(...params)
      setValue(data)
      setError(undefined)
      return data
    } catch (error) {
      setError(error)
      setValue(undefined)
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }, dependencies)

  return { loading, error, value, execute }
}
