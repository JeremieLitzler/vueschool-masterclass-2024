<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Let's create a new task</SheetTitle>
      </SheetHeader>
      <FormKit type="text" />
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<style scoped></style>
