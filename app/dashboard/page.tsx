import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabaseServer';
import { computeGoalStats } from '@/lib/goalStats';
import { GoalCard } from '@/components/goal-card';
import type { Goal, GoalUpdate } from '@/types/db';

// Authenticated dashboard listing current user goals.
export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: goals } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const items = await Promise.all(
    ((goals ?? []) as Goal[]).map(async (goal) => {
      const { data: updates } = await supabase.from('goal_updates').select('*').eq('goal_id', goal.id);
      return { goal, stats: computeGoalStats(goal, (updates ?? []) as GoalUpdate[]) };
    })
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your goals</h1>
        <Link href="/goals/new" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          New goal
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ goal, stats }) => (
          <GoalCard key={goal.id} goal={goal} stats={stats} />
        ))}
      </div>
      {items.length === 0 ? <p className="text-slate-600">No goals yet. Create one to start building streaks.</p> : null}
    </section>
  );
}
