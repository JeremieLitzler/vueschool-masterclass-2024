import type { ErrorExtended } from '@/types/ErrorExtended'
import type { PostgrestErrorExtended } from '@/types/PostgrestErrorExtended'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | PostgrestErrorExtended | ErrorExtended>(null)
  const isCustomError = ref(false)
  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    const errorIsString = typeof error === 'string'

    if (errorIsString) isCustomError.value = true
    if (errorIsString || error instanceof Error) {
      console.log('Received a string error')
      activeError.value = errorIsString ? Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    }

    console.log('Received a PostgrestError error')
    activeError.value = error
    ;(activeError.value as PostgrestErrorExtended).statusCode = customCode || 500
  }

  return {
    activeError,
    isCustomError,
    setError,
  }
})
