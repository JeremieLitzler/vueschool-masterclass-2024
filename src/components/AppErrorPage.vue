<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()
const error = ref(errorStore.activeError)
const message = ref<null | string>(null)
const customCode = ref(0)
const statusCode = ref(0)
const details = ref<null | string>(null)
const code = ref<null | string>(null)
const hint = ref<null | string>(null)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.details // details is more user-friendly for Postgrest errors
  details.value = error.value.message // message is more technical  for Postgrest errors
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
  useErrorStore().activeError = null
})
</script>
<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 v-if="customCode > 0" class="error__code">{{ customCode }}</h1>
      <p v-if="statusCode > 0" class="error__code">Status Code: {{ statusCode }}</p>
      <p class="error__msg">{{ message }}</p>
      <p v-if="hint">{{ hint }}</p>
      <p>
        <i v-if="code"> {{ code }}: </i
        ><span v-if="details">
          {{ details }}
        </span>
      </p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
