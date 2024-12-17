import type { CacheValidation } from '@/types/CacheValidation'

/**
 * Could be better to use UseMemoize type directly
 * since if the delete method changes, you'll need
 * update the WithUseMemoize interface
 */
interface WithUseMemoize {
  delete(key: string): void
}

export const validateCache = <
  Reference extends Ref,
  Query,
  Loader extends WithUseMemoize,
  ErrorType,
>({
  reference,
  query,
  key,
  loaderFn,
}: CacheValidation<Reference, Query, Loader>) => {
  if (reference.value) {
    const finalQuery = typeof query === 'function' ? query(key) : query
    finalQuery.then(({ data, error }: { data: Reference; error: ErrorType }) => {
      if (JSON.stringify(reference.value) === JSON.stringify(data)) {
        return
      } else {
        loaderFn.delete(key as string)
        if (!error && data) {
          reference.value = data
        }
      }
    })
  }
}
