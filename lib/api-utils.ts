import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  try {
    // Token will be added from auth context if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.error('Error adding auth token:', error)
  }
  return config
})

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear local storage and redirect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (typeof options.headers === 'object' && options.headers !== null) {
    Object.assign(headers, options.headers)
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}
