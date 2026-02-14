import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { updateSchema } from '@/lib/validations';

// Lists updates for a goal or creates today's goal update.
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('goal_updates')
    .select('*')
    .eq('goal_id', params.id)
    .order('update_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid payload' }, { status: 400 });
  }

  const { data: goal } = await supabase.from('goals').select('id, user_id').eq('id', params.id).single();
  if (!goal || goal.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('goal_updates')
    .insert({
      goal_id: params.id,
      user_id: user.id,
      content: parsed.data.content,
      update_date: parsed.data.update_date ?? new Date().toISOString().slice(0, 10)
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
