import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.\n' +
    'For now, appointment submissions will be logged to console only.\n' +
    'See SUPABASE_SETUP.md for setup instructions.'
  );
}

// Create Supabase client with fallback values to prevent errors
// Using placeholder values when not configured (won't work for real submissions)
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // We don't need auth sessions for appointment form
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

// Database types
export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email?: string | null;
  age: string;
  problem?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

