<template>
  <div>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Projects'

import { columns } from '@/utils/datatable-columns-project'
import { allProjectsQuery } from '@/utils/supabase-queries'
import type { AllProjects } from '@/utils/supabase-queries'
const projects = ref<AllProjects | null>(null)
const getProjects = async () => {
  console.log('Getting projects...')

  const { data, error, status } = await allProjectsQuery

  if (error) {
    useErrorStore().setError({ error: error, customCode: status })
  }

  projects.value = data
}
await getProjects()
</script>

<style scoped></style>
