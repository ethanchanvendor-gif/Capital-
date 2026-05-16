'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User, AuthSession } from '@/types'

export function useAuth() {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    // Check current session
    const initAuth = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          setSession((prev) => ({
            ...prev,
            error: error.message,
            isLoading: false,
          }))
          return
        }

        if (currentSession?.user) {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentSession.user.id)
            .single()

          if (profileError) throw profileError

          setSession({
            user: profile as User,
            isLoading: false,
            error: null,
          })
        } else {
          setSession({
            user: null,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setSession((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize auth',
        }))
      }
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (currentSession?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()

        setSession({
          user: profile as User,
          isLoading: false,
          error: null,
        })
      } else {
        setSession({
          user: null,
          isLoading: false,
          error: null,
        })
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email,
          full_name: fullName,
        })

        if (profileError) throw profileError
      }

      return authData
    } catch (error) {
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      return data
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setSession({
        user: null,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      throw error
    }
  }

  return {
    ...session,
    signUp,
    signIn,
    signOut,
  }
}
