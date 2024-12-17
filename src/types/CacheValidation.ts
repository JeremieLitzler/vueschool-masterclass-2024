import type { StoreCacheKey } from './StoreCacheKeys'

export interface CacheValidation<Reference, Query, Loader> {
  reference: Reference
  query: Query
  key: string | StoreCacheKey
  loaderFn: Loader
}
