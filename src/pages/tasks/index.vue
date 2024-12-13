<template>
  <!-- 
    This demonstrates that the DataTable could be entirely customized
    using named and scoped slots.
    
    Slot in Vue.js is important to understand.

    This is a great example.
  -->
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
import { columns } from '@/utils/datatable-columns-task'
import { tasksWithProjectQuery } from '@/utils/supabase-queries'
import type { TasksWithProject } from '@/utils/supabase-queries'

const tasks = ref<TasksWithProject | null>(null)
const getTasks = async () => {
  console.log('Getting projects...')

  const { data, error, status } = await tasksWithProjectQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  tasks.value = data
}
await getTasks()
hello
</script>

<style scoped></style>
