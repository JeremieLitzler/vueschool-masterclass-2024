import type { Tables } from '@/types/database.types'
import { tasksWithProjectQuery, type TasksWithProject } from '@/utils/supabase-queries'
import { useMemoize } from '@vueuse/core'

export const useTaskStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProject | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectQuery)
  const getTasks = async () => {
    const { data, error, status } = await loadTasks('tasks')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
    return data
  }

  return {
    getTasks,
  }
})
