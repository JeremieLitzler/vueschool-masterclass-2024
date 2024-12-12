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
