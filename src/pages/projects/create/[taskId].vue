<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute('/projects/create/[taskId]')
usePageStore().pageData.title = `Create a project for task (ID: ${route.params.taskId})`
</script>

<style scoped></style>
