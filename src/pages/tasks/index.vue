<template>
  <!-- 
    This demonstrates that the DataTable could be entirely customized
    using named and scoped slots.
    
    Slot in Vue.js is important to understand.

    This is a great example.
  -->
  <metainfo></metainfo>
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
        <AppInputLiveEditStatus :v-model="cell.getValue() || ''" :readonly="true" />
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
        <AppListCollaborators :collaborator-ids="cell.getValue() as string[]" />
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { columns } from '@/utils/datatable-columns-task'

usePageStore().pageData.title = 'Tasks'
useMeta({ title: 'All Tasks | Pulse' })

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
await useTaskStore().getTasks()

// TODO > computed or :v-model
const taskStatus = computed<string>((status) => {
  console.log('taskStatus>computed: ', status)
  return status || ''
})
</script>

<style scoped></style>
