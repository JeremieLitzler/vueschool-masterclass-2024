import type { GroupedCollabs } from '@/types/GroupedCollabs'
import type { WithCollabsProp } from '@/types/WithCollabsProp'
import {
  profilesByIdsQuery,
  type AllProjects,
  type TasksWithProject,
} from '@/utils/supabase-queries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error, status } = await profilesByIdsQuery(userIds)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    return data
  }

  const getGroupedCollabs = async (items: AllProjects | TasksWithProject) => {
    const filteredItems = items.filter((item) => item.collaborators.length)
    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))
    const results = await Promise.all(promises)
    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]!
    })
  }

  return {
    groupedCollabs,
    getProfilesByIds,
    getGroupedCollabs,
  }
}
