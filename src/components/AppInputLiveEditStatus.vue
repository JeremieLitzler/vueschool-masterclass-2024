<script setup lang="ts">
import type { Database } from '@/types/database.types'

const status = defineModel<Database['public']['Enums']['current_status']>()

const emits = defineEmits<{
  (event: '@commit'): void
}>()
const toggleValue = () => {
  status.value = status.value === 'completed' ? 'in-progress' : 'completed'
  emits('@commit')
}
</script>
<template>
  <div class="text-3xl cursor-pointer" @click="toggleValue">
    <Transition mode="out-in">
      <iconify-icon v-if="status === 'completed'" icon="lucide-check" class="text-green-500" />
      <iconify-icon v-else icon="lucide-dot" class="text-orange-500" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
v-leave-active {
  transition: transform 0.2s;
}

.v-enter-from,
v-leave-to {
  transform: scale(0.3);
}
</style>
