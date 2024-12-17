<script setup lang="ts">
// TODO > Be careful about the source value.
// You can't use dual-binding (v-model) with optional chaining (object?.property)
// See https://stackoverflow.com/questions/74450389/how-do-i-use-vue3-typescript-v-model-on-textfield-error-invalid-assignment/74450619#74450619
const value = defineModel()
// const props = defineProps<{
//   type: string
//   name: string
// }>()
</script>
<template>
  <input class="app-in-place-edit-input" type="text" v-model="value" />
</template>

<style scoped>
.app-in-place-edit-input {
  @apply w-full p-1 bg-transparent focus:outline-double focus:border-separate focus:bg-slate-100 focus:text-black focus:rounded-sm;
}
</style>
