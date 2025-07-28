
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zngzvouxnhqahtepckwz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZ3p2b3V4bmhxYWh0ZXBja3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1ODYxMzcsImV4cCI6MjA2OTE2MjEzN30.b-rpFhWmhbBjTbkf5pnA-Otwc6cNLcaPxrVJ0QDWAFA")
