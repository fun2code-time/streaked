import Link from 'next/link';
import { createClient } from '@/lib/supabaseServer';
import { LogoutButton } from '@/components/logout-button';

// Main navigation with auth-aware actions.
export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Accountabili
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/public">Explore goals</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/auth/login">Log in</Link>
              <Link href="/auth/signup">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
