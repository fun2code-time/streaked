import { redirect } from 'next/navigation';
import { GoalForm } from '@/components/goal-form';
import { createClient } from '@/lib/supabaseServer';

// New-goal route for authenticated users.
export default async function NewGoalPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Create a goal</h1>
      <GoalForm />
    </section>
  );
}
