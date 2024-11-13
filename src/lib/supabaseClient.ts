import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

console.log(supabaseUrl)
console.log(supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey)
