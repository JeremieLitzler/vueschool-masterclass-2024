<template>
  <div>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Projects'

import { useProjectStore } from '@/stores/project'
import { columns } from '@/utils/datatable-columns-project'
import type { AllProjects } from '@/utils/supabase-queries'
const projects = ref<AllProjects | null>(null)
const getProjects = async () => {
  projects.value = await useProjectStore().getProjects()
}
await getProjects()
</script>

<style scoped></style>
