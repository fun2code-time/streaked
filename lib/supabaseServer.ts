import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';

// Server Supabase client with cookie-backed auth sessions.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(env.nextPublicSupabaseUrl, env.nextPublicSupabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options) {
        cookieStore.set({ name, value: '', ...options });
      }
    }
  });
}
