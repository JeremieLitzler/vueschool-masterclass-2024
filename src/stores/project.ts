import type { CacheValidation } from '@/types/CacheValidation'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { validateCache } from '@/utils/cache-validation'
import { allProjectsQuery, projectWithTasksQuery } from '@/utils/supabase-queries'
import type { AllProjects, ProjectWithTasks } from '@/utils/supabase-queries'
import { type PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useProjectStore = defineStore('project-store', () => {
  const projects = ref<AllProjects | null>()
  const project = ref<ProjectWithTasks | null>(null)

  // const validateCache = ({
  //   reference,
  //   query,
  //   key,
  //   loaderFn,
  // }: CacheValidation<
  //   typeof projects | typeof project,
  //   typeof allProjectsQuery | typeof projectWithTasksQuery,
  //   typeof loadProjects | typeof loadProject
  // >) => {
  //   if (reference.value) {
  //     const finalQuery = typeof query === 'function' ? query(key) : query
  //     finalQuery.then(({ data, error }) => {
  //       if (JSON.stringify(reference.value) === JSON.stringify(data)) {
  //         return
  //       } else {
  //         loaderFn.delete(key as string)
  //         if (!error && data) {
  //           reference.value = data
  //         }
  //       }
  //     })
  //   }
  // }

  const loadProjects = useMemoize(async (key: string) => await allProjectsQuery)
  const getProjects = async () => {
    const { data, error, status } = await loadProjects(StoreCacheKey.AllProjects)
    if (error) {
      useErrorStore().setError({ error: error, customCode: status })
    }
    if (data) {
      projects.value = data
    }
    validateCache<typeof projects, typeof allProjectsQuery, typeof loadProjects, PostgrestError>({
      key: StoreCacheKey.AllProjects,
      loaderFn: loadProjects,
      query: allProjectsQuery,
      reference: projects,
    })
  }

  const loadProject = useMemoize(async (slug: string) => await projectWithTasksQuery(slug))
  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    project.value = data
    validateCache<typeof project, typeof projectWithTasksQuery, typeof loadProject, PostgrestError>(
      {
        key: slug,
        loaderFn: loadProject,
        query: projectWithTasksQuery,
        reference: project,
      },
    )
  }

  return {
    project,
    projects,
    getProject,
    getProjects,
  }
})
