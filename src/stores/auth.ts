import { AuthError, type Session, type User } from '@supabase/supabase-js'
import type { Tables } from '@/types/database.types'
import { userProfileQuery } from '@/utils/supabase-queries'
import { logoutFromSupabase, retrieveCurrentSession } from '@/utils/supabase-auth'
import { RouterPathEnum } from '@/types/RouterPathEnum'

const router = useRouter()

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'> | any>(null)

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
      router.push('/login')
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

  const getSession = async () => {
    const { data, error } = await retrieveCurrentSession()
    console.log('retrieveCurrentSession', error)

    if (data?.session?.user) {
      console.log('User session valid')
      await setAuth({ session: data.session, nextPageOnError: RouterPathEnum.Login })
      return { stillAuthenticated: true }
    } else {
      return { stillAuthenticated: false }
    }
  }

  const logout = async () => {
    const { error: authError } = await logoutFromSupabase()
    if (authError) {
      useErrorStore().setAuthError({ authError, nextPage: RouterPathEnum.Login })
    }
    setAuth({ session: null })
    console.log('Logout executed!')
  }
  return { user, profile, setAuth, setProfile, getSession, logout }
})
