import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

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
      d,
      name,
      status,
      due_date  
    )
  `,
    )
    .eq('slug', slug)
    .single()
export type ProjectWithTasks = QueryData<ReturnType<typeof projectWithTasksQuery>>
