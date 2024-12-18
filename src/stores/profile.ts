import type { RequestProfile } from '@/types/RequestProfile'
import { validateCache } from '@/utils/cache-validation'
import {
  allProfilesQuery,
  userProfileQuery,
  type AllProfiles,
  type UserProfile,
} from '@/utils/supabase-queries'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useProfileStore = defineStore('profile-store', () => {
  const profile = ref<UserProfile | null>(null)
  const profiles = ref<AllProfiles | null>(null)

  const loadProfiles = useMemoize(async () => await allProfilesQuery)
  const getProfiles = async () => {
    profiles.value = null
    const { data, error, status } = await loadProfiles()
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    profiles.value = data
    validateCache<typeof profiles, typeof allProfilesQuery, typeof loadProfiles, PostgrestError>({
      reference: profiles,
      query: allProfilesQuery,
      key: StoreCacheKey.AllProfiles,
      loaderFn: loadProfiles,
    })
  }

  const getProfileKey = (request: RequestProfile) => `profile-${request.column}-${request.value}`
  const loadProfile = useMemoize(
    async (request: RequestProfile) => await userProfileQuery(request),
    { getKey: (request) => getProfileKey(request) },
  )
  const getProfile = async (request: RequestProfile) => {
    profile.value = null
    const { data, error, status } = await loadProfile(request)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    profile.value = data
    validateCache<typeof profile, typeof userProfileQuery, typeof loadProfile, PostgrestError>({
      reference: profile,
      query: userProfileQuery,
      key: getProfileKey(request),
      filter: request,
      loaderFn: loadProfile,
    })
  }
  return {
    profile,
    profiles,
    getProfile,
    getProfiles,
  }
})
