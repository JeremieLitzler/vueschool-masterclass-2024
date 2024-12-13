import type { ErrorExtended } from '@/types/ErrorExtended'
import type { PostgrestErrorExtended } from '@/types/PostgrestErrorExtended'
import { AuthApiError, AuthError, type PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | PostgrestErrorExtended | AuthApiError | AuthError | ErrorExtended>(
    null,
  )
  const isCustomError = ref(false)
  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | AuthError | Error
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

    // if (!errorIsString && error instanceof AuthError) {

    // }
    console.log('Received a PostgrestError error')
    activeError.value = error
    ;(activeError.value as PostgrestErrorExtended).statusCode = customCode || 500
  }

  const setAuthError = ({ authError }: { authError: AuthError | AuthApiError }) => {
    if (authError instanceof AuthError) {
      console.error('Got an AuthError')
    }
    if (authError instanceof AuthApiError) {
      console.error('Got an AuthApiError')
    }
    console.log('Received a PostgrestError error')
    activeError.value = authError
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    isCustomError,
    setError,
    setAuthError,
    clearError,
  }
})
