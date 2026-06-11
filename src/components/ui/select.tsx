'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn('relative rounded-3xl border border-white/10 bg-background/90', className)}>
      <select
        className="h-12 w-full appearance-none rounded-3xl bg-transparent px-4 text-sm text-white outline-none"
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">▼</div>
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
