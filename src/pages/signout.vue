<script setup lang="ts">
useAuthStore().logout()
const router = useRouter()
router.push('/')
</script>
<template></template>
