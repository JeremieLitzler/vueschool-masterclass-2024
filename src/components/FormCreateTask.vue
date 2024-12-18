<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Let's create a new task</SheetTitle>
        Form inputs will go here
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<style scoped></style>
