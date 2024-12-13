<script setup lang="ts">
defineProps<{
  message: string
  customCode: number
  code: string
  statusCode: number
  hint: string | null
  details: string
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code" v-if="statusCode">Status Code: {{ statusCode }}</h1>
    <h2 class="error__msg">Custom code: {{ customCode || code }}</h2>
    <p>Message: {{ message }}</p>
    <p v-if="hint">Hint: {{ hint }}</p>
    <p v-if="details">Details: {{ details }}</p>
    <div class="error-footer">
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
