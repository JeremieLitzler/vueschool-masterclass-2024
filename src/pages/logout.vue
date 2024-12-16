<script setup lang="ts">
import { RouterPathEnum } from '@/types/RouterPathEnum'

useAuthStore().logout()
const router = useRouter()
router.push(RouterPathEnum.Login)
</script>
<template></template>
