<template>
  <div>
    <h1>Project Name: {{ route.params?.slug }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>
