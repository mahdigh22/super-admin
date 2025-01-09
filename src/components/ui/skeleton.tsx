import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/class-names';

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/20', className)} {...props} />;
}

export { Skeleton };
