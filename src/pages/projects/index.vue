<template>
  <div>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </div>
</template>

<script setup lang="ts">
usePageStore().pageData.title = 'Projects'

import { allProjectsQuery } from '@/utils/supabaseQueries'
import type { AllProjects } from '@/utils/supabaseQueries'
const projects = ref<AllProjects | null>(null)
const getProjects = async () => {
  console.log('Getting projects...')

  const { data, error } = await allProjectsQuery

  if (error) console.error(error)

  projects.value = data
}
await getProjects()

import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
const columns: ColumnDef<AllProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      // When using render functions, the way we pass children to elements is different than passing them to a custom component.
      // With elements, we can pass them straightaway to the h() function like so:
      // - h("p", "I'm text inside a paragraph tag").
      // - h("p", { class: "example-class" } ,"I'm text inside a paragraph tag").
      //
      // While with custom components, we must pass them as functions:
      // - h(CustomComponent, () => "I'm text inside a custom component").
      // - h(CustomComponent, { class: "example-class" } ,() => "I'm text inside a custom component").
      //
      // You can read more about it in the official docs: https://vuejs.org/guide/extras/render-function#passing-slots
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left underline hover:bg-muted block w-full font-medium',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<style scoped></style>
