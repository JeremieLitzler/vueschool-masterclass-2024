<template>
  <div>
    <h1>Task Name: xxx {{ route.params?.id }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>
