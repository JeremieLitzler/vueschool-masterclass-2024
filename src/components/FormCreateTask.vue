<script setup lang="ts">
import type { FormDataCreateTask } from '@/types/FormDataCreateTask'
import { resolve } from 'path'

const sheetOpen = defineModel<boolean>()
const formData = ref<FormDataCreateTask>({ name: '', description: '' })
const possibleAssignees = ref([{ label: 'Toto', value: 1 }])
const possibleProjects = ref([{ label: 'Toto', value: 1 }])
// const projectStore = useProjectStore()
// const {projects} = storeToRefs(projectStore)
// const existingProjects: {label: string, value: string}[] = computed<{ label: string, value: number }>(() => {
//   const possipleProjects = projects.value ? projects.value?.map(project => { label: project.name, value: project.id }) : []
//   return possipleProjects
// })
// await projectStore.getProjects()

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
        <FormKit type="text" name="name" id="name" label="Name" v-model="formData.name" />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          v-model="formData.description"
        />
        <FormKit
          type="select"
          name="assignee"
          id="assignee"
          label="Assignee"
          placeholder="Select an Assignee"
          :options="possibleAssignees"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a Project"
          :options="possibleProjects"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
