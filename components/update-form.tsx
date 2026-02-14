'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';

// Form for posting a daily text update on a goal.
export function UpdateForm({ goalId }: { goalId: string }) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/goals/${goalId}/updates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? 'Unable to add update.');
      setLoading(false);
      return;
    }

    setContent('');
    router.refresh();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Post today&apos;s progress</h3>
      <textarea
        required
        minLength={2}
        maxLength={1500}
        className="min-h-28 w-full"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="What progress did you make today?"
      />
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post update'}
      </Button>
    </form>
  );
}
