<script setup lang="ts">
import { retrieveCurrentSession } from './utils/supabase-auth'

const { activeError } = storeToRefs(useErrorStore())
const authStore = useAuthStore()
onMounted(async () => {
  const { data } = await retrieveCurrentSession()
  if (data?.session?.user) {
    console.log('User session valid')

    await authStore.setAuth({ session: data.session, nextPageOnError: '/login' })
  } else {
    console.log('User session invalid')
  }
})
onErrorCaptured((error) => {
  useErrorStore().setError({ error })
})
</script>

<template>
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
</template>
