import type { ErrorExtended } from '@/types/ErrorExtended'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | ErrorExtended>(null)
  const setError = ({ errorMessage, customCode }: { errorMessage: string; customCode: number }) => {
    activeError.value = Error(errorMessage)
    activeError.value.customCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
