<script setup lang="ts">
const { collaboratorIds } = defineProps<{ collaboratorIds: string[] | null }>()
const { getProfilesByIds } = useCollabs()
const collabs = collaboratorIds ? await getProfilesByIds(collaboratorIds) : []
</script>
<template>
  <div class="flex">
    <Avatar
      class="-mr-4 border border-primary hover:scale-110 transition-transform"
      v-for="collab in collabs"
      :key="collab.id"
    >
      <RouterLink
        class="w-full h-full flex items-center justify-center"
        :to="{ name: `/profiles/[username]`, params: { username: collab.username } }"
      >
        <AvatarImage
          :src="collab.avatar_url || ''"
          :alt="collab.full_name"
          :title="collab.full_name"
        />
        <AvatarFallback> </AvatarFallback>
      </RouterLink>
    </Avatar>
  </div>
</template>

<style scoped></style>
