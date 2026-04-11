import * as React from 'react';

import { cn } from '@/lib/utils';

type ProgressProps = React.ComponentProps<'div'> & {
    value?: number;
};

function Progress({ className, value = 0, ...props }: ProgressProps) {
    return (
        <div className={cn('bg-secondary relative h-2 w-full overflow-hidden rounded-full', className)} {...props}>
            <div className="bg-primary h-full transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
        </div>
    );
}

export { Progress };
