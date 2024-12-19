import type { CacheValidation } from '@/types/CacheValidation'
import type { Tables } from '@/types/database.types'
import type { FormDataCreateProject } from '@/types/FormDataCreateProject'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import type { UpdateSupabaseEntityRequest } from '@/types/UpdateSupabaseEntityRequest'
import { validateCache } from '@/utils/cache-validation'
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
  const projects = ref<AllProjects | null>()
  const project = ref<ProjectWithTasks | null>(null)

  const validateCacheProjects = async () =>
    validateCache<typeof projects, typeof allProjectsQuery, typeof loadProjects, PostgrestError>({
      key: StoreCacheKey.AllProjects,
      loaderFn: loadProjects,
      query: allProjectsQuery,
      reference: projects,
    })

  const loadProjects = useMemoize(async (key: string) => await allProjectsQuery)
  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects(StoreCacheKey.AllProjects)
    if (error) {
      useErrorStore().setError({ error: error, customCode: status })
    }
    if (data) {
      projects.value = data
    }
    validateCacheProjects()
  }

  const loadProject = useMemoize(async (slug: string) => await projectWithTasksQuery(slug))
  const getProject = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    project.value = data
    validateCacheProject(slug)
  }

  const validateCacheProject = (slug: string) => {
    validateCache<typeof project, typeof projectWithTasksQuery, typeof loadProject, PostgrestError>(
      {
        key: slug,
        filter: slug,
        loaderFn: loadProject,
        query: projectWithTasksQuery,
        reference: project,
      },
    )
  }

  const createProject = async (project: FormDataCreateProject) => {
    const { error, status } = await createProjectQuery(project)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    validateCacheProjects()
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
    validateCacheProject(projectProps.slug)
  }

  const deleteProject = async () => {
    if (!project.value) return

    const { error } = await deleteProjectQuery(project.value.id)
    if (error) {
      useErrorStore().setError({ error })
    } else {
      console.log('deleteProject>no error')
    }
    await validateCacheProjects()
  }

  return {
    project,
    projects,
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  }
})
