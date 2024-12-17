import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { AllProjects } from './supabase-queries'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInputLiveEditStatus from '@/components/AppInputLiveEditStatus.vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<AllProjects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      // When using render functions, the way we pass children to elements is different than passing them to a custom component.
      // With elements, we can pass them straightaway to the h() function like so:
      // - h("p", "I'm text inside a paragraph tag").
      // - h("p", { class: "example-class" } ,"I'm text inside a paragraph tag").
      //
      // While with custom components, we must pass them as functions:
      // - h(CustomComponent, () => "I'm text inside a custom component").
      // - h(CustomComponent, { class: "example-class" } ,() => "I'm text inside a custom component").
      //
      // You can read more about it in the official docs: https://vuejs.org/guide/extras/render-function#passing-slots
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left underline hover:bg-muted block w-full font-medium',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(AppInputLiveEditStatus, { modelValue: row.original.status })
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium h-20 flex items-center' },
        collabs.value[row.original.id]
          ? collabs.value[row.original.id].map((collab) => {
              return h(RouterLink, { to: `/users/${collab.username}` }, () => {
                return h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '' }),
                )
              })
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            }),
      )
    },
  },
]
