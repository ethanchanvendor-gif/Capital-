'use client'

import { useState, useCallback } from 'react'

export function useLoader(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])
  const toggle = useCallback(() => setIsLoading((prev) => !prev), [])

  const execute = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true)
      try {
        const result = await fn()
        return result
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
    toggle,
    execute,
  }
}
