import type { LoginData } from '@/types/LoginData'

export const useFormError = () => {
  const realtimeErrors = ref()
  const handleLoginForm = async (formData: LoginData) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }
    const { validateEmail, validatePassword } = await import('@/utils/form-validations')
    const emailErrors = validateEmail(formData.email)
    console.log(`Ran validateEmail on ${formData.email}`, emailErrors)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    console.log(`Ran validatePassword on ${formData.email}`, passwordErrors)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }
  return { handleLoginForm, realtimeErrors }
}
