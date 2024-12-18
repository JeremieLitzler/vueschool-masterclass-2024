import type { Tables } from '@/types/database.types'
import type { FormDataCreateTask } from '@/types/FormDataCreateTask'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { validateCache } from '@/utils/cache-validation'
import { toISOStringWithTimezone } from '@/utils/date-format'
import {
  createTaskQuery,
  taskFromIdWithProjectQuery,
  tasksWithProjectQuery,
  updateTaskQuery,
  type TaskFromIdWithProject,
  type TasksWithProject,
} from '@/utils/supabase-queries'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useTaskStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProject | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectQuery)
  const getTasks = async () => {
    tasks.value = null
    const { data, error, status } = await loadTasks('tasks')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    tasks.value = data
    validateCacheTasks()
  }

  const validateCacheTasks = async () => {
    validateCache<typeof tasks, typeof tasksWithProjectQuery, typeof loadTasks, PostgrestError>({
      key: StoreCacheKey.AllTasksWithProjects as string,
      reference: tasks,
      query: tasksWithProjectQuery,
      loaderFn: loadTasks,
    })
  }
  const validateCacheTask = (id: string) => {
    validateCache<typeof task, typeof taskFromIdWithProjectQuery, typeof loadTask, PostgrestError>({
      key: getTaskKey(id),
      filter: id,
      reference: task,
      query: taskFromIdWithProjectQuery,
      loaderFn: loadTask,
    })
  }
  const task = ref<TaskFromIdWithProject | null>(null)
  const getTaskKey = (id: string) => `task-id-${id}`
  const loadTask = useMemoize(async (id: string) => await taskFromIdWithProjectQuery(id), {
    // TODO > see https://vueuse.org/core/useMemoize/#resolving-cache-key
    getKey: (id) => getTaskKey(id),
  })
  const getTask = async (id: string) => {
    task.value = null
    const { data, error, status } = await loadTask(id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    task.value = data
    validateCacheTask(id)
  }

  const createTask = async (task: FormDataCreateTask) => {
    const { error, status } = await createTaskQuery(task)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    validateCacheTasks()
  }

  const updateTask = async () => {
    if (!task.value) return

    const { projects, id, ...taskProps } = task.value
    taskProps.updated_at = toISOStringWithTimezone(new Date())
    const { count, data, error, status } = await updateTaskQuery(taskProps, id)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    if (count && count > 1) {
      useErrorStore().setError({ error: Error('Many projects updated...'), customCode: 500 })
    }
    validateCacheTask(id.toString())
  }

  return {
    task,
    tasks,
    getTask,
    getTasks,
    createTask,
    updateTask,
  }
})
