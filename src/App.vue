<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <Suspense>
      <RouterView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </AuthLayout>
</template>
