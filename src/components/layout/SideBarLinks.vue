<template>
  <RouterLink
    exact-active-class="text-black bg-green-300"
    v-for="link in realLinks"
    :key="link.to"
    :to="link.to"
    class="side-bar-link"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
  </RouterLink>
  <div v-for="link in nonLinks" :key="link.label" class="side-bar-link cursor-pointer">
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { LinkProp } from '@/types/LinkProp'

const { links } = defineProps<{
  links: LinkProp[]
}>()

const realLinks = links.filter((link): link is LinkProp & { to: string } => !!link.to)
const nonLinks = links.filter((link): link is LinkProp & { to: string } => !!!link.to)
</script>
<style lang="css" scoped>
.side-bar-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
