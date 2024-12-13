<script setup lang="ts">
import { taskFromIdWithProjectQuery } from '@/utils/supabase-queries'
import { type TaskFromIdWithProject } from '@/utils/supabase-queries'

const route = useRoute('/tasks/[id]')
const task = ref<TaskFromIdWithProject | null>(null)
const getProject = async (taskId: string) => {
  const { data, error } = await taskFromIdWithProjectQuery(taskId)
  if (error) console.error(error)

  console.log(data)

  task.value = data
}
await getProject(route.params.id)
watch(
  () => task.value?.name,
  () => (usePageStore().pageData.title = `Task: ${task.value?.name || 'Not Task found'}`),
)
</script>

<template>
  <Table>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ task?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ task?.description }}
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
      <TableCell>{{ task?.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in task?.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
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
