import { supabase } from '@/lib/supabaseClient'
import type { RegistrationData } from '@/types/RegistrationData'
import { insertUserProfileQuery } from './supabase-queries'
import type { LoginData } from '@/types/LoginData'

const authStore = useAuth()

export const signupWithSupabase = async ({ formData }: { formData: RegistrationData }) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  const nextPageOnError = '/register'
  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: nextPageOnError })
    return { error: authError }
  }

  // Create profile
  if (authData.user) {
    const { data, error } = await insertUserProfileQuery({
      user: authData.user,
      formData: formData,
    })

    if (error) {
      useErrorStore().setError({ error, nextPage: nextPageOnError })
      return { error }
    }

    authStore.setAuth(authData.session)
    await authStore.setProfile({ nextPageOnError })
    return { error: null }
  }

  const uncaughtError = Error(`Authenticated user <${formData.email}> is absent.`)
  useErrorStore().setError({ error: uncaughtError, nextPage: nextPageOnError })
  return { error: uncaughtError }
}

export const siginpWithSupabase = async ({ formData }: { formData: LoginData }) => {
  // Authenticate
  const nextPageOnError = '/login'
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (authError) {
    useErrorStore().setAuthError({ authError, nextPage: nextPageOnError })
    return { error: authError }
  }

  authStore.setAuth(authData.session)
  await authStore.setProfile({ nextPageOnError })
  return { error: null }
}
