<script setup lang="ts">
import AppErrorPage from '@/components/AppErrorPage.vue'

useErrorStore().setError()
</script>

<template>
  <AppErrorPage />
</template>
