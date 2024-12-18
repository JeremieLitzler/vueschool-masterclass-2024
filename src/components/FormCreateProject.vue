<script setup lang="ts">
import type { FormDataCreateProject } from '@/types/FormDataCreateProject'

const sheetOpen = defineModel<boolean>()

const authStore = useAuthStore()
const { profile: currentUser } = storeToRefs(authStore)
const { createProject } = useProjectStore()

const submitNewProject = async (formData: FormDataCreateProject) => {
  const project = { ...formData }
  project.collaborators = [currentUser.value!.id]
  console.log('submitNewProject', project)

  await createProject(project)
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
        @submit="submitNewProject"
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
        <FormKit type="text" name="slug" id="slug" label="Slug" validation="required|lenght:3,60" />
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
