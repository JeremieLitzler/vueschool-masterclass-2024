<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" :use-slot="true">
    <template #cell-name="{ cell }">
      <RouterLink
        :to="`/tasks/${cell.row.original.id}`"
        class="text-left underline hover:bg-muted block w-full font-medium"
      >
        {{ cell.getValue() }}
      </RouterLink>
    </template>
    <template #cell-status="{ cell }">
      <div class="text-left font-medium">
        {{ cell.getValue() }}
      </div>
    </template>
    <template #cell-due_date="{ cell }">
      <div class="text-left font-medium">
        {{ cell.getValue() }}
      </div>
    </template>
    <template #cell-project_id="{ cell }">
      <RouterLink
        v-if="!cell.row.original.projects"
        :to="`/projects/create/${cell.row.original.id}`"
        class="text-left underline text-yellow-300 hover:bg-muted block w-full font-medium"
        >Link to project</RouterLink
      >
      <RouterLink
        v-else
        :to="`/projects/${cell.row.original.projects?.slug}`"
        class="text-left underline hover:bg-muted block w-full font-medium"
      >
        <!-- <pre>cell = {{ cell.row.projects }}</pre> -->
        {{ cell.row.original.projects?.name }}
      </RouterLink>
    </template>
    <template #cell-collaborators="{ cell }">
      <div class="text-left font-medium">
        {{ JSON.stringify(cell.getValue()) }}
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Tasks'

import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database.types'
import type { QueryData } from '@supabase/supabase-js'

const tasksWithProjectQuery = supabase.from('tasks').select(`
    *, 
    projects (
      id, name, slug
    )
  `)

type TasksWithProject = QueryData<typeof tasksWithProjectQuery>

const tasks = ref<TasksWithProject | null>(null)
const getTasks = async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from('tasks').select(`
    *, 
    projects (
      id, name, slug
    )
  `)

  if (error) console.error(error)

  tasks.value = data
}
await getTasks()

import type { ColumnDef } from '@tanstack/vue-table'
const columns: ColumnDef<TasksWithProject[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project'),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
  },
]
</script>

<style scoped></style>
