import type { Collabs } from '@/utils/supabase-queries'

export type GroupedCollabs = {
  [key: string]: Collabs
}
