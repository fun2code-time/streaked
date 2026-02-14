'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { Button } from '@/components/button';

// Handles secure sign-out and local navigation refresh.
export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
      }}
    >
      Log out
    </Button>
  );
}
