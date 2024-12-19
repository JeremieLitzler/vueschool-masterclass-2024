import type { CacheValidationKeyInfo } from '@/types/CacheValidationInfo'
import type { CacheValidationRefreshRequest } from '@/types/CacheValidationRefreshRequest'
import type { Tables } from '@/types/database.types'
import type { FormDataCreateTask } from '@/types/FormDataCreateTask'
import { StoreCacheKey } from '@/types/StoreCacheKeys'
import { timeStampExpired, validateCache } from '@/utils/cache-validation'
import { toISOStringWithTimezone } from '@/utils/date-format'
import {
  createTaskQuery,
  deleteTaskQuery,
  taskFromIdWithProjectQuery,
  tasksWithProjectQuery,
  updateTaskQuery,
  type TaskFromIdWithProject,
  type TasksWithProject,
} from '@/utils/supabase-queries'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMemoize } from '@vueuse/core'

export const useTaskStore = defineStore('tasks-store', () => {
  const GET_METHODS_EXPIRATION = 900 // 15 min
  const tasks = ref<TasksWithProject | null>(null)
  const task = ref<TaskFromIdWithProject | null>(null)
  const taskLastFetchTime = ref<CacheValidationKeyInfo>({})

  const getTaskKey = (id: string) => `task-id-${id}`

  const validateCacheTasks = async (forceRefresh: boolean = false) => {
    validateCache<typeof tasks, typeof tasksWithProjectQuery, typeof loadTasks, PostgrestError>({
      key: StoreCacheKey.AllTasksWithProjects as string,
      reference: tasks,
      query: tasksWithProjectQuery,
      loaderFn: loadTasks,
      lastFetchInfo: {
        ...taskLastFetchTime.value[StoreCacheKey.AllTasksWithProjects],
        forceRefresh,
      },
    })
  }
  const validateCacheTask = ({ key: id, forceRefresh }: CacheValidationRefreshRequest) => {
    validateCache<typeof task, typeof taskFromIdWithProjectQuery, typeof loadTask, PostgrestError>({
      key: getTaskKey(id as string),
      filter: id,
      reference: task,
      query: taskFromIdWithProjectQuery,
      loaderFn: loadTask,
      lastFetchInfo: { ...taskLastFetchTime.value[getTaskKey(id as string)], forceRefresh },
    })
  }
  const forceRefreshOnTasks = () => {
    return timeStampExpired({
      timeStamp: taskLastFetchTime.value[StoreCacheKey.AllTasksWithProjects].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
  }
  const clearCache = () => {
    console.log('called clearCache')
    loadTasks.clear()
    console.log('cleared Tasks')
    loadTask.clear()
    console.log('cleared individual Tasks')
  }
  const loadTasks = useMemoize(async (key: string) => {
    const { data, error, status } = await tasksWithProjectQuery

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      taskLastFetchTime.value[StoreCacheKey.AllTasksWithProjects] = { timeStamp: Date.now() }
    }

    return data
  })
  const getTasks = async () => {
    tasks.value = null
    tasks.value = await loadTasks('tasks')

    validateCacheTasks(forceRefreshOnTasks())
  }
  const loadTask = useMemoize(
    async (id: string) => {
      const { data, error, status } = await taskFromIdWithProjectQuery(id)

      if (error) {
        useErrorStore().setError({ error, customCode: status })
      } else {
        taskLastFetchTime.value[getTaskKey(id)] = { timeStamp: Date.now() }
      }

      return data
    },
    {
      // TODO > see https://vueuse.org/core/useMemoize/#resolving-cache-key
      getKey: (id) => getTaskKey(id),
    },
  )
  const getTask = async (id: string) => {
    task.value = null
    task.value = await loadTask(id)
    const forceRefresh = timeStampExpired({
      timeStamp: taskLastFetchTime.value[getTaskKey(id)].timeStamp,
      invalidateAfterSeconds: GET_METHODS_EXPIRATION,
    })
    validateCacheTask({ key: id, forceRefresh })
  }
  const createTask = async (task: FormDataCreateTask) => {
    const { error, status } = await createTaskQuery(task)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    validateCacheTasks(true)
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
    validateCacheTask({ key: id, forceRefresh: true })
    validateCacheTasks(true)
  }
  const deleteTask = async () => {
    if (!task.value) return

    const { error } = await deleteTaskQuery(task.value.id)
    if (error) {
      useErrorStore().setError({ error })
    } else {
      console.log('deleteTask>no error')
    }
    await validateCacheTasks(true)
  }

  return {
    task,
    tasks,
    loadTask,
    loadTasks,
    clearCache,
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }
})
