<template>
  <template v-for="link in links" :key="link.to">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exact-active-class="text-black bg-green-300"
      class="side-bar-link"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
    </RouterLink>
    <div v-else class="side-bar-link cursor-pointer">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { LinkProp } from '@/types/LinkProp'

const { links } = defineProps<{
  links: LinkProp[]
}>()
</script>
<style lang="css" scoped>
.side-bar-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
