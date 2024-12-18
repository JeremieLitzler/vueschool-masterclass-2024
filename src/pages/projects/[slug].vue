<script setup lang="ts">
/**
 * TODO: Passing the route path to useRoute solve the TypeScript error on accessing `slug` param
 */
const { slug } = useRoute('/projects/[slug]').params
const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)

// TODO > make sure to place the watch before the async method that load the data!
// Otherwise, the watcher never gets called
watch(
  () => project.value?.name,
  () => {
    console.log('watch project', project.value)

    usePageStore().pageData.title = `Project: ${project.value?.name || 'Not project found'}`
  },
)

await projectStore.getProject(slug)

// Update logic
const updateProject = () => {
  projectStore.updateProject()
}
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInputLiveEditText type="text" v-model="project.name" @@commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInputLiveEditText
          type="textarea"
          v-model="project.description"
          @@commit="updateProject"
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Slug </TableHead>
      <TableCell>
        {{ project.slug }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <!-- TODO > need to pull the valid list from the Supabase type -->
      <TableCell>
        <AppInputLiveEditStatus v-model="project.status" @@commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <!-- TODO > need to pull the valid list of existing users -->
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <AppListCollaborators :collaborator-ids="project.collaborators" />
      </TableCell>
    </TableRow>
  </Table>

  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell class="p-0"
                ><RouterLink
                  :to="`/tasks/${task.id}`"
                  class="text-left underline hover:bg-muted block w-full font-medium p-4"
                  >{{ task.name }}</RouterLink
                ></TableCell
              >
              <TableCell
                ><AppInputLiveEditStatus v-model="task.status" :readonly="true"
              /></TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
