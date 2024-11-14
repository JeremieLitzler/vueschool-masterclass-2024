<template>
  <div>
    <h1>Projects Page</h1>
    <ul>
      <li v-for="project in projects" :key="project?.id">{{ project?.name }}</li>
    </ul>
    <RouterLink to="/">Go back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { DatabaseTable } from '@/enums/databaseTable'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

const projects = ref<any | null>([])
;(async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from(DatabaseTable.projects).select()

  if (error) console.error(error)

  projects.value = data
  console.log('Got Projects', projects)
})()
</script>

<style scoped></style>
