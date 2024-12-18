<script setup lang="ts">
import { taskFromIdWithProjectQuery } from '@/utils/supabase-queries'
import { type TaskFromIdWithProject } from '@/utils/supabase-queries'

const { id } = useRoute('/tasks/[id]').params
const taskStore = useTaskStore()
const { task } = storeToRefs(taskStore)

watch(
  () => task.value?.name,
  () => (usePageStore().pageData.title = `Task: ${task.value?.name || 'Not Task found'}`),
)

await taskStore.getTask(id)
// Update logic
const updateTask = () => {
  taskStore.updateTask()
}
</script>

<template>
  <!-- TODO > To use v-model on the cell, we need to check the project is truthy first -->
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInputLiveEditText type="text" v-model="task.name" @@commit="updateTask" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInputLiveEditText type="textarea" v-model="task.description" @@commit="updateTask" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell>No Assignee</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell
        ><span v-if="!task?.projects">No project.</span
        ><RouterLink
          v-else
          :to="`/projects/${task.projects.slug}`"
          class="text-left underline hover:bg-muted block w-full font-medium"
          >{{ task.projects.name }}</RouterLink
        >
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell><AppInputLiveEditStatus v-model="task.status" @@commit="updateTask" /></TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <AppListCollaborators :collaborator-ids="task.collaborators" />
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4"> Comments </TableHead>

      <TableCell>
        <!-- {{ task?.comments || 'No comments yet.' }} -->

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          >
          </textarea>
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:paperclip"></iconify-icon>
                <span class="sr-only">Attach file</span>
              </button>
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:image-up"></iconify-icon>

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>
<style scoped></style>
