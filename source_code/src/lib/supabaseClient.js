// source_code/src/lib/supabaseClient.js

// ----------------------------------------------------------------------------
// ---- THIS IS THE LIVE SUPABASE CLIENT --------------------------------------
// ----------------------------------------------------------------------------
// This file connects the application to your Supabase database.
// It uses the credentials stored in the `.env.local` file.
// -----------------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Supabase URL and Anon Key are required in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
