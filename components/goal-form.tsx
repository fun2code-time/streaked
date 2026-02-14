'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';

type GoalFormValues = {
  title: string;
  description: string;
  duration_days: number;
  start_date: string;
  is_public: boolean;
};

// Goal creation/edit form with client-side guards and API integration.
export function GoalForm({
  initialValues,
  goalId
}: {
  initialValues?: GoalFormValues;
  goalId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<GoalFormValues>(
    initialValues ?? {
      title: '',
      description: '',
      duration_days: 30,
      start_date: new Date().toISOString().slice(0, 10),
      is_public: true
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const method = goalId ? 'PATCH' : 'POST';
    const path = goalId ? `/api/goals/${goalId}` : '/api/goals';

    const response = await fetch(path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? 'Unable to save goal.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <form className="space-y-4 rounded-lg border bg-white p-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          required
          minLength={3}
          maxLength={120}
          value={values.title}
          onChange={(event) => setValues({ ...values, title: event.target.value })}
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          required
          minLength={10}
          maxLength={2000}
          className="min-h-32 w-full"
          value={values.description}
          onChange={(event) => setValues({ ...values, description: event.target.value })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="duration" className="text-sm font-medium">
            Duration (days)
          </label>
          <input
            id="duration"
            type="number"
            min={1}
            max={3650}
            value={values.duration_days}
            onChange={(event) => setValues({ ...values, duration_days: Number(event.target.value) })}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="start_date" className="text-sm font-medium">
            Start date
          </label>
          <input
            id="start_date"
            type="date"
            required
            value={values.start_date}
            onChange={(event) => setValues({ ...values, start_date: event.target.value })}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={values.is_public}
          onChange={(event) => setValues({ ...values, is_public: event.target.checked })}
        />
        Public goal (visible to everyone)
      </label>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      <Button disabled={loading} type="submit">
        {loading ? 'Saving...' : goalId ? 'Update goal' : 'Create goal'}
      </Button>
    </form>
  );
}
