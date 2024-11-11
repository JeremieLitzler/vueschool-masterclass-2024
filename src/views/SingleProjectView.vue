<template>
  <div>
    <h1>Project Name (id: {{ route.params?.id }})</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped></style>
