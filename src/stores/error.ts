import type { ErrorExtended } from '@/types/ErrorExtended'
import type { PostgrestErrorExtended } from '@/types/PostgrestErrorExtended'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | PostgrestErrorExtended | ErrorExtended>(null)
  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error == 'string') {
      console.log('Received a string error')
      activeError.value = Error(error)
      activeError.value.customCode = customCode
      return
    }

    console.log('Received a PostgrestError error')
    activeError.value = error
    ;(activeError.value as PostgrestErrorExtended).statusCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
