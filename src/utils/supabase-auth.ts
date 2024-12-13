import { supabase } from '@/lib/supabaseClient'
import type { RegistrationData } from '@/types/RegistrationData'
import { insertUserProfile } from './supabase-queries'
import type { LoginData } from '@/types/LoginData'

export const signupWithSupabase = async ({ formData }: { formData: RegistrationData }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  const nextRouteOnError = '/register'
  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: nextRouteOnError })
    return { error: authError }
  }

  // Create profile
  if (authData.user) {
    const { data, error } = await insertUserProfile({
      user: authData.user,
      formData: formData,
    })

    if (error) {
      useErrorStore().setError({ error, nextPage: nextRouteOnError })
      return { error: null }
    }

    return { error: null }
  }

  const uncaughtError = Error(`Authenticated user <${formData.email}> is absent.`)
  useErrorStore().setError({ error: uncaughtError, nextPage: nextRouteOnError })
  return { error: uncaughtError }
}

export const siginpWithSupabase = async ({ formData }: { formData: LoginData }) => {
  // Authenticate
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: '/login' })
    return { error: authError }
  }

  return { error: null }
}
