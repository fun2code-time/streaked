import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

// Login route for existing users.
export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Log in to Accountabili</h1>
      <AuthForm mode="login" />
      <p className="text-sm text-slate-600">
        New here? <Link href="/auth/signup">Create an account</Link>.
      </p>
    </section>
  );
}
