import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { allProjectsQuery, projectWithTasksQuery } from '@/utils/supabase-queries'
import type { AllProjects, ProjectWithTasks } from '@/utils/supabase-queries'
import { useMemoize } from '@vueuse/core'
import type { RouteLocationNormalizedLoadedTyped } from 'vue-router'

export const useProjectStore = defineStore('project-store', () => {
  const projects = ref<AllProjects | null>(null)
  const project = ref<ProjectWithTasks | null>(null)

  const validateProjectsCache = (cacheKey: string) => {
    if (projects.value) {
      allProjectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return
        } else {
          loadProjects.delete(cacheKey)
        }
      })
    }
  }

  const loadProjects = useMemoize(async (key: string) => await allProjectsQuery)
  const getProjects = async () => {
    const { data, error, status } = await loadProjects(StoreCacheKey.AllProjects)
    if (error) {
      useErrorStore().setError({ error: error, customCode: status })
    }
    projects.value = data
    validateProjectsCache(StoreCacheKey.AllProjects)
  }

  const validateProjectCache = (cacheKey: string) => {
    if (projects.value) {
      projectWithTasksQuery(cacheKey).then(({ data }) => {
        if (JSON.stringify(project.value) === JSON.stringify(data)) {
          return
        } else {
          loadProject.delete(cacheKey)
        }
      })
    }
  }
  const loadProject = useMemoize(async (slug: string) => await projectWithTasksQuery(slug))
  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    project.value = data
    validateProjectCache(slug)
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
