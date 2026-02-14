'use client';

import { clsx } from 'clsx';

// Shared button abstraction for visual consistency.
export function Button({
  className,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  return (
    <button
      className={clsx(
        'rounded-md px-4 py-2 text-sm font-semibold',
        variant === 'primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        variant === 'secondary' && 'bg-slate-200 text-slate-900 hover:bg-slate-300',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-700',
        className
      )}
      {...props}
    />
  );
}
