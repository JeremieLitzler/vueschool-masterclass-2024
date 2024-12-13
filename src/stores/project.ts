import { projectWithTasksQuery } from '@/utils/supabase-queries'
import type { ProjectWithTasks } from '@/utils/supabase-queries'
import type { RouteLocationNormalizedLoadedTyped } from 'vue-router'

export const useProject = defineStore('project-store', () => {
  const project = ref<ProjectWithTasks | null>(null)
  const getProject = async (slug: string) => {
    const { data, error } = await projectWithTasksQuery(slug)
    if (error) console.error(error)

    console.log(data)

    project.value = data
  }

  return {
    project,
    getProject,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
