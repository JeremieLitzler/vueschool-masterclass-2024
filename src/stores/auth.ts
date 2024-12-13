import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from '@/types/database.types'
import { isNullOrUndefined } from 'util'

export const useAuth = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setAuth = (session: null | Session) => {
    if (!session) {
      user.value = null
      return
    }

    user.value = session.user
  }

  const logout = () => {
    user.value = null
  }
  return { user, profile, setAuth, logout }
})
