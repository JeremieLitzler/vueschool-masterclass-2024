<script setup lang="ts">
import type { FormDataCreateTask } from '@/types/FormDataCreateTask'
import type { FormSelectOption } from '@/types/FormSelectOption'

const sheetOpen = defineModel<boolean>()
const selectOptions = ref({
  projects: [] as FormSelectOption[],
  profiles: [] as FormSelectOption[],
})

const authStore = useAuthStore()
const { profile: currentUser } = storeToRefs(authStore)
const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
const profileStore = useProfileStore()
const { profiles } = storeToRefs(profileStore)
const { createTask } = useTaskStore()

const setProjectsOptions = async () => {
  await projectStore.getProjects()

  if (!projects.value) return

  projects.value.forEach((project) => {
    selectOptions.value.projects.push({ label: project.name, value: project.id })
  })
}

const setProfilesOptions = async () => {
  await profileStore.getProfiles()

  if (!profiles.value) return

  profiles.value.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}

await Promise.all([setProjectsOptions(), setProfilesOptions()])

const submitNewTask = async (formData: FormDataCreateTask) => {
  const task = { ...formData }
  task.collaborators = [currentUser.value!.id]
  console.log('submitNewTask', task)

  await createTask(task)
  sheetOpen.value = false
}
</script>
<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Let's create a new task</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        @submit="submitNewTask"
        submit-label="Create"
        :config="{ validationVisibility: 'submit' }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          validation="required|lenght:3,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="Assignee"
          placeholder="Select an Assignee"
          :options="selectOptions.profiles"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a Project"
          :options="selectOptions.projects"
          validation="required"
        />
        <FormKit
          type="date"
          name="due_date"
          id="due_date"
          label="Due Date"
          placeholder="Select Due Date"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          validation="0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
