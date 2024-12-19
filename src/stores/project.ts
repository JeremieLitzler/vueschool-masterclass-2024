import type { CacheValidation } from '@/types/CacheValidation'
import type { CacheValidationKeyInfo } from '@/types/CacheValidationInfo'
import type { CacheValidationRefreshRequest } from '@/types/CacheValidationRefreshRequest'
import type { Tables } from '@/types/database.types'
import type { FormDataCreateProject } from '@/types/FormDataCreateProject'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import type { UpdateSupabaseEntityRequest } from '@/types/UpdateSupabaseEntityRequest'
import { timeStampExpired, validateCache } from '@/utils/cache-validation'
import { toISOStringWithTimezone } from '@/utils/date-format'
import {
  allProjectsQuery,
  createProjectQuery,
  deleteProjectQuery,
  projectWithTasksQuery,
  updateProjectQuery,
} from '@/utils/supabase-queries'
import type { AllProjects, ProjectWithTasks } from '@/utils/supabase-queries'
import { type PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useProjectStore = defineStore('project-store', () => {
  const GET_METHODS_EXPIRATION = 900 // 15 min

  const projects = ref<AllProjects | null>()
  const project = ref<ProjectWithTasks | null>(null)
  const projectLastFetchTime = ref<CacheValidationKeyInfo>({})

  const validateCacheProjects = async (forceRefresh: boolean = false) =>
    validateCache<typeof projects, typeof allProjectsQuery, typeof loadProjects, PostgrestError>({
      key: StoreCacheKey.AllProjects,
      loaderFn: loadProjects,
      query: allProjectsQuery,
      reference: projects,
      lastFetchInfo: {
        ...projectLastFetchTime.value[StoreCacheKey.AllProjects],
        forceRefresh,
      },
    })
  const validateCacheProject = ({ key: slug, forceRefresh }: CacheValidationRefreshRequest) => {
    validateCache<typeof project, typeof projectWithTasksQuery, typeof loadProject, PostgrestError>(
      {
        key: slug as string,
        filter: slug,
        loaderFn: loadProject,
        query: projectWithTasksQuery,
        reference: project,
        lastFetchInfo: {
          ...projectLastFetchTime.value[slug as string],
          forceRefresh,
        },
      },
    )
  }
  const forceRefreshOnProjects = () => {
    return timeStampExpired({
      timeStamp: projectLastFetchTime.value[StoreCacheKey.AllProjects].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
  }
  const clearCache = () => {
    console.log('called clearCache')
    loadProjects.clear()
    console.log('cleared Projects')
    loadProject.clear()
    console.log('cleared individual Projects')
  }
  const loadProjects = useMemoize(async (key: string) => {
    const { data, error, status } = await allProjectsQuery

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      projectLastFetchTime.value[StoreCacheKey.AllProjects] = { timeStamp: Date.now() }
    }

    return data
  })
  const getProjects = async () => {
    projects.value = null
    projects.value = await loadProjects(StoreCacheKey.AllProjects)
    validateCacheProjects(forceRefreshOnProjects())
  }
  const loadProject = useMemoize(async (slug: string) => {
    const { data, error, status } = await projectWithTasksQuery(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      projectLastFetchTime.value[slug] = { timeStamp: Date.now() }
    }

    return data
  })
  const getProject = async (slug: string) => {
    project.value = null
    project.value = await loadProject(slug)
    const forceRefresh = timeStampExpired({
      timeStamp: projectLastFetchTime.value[slug].timeStamp || 0,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
    validateCacheProject({ key: slug, forceRefresh })
  }
  const createProject = async (project: FormDataCreateProject) => {
    const { error, status } = await createProjectQuery(project)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    validateCacheProjects(true)
  }

  // TODO > conver to generic as task store use the same logic
  const updateProject = async () => {
    if (!project.value) return

    const { tasks, id, ...projectProps } = project.value
    projectProps.updated_at = toISOStringWithTimezone(new Date())
    const { count, data, error, status } = await updateProjectQuery(projectProps, id)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (count && count > 1) {
      useErrorStore().setError({ error: Error('Many projects updated...'), customCode: 500 })
    }
    validateCacheProject({ key: projectProps.slug, forceRefresh: true })
    validateCacheProjects(true)
  }

  const deleteProject = async () => {
    if (!project.value) return

    const { error } = await deleteProjectQuery(project.value.id)
    if (error) {
      useErrorStore().setError({ error })
    } else {
      console.log('deleteProject>no error')
    }
    await validateCacheProjects(true)
  }

  return {
    project,
    projects,
    loadProject,
    loadProjects,
    clearCache,
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  }
})
