<script setup lang="ts">
import type { Database } from '@/types/database.types'

const status = defineModel<Database['public']['Enums']['current_status'] | string | undefined>()
// TODO > From Vue 3.5, no need to use withDefaults to assign a default value to props
const { readonly = false } = defineProps<{ readonly?: boolean }>()
const emits = defineEmits<{
  (event: '@commit'): void
}>()
const toggleValue = () => {
  if (readonly) return

  if (status.value === 'completed') status.value = 'in-progress'
  if (status.value === 'todo') status.value = 'in-progress'
  if (status.value === 'in-progress') status.value = 'completed'
  emits('@commit')
}
</script>
<template>
  <div class="text-3xl cursor-pointer" @click="toggleValue" @keyup.enter="toggleValue" tabindex="0">
    <Transition mode="out-in">
      <iconify-icon
        v-if="status === 'todo'"
        icon="lucide-circle-dot"
        class="text-gray-500"
        :title="status"
      />
      <iconify-icon
        v-else-if="status === 'completed'"
        icon="lucide-circle-check"
        class="text-green-500"
        :title="status"
      />
      <iconify-icon v-else icon="lucide-circle-dashed" class="text-orange-500" :title="status" />
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
