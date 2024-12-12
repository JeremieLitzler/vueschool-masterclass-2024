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
      <div class="text-left font-medium">
        {{ cell.getValue() }}
      </div>
    </template>
    <template #cell-collaborators="{ cell }">
      <div class="text-left font-medium">
        {{ JSON.stringify(cell.getValue()) }}
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database.types'

const tasks = ref<Tables<'tasks'>[] | null>(null)
const getTasks = async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from('tasks').select()

  if (error) console.error(error)

  tasks.value = data
}

await getTasks()

import type { ColumnDef } from '@tanstack/vue-table'
const columns: ColumnDef<Tables<'tasks'>>[] = [
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
