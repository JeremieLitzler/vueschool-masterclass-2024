import type { StoreCacheKey } from './StoreCacheKeys'

export interface CacheValidation<Reference, Query, Loader> {
  reference: Reference
  query: Query
  key: string | StoreCacheKey
  filter?: string | Object
  loaderFn: Loader
}
