import type { PostgrestError } from '@supabase/supabase-js'
import type { ErrorExtended } from './ErrorExtended'

export interface PostgrestErrorExtended extends PostgrestError {
  statusCode?: number
}
