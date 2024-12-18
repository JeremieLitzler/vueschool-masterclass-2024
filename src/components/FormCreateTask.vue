<script setup lang="ts">
import type { FormDataCreateTask } from '@/types/FormDataCreateTask'
import type { FormSelectOption } from '@/types/FormSelectOption'

const sheetOpen = defineModel<boolean>()
const selectOptions = ref({
  projects: [] as FormSelectOption[],
  profiles: [] as FormSelectOption[],
})

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
const setProjectsOptions = async () => {
  await projectStore.getProjects()

  if (!projects.value) return

  projects.value.forEach((project) => {
    selectOptions.value.projects.push({ label: project.name, value: project.id })
  })
}

const profileStore = useProfileStore()
const { profiles } = storeToRefs(profileStore)
const setProfilesOptions = async () => {
  await profileStore.getProfiles()

  if (!profiles.value) return

  profiles.value.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}

await Promise.all([setProjectsOptions(), setProfilesOptions()])

const createTask = async (formData: FormDataCreateTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000)
  })
}
</script>
<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Let's create a new task</SheetTitle>
      </SheetHeader>
      <FormKit type="form" @submit="createTask" submit-label="Create">
        <FormKit type="text" name="name" id="name" label="Name" />
        <FormKit type="textarea" name="description" id="description" label="Description" />
        <FormKit
          type="select"
          name="assignee"
          id="assignee"
          label="Assignee"
          placeholder="Select an Assignee"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a Project"
          :options="selectOptions.projects"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
