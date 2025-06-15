
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qhfxmrqgnfejpigkopkf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZnhtcnFnbmZlanBpZ2tvcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDkwMjMsImV4cCI6MjA2NTU4NTAyM30.6ftikrTtilvQSOSlJgy_q4DxBWJxK0HYvJ_Z2bVu6Jo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
