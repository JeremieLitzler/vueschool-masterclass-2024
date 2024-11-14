<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { DatabaseTable } from '@/enums/databaseTable'
import { supabase } from '@/lib/supabaseClient'
;(async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from(DatabaseTable.projects).select()

  if (error) console.error(error)

  console.log('Got Projects', data)
})()
</script>

<style scoped></style>
