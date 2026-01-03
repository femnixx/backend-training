import { createBrowserClient } from '@supabase/ssr'

// This is the "Source of Truth" for your Supabase connection
export function createClient() {
  return createBrowserClient(
    "https://fcyoywhnhofeillcmfos.supabase.co",
    "sb_publishable_nOfhckt4hIVHMvto7AXdVA_e7GVPkaH"
  )
}

// Also exporting a singleton instance in case other files need it
export const supabase = createClient()