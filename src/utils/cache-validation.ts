import type { CacheValidation } from '@/types/CacheValidation'

/**
 * Could be better to use UseMemoize type directly
 * since if the delete method changes, you'll need
 * update the WithUseMemoize interface
 */
interface WithUseMemoize<Type = string> {
  delete(key: Type): void
}
/**
 * The method accept a CacheValidation instance expecting:
 *  - a reference which type is the "typeof" of your Reactive Ref in your store
 *  - a query which type is the "typeof" of your Supabase query
 *  - a loader which type is the "typeof" of the useMemoize's implementation function
 *  - a key which is the cache key for useMemoize
 *  - a filter if the query need one. It supports string and object value for now
 *
 * The generic expects the following types:
 *  - a reference type which is the "typeof" of your Reactive Ref in your store
 *  - a query type which is the "typeof" of your Supabase query
 *  - a loader type which is the "typeof" of the useMemoize's implementation function
 *  - a error type which is the Supabase type error. It'll depend on what you call
 *
 * @param param0 The CacheValidation instance
 */
export const validateCache = <
  Reference extends Ref,
  Query,
  Loader extends WithUseMemoize<any>,
  ErrorType,
>({
  reference,
  query,
  key,
  filter,
  loaderFn,
}: CacheValidation<Reference, Query, Loader>) => {
  if (reference.value) {
    const finalQuery = typeof query === 'function' ? query(filter) : query
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
