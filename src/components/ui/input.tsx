'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'min-h-[44px] w-full rounded-3xl border border-white/10 bg-background/90 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
