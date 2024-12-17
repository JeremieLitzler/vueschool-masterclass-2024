<script setup lang="ts">
// TODO > Be careful about the source value.
// You can't use dual-binding (v-model) with optional chaining (object?.property)
// See https://stackoverflow.com/questions/74450389/how-do-i-use-vue3-typescript-v-model-on-textfield-error-invalid-assignment/74450619#74450619
const userInput = defineModel<string>()

const emits = defineEmits<{
  (event: '@update'): void
}>()

const update = () => {
  emits('@update')
}
// const props = defineProps<{
//   type: string
//   name: string
// }>()
</script>
<template>
  <!-- TODO > @keyup.enter="($event.target as HTMLInputElement).blur()" 
              requires an explicit cast of $event.target -->
  <input
    class="app-in-place-edit-input"
    type="text"
    v-model="userInput"
    @blur="update"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>

<style scoped>
.app-in-place-edit-input {
  @apply w-full p-1 bg-transparent focus:outline-double focus:border-separate focus:bg-slate-100 focus:text-black focus:rounded-sm;
}
</style>
