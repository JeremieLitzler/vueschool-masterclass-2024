import { allProjectsQuery, projectWithTasksQuery } from '@/utils/supabase-queries'
import type { ProjectWithTasks } from '@/utils/supabase-queries'
import { useMemoize } from '@vueuse/core'
import type { RouteLocationNormalizedLoadedTyped } from 'vue-router'

export const useProjectStore = defineStore('project-store', () => {
  const project = ref<ProjectWithTasks | null>(null)

  const loadProjects = useMemoize(async (key: string) => await allProjectsQuery)
  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error: error, customCode: status })
    }
    return data
  }

  const loadProject = useMemoize(async (slug: string) => await projectWithTasksQuery(slug))
  const getProject = async (slug: string) => {
    const { data, error } = await loadProject(slug)
    if (error) console.error(error)

    console.log(data)

    project.value = data
  }

  return {
    project,
    getProject,
    getProjects,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
