<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks :links="topLinks" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks :links="settingsLinks" @@action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { LinkProp } from '@/types/LinkProp'
import SideBarLinks from '@/components/layout/SidebarLinks.vue'
import { RouterPathEnum } from '@/types/RouterPathEnum'
import { SideBarActionsEnum } from '@/types/SideBarActionsEnum'
import type { SideBarLinkAction } from '@/types/SideBarLinkAction'
import router from '@/router'

const executeAction = async (payload: SideBarLinkAction) => {
  console.log('Clicked a side bar link', payload)

  if (payload.action === SideBarActionsEnum.Logout) {
    const { isLoggedOut } = await useAuthStore().logout()
    if (isLoggedOut) {
      console.log('Logging out...')
      router.push('/login')
    }
  }
}

const { profile } = storeToRefs(useAuthStore())
const topLinks: LinkProp[] = [
  {
    to: RouterPathEnum.Home,
    icon: 'lucide:house',
    label: 'Dashboard',
  },
  { to: RouterPathEnum.Projects, icon: 'lucide:building-2', label: 'Projects' },
  {
    to: RouterPathEnum.Tasks,
    icon: 'lucide:badge-check',
    label: 'Tasks',
  },
]
const settingsLinks: LinkProp[] = [
  {
    to: `${RouterPathEnum.Profile}s/${profile?.value?.username}`,
    icon: 'lucide:user',
    label: 'Profile',
  },
  { to: RouterPathEnum.Settings, icon: 'lucide:settings', label: 'Settings' },
  {
    icon: 'lucide:log-out',
    action: SideBarActionsEnum.Logout,
    label: 'Sign out',
  },
]
</script>
<style scoped></style>
