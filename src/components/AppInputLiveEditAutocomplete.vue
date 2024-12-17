<script setup lang="ts">
const { list } = defineProps<{
  list: Option[]
}>()

defineEmits<{
  (event: '@update-value'): void
}>()
</script>
<template>
  <!-- TODO > The keyboard controls doesn't work to select a value from the list -->
  <!-- TODO > The filter doesn't work -->
  <!-- TODO > The selection seems to work from the list, but not the emit of the proper value -->
  <!-- <Autocomplete
    class="app-in-place-edit-input"
    :options="list"
    @@update:value="$emit('@update-value')"
  /> -->
</template>

<style scoped>
:deep(.app-in-place-edit-input) {
  @apply w-full p-1 bg-transparent focus:outline-double focus:border-separate focus:bg-slate-100 focus:text-black focus:rounded-sm;
}
</style>
