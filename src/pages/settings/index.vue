<script setup lang="ts">
import { StoreCacheKey } from '@/types/StoreCacheKeys'

type CacheType = {
  name: string
  key: string | StoreCacheKey
}
const caches = [
  { name: 'Projects', key: StoreCacheKey.AllProjects },
  { name: 'Profiles', key: StoreCacheKey.AllProfiles },
  { name: 'Tasks', key: StoreCacheKey.AllTasksWithProjects },
]

const profileStore = useProfileStore()
const projectStore = useProjectStore()
const taskStore = useTaskStore()

const purge = (cache: CacheType) => {
  console.info('purge', cache)

  if (cache.key === StoreCacheKey.AllProfiles) {
    console.info('purge>match', cache.key)
    profileStore.clearCache()
  }
  if (cache.key === StoreCacheKey.AllProjects) {
    console.info('purge>match', cache.key)
    projectStore.clearCache()
  }
  if (cache.key === StoreCacheKey.AllTasksWithProjects) {
    console.info('purge>match', cache.key)
    taskStore.clearCache()
  }
}
</script>
<template>
  <Button v-for="cache in caches" :key="cache.key" @click="purge(cache)"
    >Invalidate {{ cache.name }}</Button
  >
</template>

<style scoped></style>
