<template>
  <div>
    <h1>Projects Page</h1>
    <pre>{{ projects }}</pre>
    <RouterLink to="/">Go back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { DatabaseTable } from '@/enums/databaseTable'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'

const projects: any = ref([])
;(async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from(DatabaseTable.projects).select()

  if (error) console.error(error)

  projects = data
  console.log('Got Projects', projects)
})()
</script>

<style scoped></style>
