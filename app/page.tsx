import Link from 'next/link';
import { createClient } from '@/lib/supabaseServer';
import { computeGoalStats } from '@/lib/goalStats';
import { GoalCard } from '@/components/goal-card';
import type { Goal, GoalUpdate } from '@/types/db';

// Public homepage with featured/recent public goals.
export default async function HomePage() {
  const supabase = createClient();
  const { data: goals, error } = await supabase
    .from('goals')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    return <p className="text-rose-700">Unable to load goals right now.</p>;
  }

  const goalWithStats = await Promise.all(
    ((goals ?? []) as Goal[]).map(async (goal) => {
      const { data: updates } = await supabase.from('goal_updates').select('*').eq('goal_id', goal.id);
      return {
        goal,
        stats: computeGoalStats(goal, (updates ?? []) as GoalUpdate[])
      };
    })
  );

  return (
    <section className="space-y-8">
      <div className="rounded-xl bg-slate-900 px-6 py-12 text-white">
        <p className="text-sm uppercase tracking-wide text-brand-100">Public accountability board</p>
        <h1 className="mt-3 text-4xl font-bold">Stay consistent in public with Accountabili</h1>
        <p className="mt-4 max-w-2xl text-slate-200">
          Create measurable goals, log daily updates, and let the world watch your momentum.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/auth/signup" className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
            Start free
          </Link>
          <Link href="/public" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800">
            Explore goals
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured goals</h2>
          <Link href="/public">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {goalWithStats.map(({ goal, stats }) => (
            <GoalCard key={goal.id} goal={goal} stats={stats} />
          ))}
        </div>
      </div>
    </section>
  );
}
