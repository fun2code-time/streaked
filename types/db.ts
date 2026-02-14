// Shared domain models used across UI and API handlers.
export type Goal = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  duration_days: number;
  start_date: string;
  is_public: boolean;
  created_at: string;
};

export type GoalUpdate = {
  id: string;
  goal_id: string;
  user_id: string;
  update_date: string;
  content: string;
  created_at: string;
};

export type GoalStats = {
  streak: number;
  completionPercentage: number;
  missedDays: number;
  completedDays: number;
  elapsedDays: number;
};
