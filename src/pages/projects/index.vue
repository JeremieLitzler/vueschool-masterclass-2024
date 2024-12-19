<template>
  <metainfo></metainfo>
  <div>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Projects'
useMeta({ title: 'All Projects | Pulse' })

import { useProjectStore } from '@/stores/project'
import { columns } from '@/utils/datatable-columns-project'
import type { AllProjects } from '@/utils/supabase-queries'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)
// projects is reactive from the project store.
// as soon as the getProjects is called and done,
// the projects are loaded
await projectStore.getProjects()

const { groupedCollabs, getGroupedCollabs } = useCollabs()
getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>

<style scoped></style>
