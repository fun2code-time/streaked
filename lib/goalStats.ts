import { addDays, differenceInCalendarDays, formatISO, isAfter, parseISO } from 'date-fns';
import type { Goal, GoalStats, GoalUpdate } from '@/types/db';

// Computes streaks and completion metrics from goal/update data.
export function computeGoalStats(goal: Goal, updates: GoalUpdate[]): GoalStats {
  const start = parseISO(goal.start_date);
  const end = addDays(start, goal.duration_days - 1);
  const now = new Date();
  const effectiveEnd = isAfter(now, end) ? end : now;

  const elapsedDays = Math.max(differenceInCalendarDays(effectiveEnd, start) + 1, 0);
  const validDays = new Set(
    updates
      .map((u) => formatISO(parseISO(u.update_date), { representation: 'date' }))
      .filter((d) => d >= goal.start_date)
  );

  const completedDays = validDays.size;
  const missedDays = Math.max(elapsedDays - completedDays, 0);
  const completionPercentage = elapsedDays > 0 ? Math.min(Math.round((completedDays / elapsedDays) * 100), 100) : 0;

  let streak = 0;
  for (let i = 0; i < elapsedDays; i += 1) {
    const day = formatISO(addDays(effectiveEnd, -i), { representation: 'date' });
    if (validDays.has(day)) {
      streak += 1;
    } else {
      break;
    }
  }

  return { streak, completionPercentage, missedDays, completedDays, elapsedDays };
}
