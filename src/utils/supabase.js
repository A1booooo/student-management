import { createClient } from '@supabase/supabase-js'
// import { getConfig } from './configHelper.js'

const supabaseUrl = 'https://egxypfcmrfdyycjvmoyv.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
