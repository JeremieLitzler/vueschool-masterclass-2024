<template>
  <div>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Projects'

import { useProjectStore } from '@/stores/project'
import { columns } from '@/utils/datatable-columns-project'
import type { AllProjects } from '@/utils/supabase-queries'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
// projects is reactive from the project store.
// as soon as the getProjects is called and done,
// the projects are loaded
await useProjectStore().getProjects()

const { groupedCollabs, getGroupedCollabs } = useCollabs()
await getGroupedCollabs(projects.value)

const columnsWithCollabs = columns(groupedCollabs)
</script>

<style scoped></style>
