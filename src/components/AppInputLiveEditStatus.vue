<script setup lang="ts">
import type { Database } from '@/types/database.types'

const value = defineModel<Database['public']['Enums']['current_status']>()
</script>
<template>
  <div class="text-3xl cursor-pointer">
    <iconify-icon v-if="value === 'completed'" icon="lucide-check" class="text-green-500" />
    <iconify-icon v-else icon="lucide-dot" class="text-orange-500" />
  </div>
</template>

<style scoped></style>
