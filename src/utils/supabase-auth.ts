import { supabase } from '@/lib/supabaseClient'
import type { RegistrationData } from '@/types/RegistrationData'
import { insertUserProfileQuery } from './supabase-queries'
import type { LoginData } from '@/types/LoginData'
import { RouterPathEnum } from '@/types/RouterPathEnum'

export const signupWithSupabase = async ({ formData }: { formData: RegistrationData }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Register })
    return { error: authError }
  }

  // Create profile
  if (authData.user) {
    const { data, error } = await insertUserProfileQuery({
      user: authData.user,
      formData: formData,
    })

    if (error) {
      useErrorStore().setError({ error, nextPage: RouterPathEnum.Register })
      return { error }
    }

    await useAuthStore().setAuth({
      session: authData.session,
      nextPageOnError: RouterPathEnum.Register,
    })
    return { error: null }
  }

  const uncaughtError = Error(`Authenticated user <${formData.email}> is absent.`)
  useErrorStore().setError({ error: uncaughtError, nextPage: RouterPathEnum.Register })
  return { error: uncaughtError }
}

export const loginWithSupabase = async ({ formData }: { formData: LoginData }) => {
  // Authenticate
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Login })
    return { error: authError }
  }

  await useAuthStore().setAuth({
    session: authData.session,
    nextPageOnError: RouterPathEnum.Register,
  })
  return { error: null }
}

export const retrieveCurrentSession = async () => {
  const { data, error: authError } = await supabase.auth.getSession()

  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Login })
    return { error: authError }
  }

  console.log('getSession', data)
  return { data }
}

export const logoutFromSupabase = async () => await supabase.auth.signOut()
