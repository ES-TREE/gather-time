import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** @type {import("@supabase/supabase-js").SupabaseClient<import("../../database.types.ts").Database>} */
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
