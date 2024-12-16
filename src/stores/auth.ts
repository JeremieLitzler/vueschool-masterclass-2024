import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from '@/types/database.types'
import { userProfileQuery } from '@/utils/supabase-queries'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'> | any>(null)

  const setAuth = async ({
    session,
    nextPageOnError,
  }: {
    session: null | Session
    nextPageOnError: string
  }) => {
    if (!session) {
      user.value = null
      return
    }

    user.value = session.user
    await setProfile({ nextPageOnError })
  }

  const setProfile = async ({ nextPageOnError }: { nextPageOnError: string }) => {
    if (!user.value) {
      // no user = no possible to fetch a profile
      useErrorStore().setError({
        error: Error('No user is authenticated'),
        nextPage: nextPageOnError,
      })
    }
    if (profile.value) {
      // profile already fetched
      return
    }
    if (profile.value && profile.value.id === user.value?.id) {
      // profile is matching the user
      return
    }

    // otherwise let's fetch the profile
    const { data, error, status } = await userProfileQuery({ userId: user.value?.id })

    if (error) useErrorStore().setError({ error, nextPage: nextPageOnError })
    profile.value = data
  }

  const logout = () => {
    user.value = null
    profile.value = null
  }
  return { user, profile, setAuth, setProfile, logout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
