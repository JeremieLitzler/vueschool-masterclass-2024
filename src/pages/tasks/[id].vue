<script setup lang="ts">
import router from '@/router'

const { id } = useRoute('/tasks/[id]').params

const taskStore = useTaskStore()
const { task } = storeToRefs(taskStore)
const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

watch(
  () => task.value?.name,
  () => {
    const pageTitle = `Task: ${task.value?.name || 'Not Task found'}`
    usePageStore().pageData.title = pageTitle
    // TODO > create issue with reproduction example: https://github.com/nuxt/vue-meta/issues/new?template=Blank+issue
    // useMeta({ title: '' })
  },
)

await taskStore.getTask(id)
if (task.value) {
  console.log('getProfile>task.id', task.value.profile_id)

  await profileStore.getProfile({ column: 'id', value: task.value.profile_id })
}
// Update logic
// const updating = ref(false)
const updateTask = async () => {
  // updating.value = true
  await taskStore.updateTask()
  // updating.value = false
}

// Delete Task
const deleting = ref(false)
const deleteTask = async () => {
  deleting.value = true
  console.log('deleteTask>deleting...')
  await taskStore.deleteTask()
  console.log('deleteTask>deleted!')
  router.push('/tasks')
}
</script>

<template>
  <metainfo></metainfo>
  <!-- TODO > To use v-model on the cell, we need to check the project is truthy first -->
  <div class="flex flex-col justify-center items-center">
    <Button variant="destructive" class="self-end mt-3 w-full max-w-40" @click="deleteTask">
      <iconify-icon
        v-if="deleting"
        icon="lucide:loader"
        class="text-white mr-1 animate-spin"
      ></iconify-icon>
      <iconify-icon v-else icon="lucide:trash-2" class="text-white mr-1"></iconify-icon>
      Delete Task</Button
    >
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
        <TableCell><AppAvatarLink :profile /></TableCell>
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
        <TableCell
          ><AppInputLiveEditStatus v-model="task.status" @@commit="updateTask"
        /></TableCell>
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
  </div>
</template>
<style scoped></style>
