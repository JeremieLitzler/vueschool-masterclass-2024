<!-- <<script setup lang="ts">
import { ref, watch } from 'vue'
import { Command } from 'vue-command-palette' // To install
import { Skeleton } from '@/components/ui/skeleton'
import { Check } from 'lucide-vue-next'
import type { ComponentPropsAutocomplete } from '@/types/ComponentPropsAutocomplete'

const props = withDefaults(defineProps<ComponentPropsAutocomplete>(), {
  isLoading: false,
  placeholder: 'Please type something here...',
  emptyMessage: 'No results',
})

const emit = defineEmits<{
  (e: '@update:value', value: Option): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const selected = ref<Option | undefined>(props.value)
const inputValue = ref<string>(props.value?.label || '')

watch(
  () => props.value,
  (newValue) => {
    selected.value = newValue
    inputValue.value = newValue?.label || ''
  },
)

const handleKeyDown = (event: KeyboardEvent) => {
  const input = inputRef.value
  if (!input) return

  if (!isOpen.value) {
    isOpen.value = true
  }

  if (event.key === 'Enter' && input.value !== '') {
    const optionToSelect = props.options.find((option) => option.label === input.value)
    if (optionToSelect) {
      selected.value = optionToSelect
      emit('@update:value', optionToSelect)
    }
  }

  if (event.key === 'Escape') {
    input.blur()
  }
}

const handleBlur = () => {
  isOpen.value = false
  inputValue.value = selected.value?.label || ''
}

const handleSelectOption = (selectedOption: Option) => {
  inputValue.value = selectedOption.label
  selected.value = selectedOption
  emit('@update:value', selectedOption)

  setTimeout(() => {
    if (inputRef.value instanceof HTMLInputElement) {
      inputRef.value?.blur()
    }
  }, 0)
}
</script>

<template>
  <Command :visible="isOpen" @keydown="handleKeyDown">
    <Command.Input
      ref="inputRef"
      :value="inputValue"
      @update:value="props.isLoading ? undefined : ($event: string) => (inputValue = $event)"
      @blur="handleBlur"
      @focus="() => (isOpen = true)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="text-black"
    />
    <div class="relative mt-1">
      <div
        :class="[
          'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none',
          isOpen ? 'block' : 'hidden',
        ]"
      >
        <Command.List class="rounded-lg ring-1 ring-slate-200">
          <div v-if="isLoading" class="p-1">
            <Skeleton class="h-8 w-full" />
          </div>

          <Command.Group v-if="options.length > 0 && !isLoading" heading="Command Group Heading">
            <Command.Item
              class="app-in-place-edit-input text-black border-cyan-300"
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @mousedown.prevent.stop
              @select="() => handleSelectOption(option)"
              :class="[
                'flex w-full items-center gap-2',
                selected?.value !== option.value ? 'pl-8' : '',
              ]"
            >
              <Check v-if="selected?.value === option.value" class="w-4" />
              {{ option.label }}
            </Command.Item>
          </Command.Group>

          <Command.Empty
            v-if="!isLoading && options.length === 0"
            class="select-none rounded-sm px-2 py-3 text-center text-sm"
          >
            {{ emptyMessage }}
          </Command.Empty>
        </Command.List>
      </div>
    </div>
  </Command>
</template>
<style lang="css" scoped></style> -->
