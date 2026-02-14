import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

// Browser Supabase client for client components.
export function createClient() {
  return createBrowserClient(env.nextPublicSupabaseUrl, env.nextPublicSupabaseAnonKey);
}
