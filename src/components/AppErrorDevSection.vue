<template>
  <p v-if="hint">{{ hint }}</p>
  <p>
    <i v-if="code"> {{ code }}: </i
    ><span v-if="details">
      {{ details }}
    </span>
  </p>
</template>

<script setup lang="ts">
defineProps(['hint', 'code', 'details'])
</script>

<style scoped></style>
