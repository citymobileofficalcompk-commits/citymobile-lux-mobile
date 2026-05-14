import { createClient } from '@supabase/supabase-js';

// TanStack Start (SSR) safe environment variable access
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zqxjljjyzxlyewwlqyzu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeGpsamp5enhseWV3d2xxeXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODIzNzksImV4cCI6MjA5NDE1ODM3OX0.raFh6twH470LUxZ8zj03GLFDvY25SBBuGk4KareBujg';

const isServer = typeof window === 'undefined';

/**
 * Optimized Supabase client for TanStack Start SSR.
 * Persistence is disabled on the server to prevent errors with localStorage.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isServer,
    autoRefreshToken: !isServer,
    detectSessionInUrl: !isServer,
  }
});
