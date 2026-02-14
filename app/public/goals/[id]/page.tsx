import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { createClient } from '@/lib/supabaseServer';
import { computeGoalStats } from '@/lib/goalStats';
import type { Goal, GoalUpdate } from '@/types/db';

// Public read-only goal page showing progress and timeline.
export default async function PublicGoalPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: goal } = await supabase.from('goals').select('*').eq('id', params.id).eq('is_public', true).single();

  if (!goal) {
    notFound();
  }

  const { data: updates } = await supabase
    .from('goal_updates')
    .select('*')
    .eq('goal_id', params.id)
    .order('update_date', { ascending: false })
    .order('created_at', { ascending: false });

  const typedGoal = goal as Goal;
  const typedUpdates = (updates ?? []) as GoalUpdate[];
  const stats = computeGoalStats(typedGoal, typedUpdates);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border bg-white p-6">
        <h1 className="text-3xl font-bold">{typedGoal.title}</h1>
        <p className="mt-3 text-slate-700">{typedGoal.description}</p>
      </div>
      <div className="grid gap-4 rounded-lg border bg-white p-4 md:grid-cols-3">
        <p>
          <span className="block text-xs uppercase text-slate-500">Current streak</span>
          <span className="text-2xl font-semibold">{stats.streak}</span>
        </p>
        <p>
          <span className="block text-xs uppercase text-slate-500">Completion</span>
          <span className="text-2xl font-semibold">{stats.completionPercentage}%</span>
        </p>
        <p>
          <span className="block text-xs uppercase text-slate-500">Missed days</span>
          <span className="text-2xl font-semibold">{stats.missedDays}</span>
        </p>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Daily posts</h2>
        {typedUpdates.map((update) => (
          <article key={update.id} className="rounded-lg border bg-white p-4">
            <p className="text-xs uppercase text-slate-500">{format(new Date(update.update_date), 'PPP')}</p>
            <p className="mt-2 whitespace-pre-wrap">{update.content}</p>
          </article>
        ))}
        {typedUpdates.length === 0 ? <p className="text-slate-600">No posts yet.</p> : null}
      </section>
    </section>
  );
}
