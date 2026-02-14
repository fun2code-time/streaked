import { createClient } from '@/lib/supabaseServer';
import { computeGoalStats } from '@/lib/goalStats';
import { GoalCard } from '@/components/goal-card';
import type { Goal, GoalUpdate } from '@/types/db';

// Discovery list for all public goals.
export default async function PublicGoalsPage() {
  const supabase = createClient();
  const { data: goals } = await supabase
    .from('goals')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  const items = await Promise.all(
    ((goals ?? []) as Goal[]).map(async (goal) => {
      const { data: updates } = await supabase.from('goal_updates').select('*').eq('goal_id', goal.id);
      return { goal, stats: computeGoalStats(goal, (updates ?? []) as GoalUpdate[]) };
    })
  );

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Public goals</h1>
      <p className="text-slate-700">See what the community is building every day.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ goal, stats }) => (
          <GoalCard key={goal.id} goal={goal} stats={stats} />
        ))}
      </div>
    </section>
  );
}
