import { type Session, type User } from '@supabase/supabase-js'
import type { Tables } from '@/types/database.types'
import { userProfileQuery, type UserProfile } from '@/utils/supabase-queries'
import { logoutFromSupabase, retrieveCurrentSession } from '@/utils/supabase-auth'
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | UserProfile>(null)
  const isTrackingAuthChanges = ref(false)

  const setAuth = async ({
    session,
    nextPageOnError,
  }: {
    session: null | Session
    nextPageOnError?: string
  }) => {
    if (!session) {
      user.value = null
      profile.value = null
      return
    }

    user.value = session.user
    await setProfile({ nextPageOnError })
  }

  const setProfile = async ({ nextPageOnError }: { nextPageOnError?: string }) => {
    if (!user.value) {
      // no user = no possible to fetch a profile
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value?.id) {
      // otherwise let's fetch the profile
      const { data, error, status } = await userProfileQuery({
        column: 'id',
        value: user.value?.id,
      })

      if (error) {
        useErrorStore().setError({ error, nextPage: nextPageOnError })
      }

      profile.value = data || null
    }
  }

  const getSession = async () => {
    const { data, error: authError } = await retrieveCurrentSession()

    if (authError) {
      useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Login })
    }
  }

  const logout = async () => {
    const { error: authError } = await logoutFromSupabase()
    if (authError) {
      useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Login })
      return { isLoggedOut: false }
    }
    return { isLoggedOut: true }
  }

  const trackAuthChanges = () => {
    if (isTrackingAuthChanges.value) {
      return
    }
    isTrackingAuthChanges.value = false
    supabase.auth.onAuthStateChange((event, session) => {
      // See https://supabase.com/docs/reference/javascript/auth-onauthstatechange
      setTimeout(async () => {
        await useAuthStore().setAuth({ session })
      }, 0)
    })
  }
  return { user, profile, setAuth, setProfile, getSession, logout, trackAuthChanges }
})
