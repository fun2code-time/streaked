'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { Button } from '@/components/button';

// Reusable auth form for signup/login with validation feedback.
export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const action = mode === 'signup' ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error: authError } = await action({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      setMessage('Account created. Check your email for confirmation if enabled.');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form className="space-y-4 rounded-lg border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      {message ? <p className="text-sm text-brand-700">{message}</p> : null}
      <Button disabled={loading} className="w-full" type="submit">
        {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Log in'}
      </Button>
    </form>
  );
}
