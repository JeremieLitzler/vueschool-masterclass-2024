<script setup lang="ts">
import type { Database } from '@/types/database.types'

const status = defineModel<Database['public']['Enums']['current_status']>()
// TODO > From Vue 3.5, no need to use withDefaults to assign a default value to props
const { readonly = false } = defineProps<{ readonly?: boolean }>()
const emits = defineEmits<{
  (event: '@commit'): void
}>()
const toggleValue = () => {
  if (readonly) return
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
