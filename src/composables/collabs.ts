import { profilesByIdsQuery } from '@/utils/supabase-queries'

export const useCollabs = () => {
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error, status } = await profilesByIdsQuery(userIds)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    return data
  }

  return {
    getProfilesByIds,
  }
}
