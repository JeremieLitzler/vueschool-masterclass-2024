<template>
  <div>
    <h1>All projects</h1>
    <ul>
      <li v-for="project in projects" :key="project?.id">{{ project?.name }}</li>
    </ul>
    <RouterLink class="underline" to="/">Go back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '@/types/database.types'

const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from('projects').select()

  if (error) console.error(error)

  projects.value = data
})()
</script>

<style scoped></style>
