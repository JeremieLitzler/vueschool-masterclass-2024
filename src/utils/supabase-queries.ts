import { supabase } from '@/lib/supabaseClient'
import type { RegistrationData } from '@/types/RegistrationData'
import type { QueryData, User } from '@supabase/supabase-js'

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

export const userProfileQuery = async ({ userId }: { userId: undefined | string }) => {
  const result = await supabase.from('profiles').select().eq('id', userId!).single()
  return result
}
export type UserProfile = QueryData<ReturnType<typeof userProfileQuery>>
