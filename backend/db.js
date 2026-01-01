import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const supabaseUrl = 'https://fcyoywhnhofeillcmfos.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)