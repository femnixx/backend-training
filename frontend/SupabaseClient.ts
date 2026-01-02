import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fcyoywhnhofeillcmfos.supabase.co"
const supabaseAnonKey = "sb_publishable_nOfhckt4hIVHMvto7AXdVA_e7GVPkaH"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase Environment Variables');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);