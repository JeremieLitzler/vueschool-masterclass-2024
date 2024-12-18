<script setup lang="ts">
const { collaboratorIds } = defineProps<{ collaboratorIds: string[] | null }>()
const { getProfilesByIds } = useCollabs()
const collabs = collaboratorIds ? await getProfilesByIds(collaboratorIds) : []
</script>
<template>
  <div class="flex">
    <RouterLink
      v-for="collab in collabs"
      :key="collab.id"
      class="w-full h-full flex items-center justify-start"
      :to="{ name: `/profiles/[username]`, params: { username: collab.username } }"
    >
      <AppAvatar :profile="collab" />
    </RouterLink>
  </div>
</template>

<style scoped></style>
