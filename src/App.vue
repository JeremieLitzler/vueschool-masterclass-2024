<script setup lang="ts">
const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)
onMounted(async () => {
  useAuthStore().trackAuthChanges()
})
onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <Suspense>
    <AuthLayout>
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
    </AuthLayout>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>
