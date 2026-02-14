import Link from 'next/link';
import type { Goal, GoalStats } from '@/types/db';

// Goal summary card used on dashboard and discovery views.
export function GoalCard({ goal, stats }: { goal: Goal; stats: GoalStats }) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{goal.title}</h3>
        <span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-700">{stats.streak} day streak</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-slate-700">{goal.description}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-slate-500">Completed</p>
          <p className="font-semibold">{stats.completionPercentage}%</p>
        </div>
        <div>
          <p className="text-slate-500">Missed</p>
          <p className="font-semibold">{stats.missedDays} days</p>
        </div>
        <div>
          <p className="text-slate-500">Duration</p>
          <p className="font-semibold">{goal.duration_days} days</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <Link href={`/goals/${goal.id}`}>View details</Link>
        {goal.is_public ? <Link href={`/public/goals/${goal.id}`}>Public page</Link> : null}
      </div>
    </article>
  );
}
