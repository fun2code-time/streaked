import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';

// Signup route for new users.
export default function SignupPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create your Accountabili account</h1>
      <AuthForm mode="signup" />
      <p className="text-sm text-slate-600">
        Already have an account? <Link href="/auth/login">Log in</Link>.
      </p>
    </section>
  );
}
