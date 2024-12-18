import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database.types'
import type { RegistrationData } from '@/types/RegistrationData'
import type { RequestProfile } from '@/types/RequestProfile'
import type { UpdateSupabaseEntityRequest } from '@/types/UpdateSupabaseEntityRequest'
import type { QueryData, User } from '@supabase/supabase-js'
import { asyncComputed } from '@vueuse/core'

export const allProjectsQuery = supabase
  .from('projects')
  .select()
  .order('updated_at', { ascending: false, nullsFirst: false })
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

export const updateProjectQuery = async (project = {}, id: number) => {
  const result = await supabase.from('projects').update(project).eq('id', id)
  return result // {count, data, error, status}
}

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

export const updateTaskQuery = async (task: {}, id: number) => {
  const result = await supabase.from('tasks').update(task).eq('id', id)
  return result // {count, data, error, status}
}

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

export const userProfileQuery = async ({ column, value }: RequestProfile) => {
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

export const allProfilesQuery = supabase
  .from('profiles')
  .select()
  .order('updated_at', { ascending: false, nullsFirst: false })
export type AllProfiles = QueryData<typeof allProfilesQuery>
