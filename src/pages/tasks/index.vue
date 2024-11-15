<template>
  <div>
    <h1>All tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task?.id">{{ task?.name }}</li>
    </ul>
    <RouterLink class="underline" to="/">Go back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '@/types/database.types'

const tasks = ref<Tables<'tasks'>[] | null>(null)
;(async () => {
  console.log('Getting projects...')

  const { data, error } = await supabase.from('tasks').select()

  if (error) console.error(error)

  tasks.value = data
})()
</script>

<style scoped></style>
