import { supabase } from '@/lib/supabaseClient'
import type { RegistrationData } from '@/types/RegistrationData'
import type { QueryData, User } from '@supabase/supabase-js'
import { asyncComputed } from '@vueuse/core'

export const allProjectsQuery = supabase.from('projects').select()
export type AllProjects = QueryData<typeof allProjectsQuery>

export const tasksWithProjectQuery = supabase.from('tasks').select(`
    *, 
    projects (
      id, name, slug
    )
  `)
export type TasksWithProject = QueryData<typeof tasksWithProjectQuery>

export const projectWithTasksQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    *,
    tasks (
      id,
      name,
      status,
      due_date  
    )
  `,
    )
    .eq('slug', slug)
    .single()
export type ProjectWithTasks = QueryData<ReturnType<typeof projectWithTasksQuery>>
export const taskFromIdWithProjectQuery = (taskId: string) =>
  supabase
    .from('tasks')
    .select(
      `
    *, 
    projects (
      id, name, slug
    )
  `,
    )
    .eq('id', taskId)
    .single()
export type TaskFromIdWithProject = QueryData<ReturnType<typeof taskFromIdWithProjectQuery>>

export const insertUserProfileQuery = async ({
  user,
  formData,
}: {
  user: User
  formData: RegistrationData
}) => {
  const result = await supabase.from('profiles').insert({
    id: user.id,
    username: formData.username,
    full_name: `${formData.firstName} ${formData.lastName}`,
  })
  return result
}

export const userProfileQuery = async ({ column, value }: { column: string; value: string }) => {
  const result = await supabase.from('profiles').select().eq(column, value).single()
  return result
}
export type UserProfile = QueryData<ReturnType<typeof userProfileQuery>>

export const profilesByIdsQuery = async (ids: string[]) => {
  const result = await supabase
    .from('profiles')
    .select('username, avatar_url, id, full_name')
    .in('id', ids)
  return result
}
export type Collabs = QueryData<ReturnType<typeof profilesByIdsQuery>>
