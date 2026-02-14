// Runtime environment parsing with fail-fast errors.
export const env = {
  nextPublicSupabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  nextPublicSupabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
};

if (!env.nextPublicSupabaseUrl || !env.nextPublicSupabaseAnonKey) {
  // Avoid throwing during build for static analysis by checking runtime window.
  if (typeof window !== 'undefined') {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}
