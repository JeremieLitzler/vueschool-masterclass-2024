<script setup lang="ts">
import { Component } from 'lucide-vue-next'

const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
onMounted(async () => {
  authStore.trackAuthChanges()
})
onErrorCaptured((error) => {
  errorStore.setError({ error })
})

const AuthLayout = defineAsyncComponent(() => import('@/components/layout/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/GuestLayout.vue'))
</script>

<template>
  <Suspense>
    <Component :is="user ? AuthLayout : GuestLayout">
      <AppError v-if="activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <Suspense v-if="Component" :timeout="0">
          <!-- With Suspence, the current component remains loaded until
          the next is loaded.

             If it is not what you want, the "timeout" prop on Suspense tell to load 
             the fallback until the next component is ready
          -->
          <Component :is="Component" :key="route.name" />
          <template #fallback>
            <p>Loading...</p>
          </template>
        </Suspense>
      </RouterView>
    </Component>
    <template #fallback>
      <div class="w-full h-full flex items-center justify-center">
        <p class="text-4xl">Loading...</p>
      </div>
    </template>
  </Suspense>
</template>
