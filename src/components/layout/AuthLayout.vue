<template>
  <div>
    <SideBar @@create-task="openTaskModal = true" @@create-project="openProjectModal = true" />
    <FormCreateProject v-model="openProjectModal" />
    <FormCreateTask v-model="openTaskModal" />

    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'ml-52': menuOpen, 'ml-24': !menuOpen }"
    >
      <NavbarTop />

      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormCreateProject from '@/components/FormCreateProject.vue'

const { pageData } = storeToRefs(usePageStore())
const openProjectModal = ref(false)
const openTaskModal = ref(false)

const { menuOpen } = useMenu()
</script>

<style scoped></style>
