<template>
  <p v-if="statusCode > 0" class="error__msg">Status Code: {{ statusCode }}</p>
  <p v-if="hint">{{ hint }}</p>
  <p>
    <i v-if="code"> {{ code }}: </i
    ><span v-if="details">
      {{ details }}
    </span>
  </p>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    hint?: null | string
    code?: null | string
    details?: null | string
    statusCode?: number
  }>(),
  {
    hint: null,
    code: null,
    details: null,
    statusCode: 500,
  },
)
</script>

<style scoped></style>
