import type { CacheValidationInfo, CacheValidationKeyInfo } from '@/types/CacheValidationInfo'
import type { CacheValidationRefreshProfileRequest } from '@/types/CacheValidationRefreshProfileRequest'
import type { CacheValidationRefreshRequest } from '@/types/CacheValidationRefreshRequest'
import type { RequestProfile } from '@/types/RequestProfile'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { timeStampExpired, validateCache } from '@/utils/cache-validation'
import {
  allProfilesQuery,
  userProfileQuery,
  type AllProfiles,
  type UserProfile,
} from '@/utils/supabase-queries'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useProfileStore = defineStore('profile-store', () => {
  const GET_METHODS_EXPIRATION = 900
  const profile = ref<UserProfile | null>(null)
  const profiles = ref<AllProfiles | null>(null)
  const profileLastFetchTime = ref<CacheValidationKeyInfo>({})

  const validateCacheProfiles = (forceRefresh: boolean = false) => {
    const lastFetchInfo = profileLastFetchTime.value[StoreCacheKey.AllProfiles]
    validateCache<typeof profiles, typeof allProfilesQuery, typeof loadProfiles, PostgrestError>({
      reference: profiles,
      query: allProfilesQuery,
      key: StoreCacheKey.AllProfiles,
      loaderFn: loadProfiles,
      lastFetchInfo: { ...lastFetchInfo, forceRefresh },
    })
  }
  const validateCacheProfile = ({
    request,
    forceRefresh,
  }: CacheValidationRefreshProfileRequest) => {
    const lastFetchInfo = profileLastFetchTime.value[getProfileKey(request)]
    validateCache<typeof profile, typeof userProfileQuery, typeof loadProfile, PostgrestError>({
      reference: profile,
      query: userProfileQuery,
      key: getProfileKey(request),
      filter: request,
      loaderFn: loadProfile,
      lastFetchInfo,
    })
  }
  const clearCache = () => {
    console.log('called clearCache')
    loadProfiles.clear()
    console.log('cleared Profiles')
    loadProfile.clear()
    console.log('cleared individual Profiles')
  }
  const forceRefreshOnProfiles = () => {
    return timeStampExpired({
      timeStamp: profileLastFetchTime.value[StoreCacheKey.AllProfiles].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
  }
  const getProfileKey = (request: RequestProfile) => `profile-${request.column}-${request.value}`
  const loadProfiles = useMemoize(async () => {
    const { data, error, status } = await allProfilesQuery

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    profileLastFetchTime.value[StoreCacheKey.AllProfiles] = { timeStamp: Date.now() }
    return data
  })
  const getProfiles = async () => {
    // TODO > the following is required to something. Check git blame why I add that.
    //        it may have been added first on the task store or project store
    profiles.value = null
    profiles.value = await loadProfiles()
    validateCacheProfiles(forceRefreshOnProfiles())
  }
  const loadProfile = useMemoize(
    async (request: RequestProfile) => {
      const { data, error, status } = await userProfileQuery(request)

      if (error) {
        useErrorStore().setError({ error, customCode: status })
      }

      profileLastFetchTime.value[getProfileKey(request)] = { timeStamp: Date.now() }
      console.log('requested profile... profileLastFetchTime', profileLastFetchTime.value)
      return data
    },
    { getKey: (request) => getProfileKey(request) },
  )
  const getProfile = async (request: RequestProfile) => {
    profile.value = null
    profile.value = await loadProfile(request)
    const forceRefresh = timeStampExpired({
      timeStamp: profileLastFetchTime.value[getProfileKey(request)].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
    validateCacheProfile({ request, forceRefresh })
  }
  return {
    profile,
    profiles,
    loadProfile,
    loadProfiles,
    clearCache,
    getProfile,
    getProfiles,
  }
})
