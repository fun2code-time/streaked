import { notFound, redirect } from 'next/navigation';
import { GoalForm } from '@/components/goal-form';
import { createClient } from '@/lib/supabaseServer';
import type { Goal } from '@/types/db';

// Goal edit route for owners.
export default async function EditGoalPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: goal } = await supabase
    .from('goals')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!goal) {
    notFound();
  }

  const typedGoal = goal as Goal;

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Edit goal</h1>
      <GoalForm
        goalId={typedGoal.id}
        initialValues={{
          title: typedGoal.title,
          description: typedGoal.description,
          duration_days: typedGoal.duration_days,
          start_date: typedGoal.start_date,
          is_public: typedGoal.is_public
        }}
      />
    </section>
  );
}
